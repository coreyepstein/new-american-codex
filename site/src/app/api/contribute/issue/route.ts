import { NextResponse } from "next/server";
import type { IssueSubmission, ContributeResponse } from "@/lib/types/contribute";

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
    return NextResponse.json({ url: "#", number: 0 });
  }

  if (typeof b.contentUnit !== "string" || !b.contentUnit.trim()) {
    return NextResponse.json(
      { error: "Content unit is required." },
      { status: 400 }
    );
  }
  if (typeof b.description !== "string" || !b.description.trim()) {
    return NextResponse.json(
      { error: "Description of the issue is required." },
      { status: 400 }
    );
  }

  const submission: IssueSubmission = {
    contentUnit: stripHtml(b.contentUnit as string),
    description: stripHtml(b.description as string),
    suggestedFix:
      typeof b.suggestedFix === "string" ? stripHtml(b.suggestedFix) : undefined,
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

  const emailLine =
    submission.submitterEmail
      ? `\n**Contact:** ${submission.submitterEmail}`
      : "";

  const issueBody = [
    `## Correction Report`,
    "",
    `**Content Unit:** ${submission.contentUnit}`,
    "",
    "**What's wrong:**",
    submission.description,
    "",
    submission.suggestedFix
      ? `**Suggested Fix:**\n${submission.suggestedFix}`
      : null,
    "",
    submission.submitterName
      ? `**Submitted by:** ${submission.submitterName}${emailLine}`
      : emailLine || null,
    "",
    "---",
    "_Submitted via the New American Codex contribution form._",
    "",
    "> ⚠️ If this is a safety concern, it will be prioritized for immediate review.",
  ]
    .filter((l) => l !== null)
    .join("\n");

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
          title: `[Correction] ${submission.contentUnit}`,
          body: issueBody,
          labels: ["correction"],
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
