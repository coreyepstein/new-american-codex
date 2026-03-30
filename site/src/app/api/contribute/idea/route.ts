import { NextResponse } from "next/server";
import type { IdeaSubmission, ContributeResponse } from "@/lib/types/contribute";

const GITHUB_OWNER = "coreyepstein";
const GITHUB_REPO = "new-american-codex";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, per-IP
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  rateLimitMap.set(ip, timestamps);
  if (timestamps.length >= RATE_MAX) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  // Honeypot check
  if (b._trap && typeof b._trap === "string" && b._trap.length > 0) {
    // Silently succeed for bots
    return NextResponse.json({ url: "#", number: 0 });
  }

  // Validate required fields
  if (typeof b.title !== "string" || !b.title.trim()) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  if (typeof b.description !== "string" || !b.description.trim()) {
    return NextResponse.json({ error: "Description is required." }, { status: 400 });
  }

  const submission: IdeaSubmission = {
    title: stripHtml(b.title as string),
    description: stripHtml(b.description as string),
    pillar: typeof b.pillar === "string" ? stripHtml(b.pillar) : undefined,
    stage: typeof b.stage === "string" ? stripHtml(b.stage) : undefined,
    submitterName:
      typeof b.submitterName === "string" ? stripHtml(b.submitterName) : undefined,
    submitterEmail:
      typeof b.submitterEmail === "string" ? stripHtml(b.submitterEmail) : undefined,
  };

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error("GITHUB_TOKEN not configured");
    return NextResponse.json(
      { error: "Contribution service is not configured." },
      { status: 503 }
    );
  }

  // Build issue body
  const emailLine =
    submission.submitterEmail
      ? `\n**Contact:** ${submission.submitterEmail}`
      : "";
  const issueBody = [
    `## Content Idea: ${submission.title}`,
    "",
    "**Description:**",
    submission.description,
    "",
    submission.pillar ? `**Suggested Pillar:** ${submission.pillar}` : null,
    submission.stage ? `**Suggested Stage:** ${submission.stage}` : null,
    submission.submitterName ? `**Submitted by:** ${submission.submitterName}${emailLine}` : emailLine || null,
    "",
    "---",
    "_Submitted via the New American Codex contribution form._",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const labels = ["content-idea"];
  if (submission.pillar) labels.push(`pillar:${submission.pillar}`);
  if (submission.stage) labels.push(`stage:${submission.stage}`);

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          title: `[Idea] ${submission.title}`,
          body: issueBody,
          labels,
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("GitHub API error:", res.status, err);
      return NextResponse.json(
        { error: "Failed to create GitHub issue. Please try again later." },
        { status: 502 }
      );
    }

    const data = await res.json() as { html_url: string; number: number };
    const response: ContributeResponse = {
      url: data.html_url,
      number: data.number,
    };
    return NextResponse.json(response);
  } catch (err) {
    console.error("GitHub API call failed:", err);
    return NextResponse.json(
      { error: "Failed to submit. Please try again later." },
      { status: 500 }
    );
  }
}
