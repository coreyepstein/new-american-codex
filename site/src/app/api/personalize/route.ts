import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts/personalize";
import {
  VALID_STAGES,
  VALID_MODALITIES,
  VALID_PILLARS,
  VALID_CONTENT_TYPES,
  type ChildProfileRequest,
  type GeneratedUnit,
} from "@/lib/types/personalize";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, per-IP
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Prune stale entries
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  rateLimitMap.set(ip, recent);

  if (recent.length >= RATE_MAX) {
    const oldest = recent[0];
    const retryAfterSeconds = Math.ceil((oldest + RATE_WINDOW_MS - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return { limited: false, retryAfterSeconds: 0 };
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function stripHtmlTags(s: string): string {
  return s.replace(/<[^>]*>/g, "");
}

function validateProfile(
  body: unknown
): { ok: true; profile: ChildProfileRequest } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const b = body as Record<string, unknown>;

  // stage — required
  if (typeof b.stage !== "string" || !b.stage.trim()) {
    return { ok: false, error: "Field 'stage' is required." };
  }
  const stage = b.stage.trim().toLowerCase();
  if (!(VALID_STAGES as readonly string[]).includes(stage)) {
    return {
      ok: false,
      error: `Invalid stage "${stage}". Must be one of: ${VALID_STAGES.join(", ")}`,
    };
  }

  // learningModality — required
  if (typeof b.learningModality !== "string" || !b.learningModality.trim()) {
    return { ok: false, error: "Field 'learningModality' is required." };
  }
  const learningModality = b.learningModality.trim().toLowerCase();
  if (!(VALID_MODALITIES as readonly string[]).includes(learningModality)) {
    return {
      ok: false,
      error: `Invalid learningModality "${learningModality}". Must be one of: ${VALID_MODALITIES.join(", ")}`,
    };
  }

  // interests — required, 1-5 items
  if (!Array.isArray(b.interests)) {
    return { ok: false, error: "Field 'interests' must be an array of strings." };
  }
  const interests = b.interests
    .filter((i): i is string => typeof i === "string")
    .map((i) => stripHtmlTags(i.trim()))
    .filter((i) => i.length > 0);
  if (interests.length < 1 || interests.length > 5) {
    return { ok: false, error: "Provide between 1 and 5 interests." };
  }

  // childName — optional
  let childName: string | undefined;
  if (b.childName !== undefined && b.childName !== null) {
    if (typeof b.childName !== "string") {
      return { ok: false, error: "Field 'childName' must be a string." };
    }
    const cleaned = stripHtmlTags(b.childName.trim());
    if (cleaned.length > 0) {
      childName = cleaned;
    }
  }

  return {
    ok: true,
    profile: {
      childName,
      interests,
      stage,
      learningModality: learningModality as ChildProfileRequest["learningModality"],
    },
  };
}

// ---------------------------------------------------------------------------
// Response parsing & validation
// ---------------------------------------------------------------------------
function parseGeneratedUnits(text: string): GeneratedUnit[] | null {
  // Try direct parse first
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // fall through to regex extraction
  }

  // Fallback: extract JSON array via regex
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) return null;

  try {
    const parsed = JSON.parse(match[0]);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    return null;
  }

  return null;
}

function validateUnits(units: unknown[]): GeneratedUnit[] | null {
  if (units.length < 5 || units.length > 7) return null;

  const validPillars = new Set<string>(VALID_PILLARS);
  const validStages = new Set<string>(VALID_STAGES);
  const validContentTypes = new Set<string>(VALID_CONTENT_TYPES);

  const validated: GeneratedUnit[] = [];
  for (const u of units) {
    if (typeof u !== "object" || u === null) return null;
    const unit = u as Record<string, unknown>;

    if (typeof unit.title !== "string" || !unit.title) return null;
    if (typeof unit.pillar !== "string" || !validPillars.has(unit.pillar)) return null;
    if (typeof unit.stage !== "string" || !validStages.has(unit.stage)) return null;
    if (typeof unit.contentType !== "string" || !validContentTypes.has(unit.contentType))
      return null;
    if (typeof unit.duration !== "string" || !unit.duration) return null;
    if (!Array.isArray(unit.materials)) return null;
    if (!Array.isArray(unit.learningObjectives)) return null;
    if (typeof unit.body !== "string" || !unit.body) return null;

    validated.push({
      title: stripHtmlTags(unit.title),
      pillar: unit.pillar,
      stage: unit.stage,
      contentType: unit.contentType,
      duration: stripHtmlTags(unit.duration),
      materials: unit.materials
        .filter((m): m is string => typeof m === "string")
        .map(stripHtmlTags),
      learningObjectives: unit.learningObjectives
        .filter((lo): lo is string => typeof lo === "string")
        .map(stripHtmlTags),
      body: unit.body,
    });
  }

  return validated;
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  // Rate limiting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const rateCheck = isRateLimited(ip);
  if (rateCheck.limited) {
    return NextResponse.json(
      {
        error: "Too many requests. Please wait before trying again.",
        retryAfterSeconds: rateCheck.retryAfterSeconds,
      },
      { status: 429 }
    );
  }

  // Parse & validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const validation = validateProfile(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { profile } = validation;

  // Call Anthropic
  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: buildSystemPrompt(),
      messages: [{ role: "user", content: buildUserPrompt(profile) }],
    });

    // Extract text content
    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from AI model." },
        { status: 500 }
      );
    }

    const rawUnits = parseGeneratedUnits(textBlock.text);
    if (!rawUnits) {
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 500 }
      );
    }

    const units = validateUnits(rawUnits);
    if (!units) {
      return NextResponse.json(
        { error: "AI response did not meet quality constraints." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      units,
      childName: profile.childName,
      stage: profile.stage,
    });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      { error: "AI generation failed. Please try again later." },
      { status: 500 }
    );
  }
}
