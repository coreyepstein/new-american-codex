import { NextResponse } from "next/server";
import type { ContentSubmission, ContributeResponse } from "@/lib/types/contribute";
import { VALID_PILLARS, VALID_STAGES, VALID_CONTENT_TYPES } from "@/lib/types/personalize";

const GITHUB_OWNER = "coreyepstein";
const GITHUB_REPO = "new-american-codex";
const BASE_BRANCH = "main";

// ---------------------------------------------------------------------------
// Rate limiting — in-memory, per-IP
// ---------------------------------------------------------------------------
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 3;
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

function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

// ---------------------------------------------------------------------------
// Generate markdown content matching the curriculum template format
// ---------------------------------------------------------------------------
function buildMarkdownContent(s: ContentSubmission): string {
  const objectives = s.learningObjectives
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `  - ${l}`)
    .join("\n");

  const materials = s.materials
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `  - ${l}`)
    .join("\n");

  const frontmatter = [
    "---",
    `title: "${s.title}"`,
    `pillar: ${s.pillar}`,
    `stage: ${s.stage}`,
    `content-type: ${s.contentType}`,
    `duration: "${s.duration}"`,
    "readiness-indicators: []",
    `learning-objectives:`,
    objectives || "  - (to be completed)",
    `materials:`,
    materials || "  - (to be listed)",
    "safety-level: green",
    "modality: hands-on",
    "---",
  ].join("\n");

  const attribution = s.submitterName
    ? `\n\n---\n_Contributed by ${s.submitterName}${s.submitterEmail ? ` (${s.submitterEmail})` : ""} via the New American Codex contribution form._`
    : "\n\n---\n_Contributed via the New American Codex contribution form._";

  return `${frontmatter}\n\n# ${s.title}\n\n${s.body}${attribution}\n`;
}

// ---------------------------------------------------------------------------
// GitHub API helpers
// ---------------------------------------------------------------------------
function ghHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getMainSHA(token: string): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/${BASE_BRANCH}`,
    { headers: ghHeaders(token) }
  );
  if (!res.ok) throw new Error(`Failed to get branch SHA: ${res.status}`);
  const data = await res.json() as { object: { sha: string } };
  return data.object.sha;
}

async function createBranch(token: string, branchName: string, sha: string): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs`,
    {
      method: "POST",
      headers: ghHeaders(token),
      body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha }),
    }
  );
  if (!res.ok) throw new Error(`Failed to create branch: ${res.status}`);
}

async function createFile(
  token: string,
  path: string,
  content: string,
  message: string,
  branch: string
): Promise<void> {
  const encoded = Buffer.from(content, "utf-8").toString("base64");
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: ghHeaders(token),
      body: JSON.stringify({ message, content: encoded, branch }),
    }
  );
  if (!res.ok) throw new Error(`Failed to create file: ${res.status}`);
}

interface PRData {
  html_url: string;
  number: number;
}

async function createPR(
  token: string,
  title: string,
  body: string,
  head: string
): Promise<PRData> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/pulls`,
    {
      method: "POST",
      headers: ghHeaders(token),
      body: JSON.stringify({
        title,
        body,
        head,
        base: BASE_BRANCH,
        draft: true,
      }),
    }
  );
  if (!res.ok) throw new Error(`Failed to create PR: ${res.status}`);
  return res.json() as Promise<PRData>;
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

  // Validate required fields
  const requiredStrings: (keyof typeof b)[] = [
    "title", "pillar", "stage", "contentType", "learningObjectives", "materials", "duration", "body"
  ];
  for (const field of requiredStrings) {
    if (typeof b[field] !== "string" || !(b[field] as string).trim()) {
      return NextResponse.json({ error: `Field '${field}' is required.` }, { status: 400 });
    }
  }

  const pillar = (b.pillar as string).trim();
  const stage = (b.stage as string).trim();
  const contentType = (b.contentType as string).trim();

  if (!(VALID_PILLARS as readonly string[]).includes(pillar)) {
    return NextResponse.json({ error: `Invalid pillar.` }, { status: 400 });
  }
  if (!(VALID_STAGES as readonly string[]).includes(stage)) {
    return NextResponse.json({ error: `Invalid stage.` }, { status: 400 });
  }
  if (!(VALID_CONTENT_TYPES as readonly string[]).includes(contentType)) {
    return NextResponse.json({ error: `Invalid content type.` }, { status: 400 });
  }

  const submission: ContentSubmission = {
    title: stripHtml(b.title as string),
    pillar,
    stage,
    contentType,
    learningObjectives: stripHtml(b.learningObjectives as string),
    materials: stripHtml(b.materials as string),
    duration: stripHtml(b.duration as string),
    body: b.body as string, // preserved with newlines; XSS protection in rendering
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

  const slug = toSlug(submission.title);
  const timestamp = Date.now();
  const branchName = `contribute/content-${slug}-${timestamp}`;
  const filePath = `curriculum/${stage}/${pillar}/${contentType}-${slug}.md`;
  const markdownContent = buildMarkdownContent(submission);

  const prBody = [
    `## Community Content Submission`,
    "",
    `**Title:** ${submission.title}`,
    `**Pillar:** ${submission.pillar}`,
    `**Stage:** ${submission.stage}`,
    `**Content Type:** ${submission.contentType}`,
    `**Duration:** ${submission.duration}`,
    "",
    "### Description",
    "This draft was submitted via the New American Codex contribution form by a community member.",
    "",
    "### Review Checklist",
    "- [ ] Frontmatter fields complete and accurate",
    "- [ ] Learning objectives specific and measurable",
    "- [ ] Materials realistic and accessible",
    "- [ ] Safety considerations noted",
    "- [ ] Content appropriate for stage",
    "- [ ] Philosophical alignment confirmed",
    submission.submitterName
      ? `\n**Submitted by:** ${submission.submitterName}${submission.submitterEmail ? ` (${submission.submitterEmail})` : ""}`
      : "",
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const sha = await getMainSHA(token);
    await createBranch(token, branchName, sha);
    await createFile(
      token,
      filePath,
      markdownContent,
      `feat: add community content "${submission.title}"`,
      branchName
    );
    const pr = await createPR(
      token,
      `[Community] ${submission.title}`,
      prBody,
      branchName
    );

    const response: ContributeResponse = {
      url: pr.html_url,
      number: pr.number,
    };
    return NextResponse.json(response);
  } catch (err) {
    console.error("GitHub PR creation failed:", err);
    return NextResponse.json(
      { error: "Failed to submit content. Please try again later." },
      { status: 500 }
    );
  }
}
