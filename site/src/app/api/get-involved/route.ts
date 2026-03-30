import { NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

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

  // Honeypot check — silently succeed for bots
  if (b._trap && typeof b._trap === "string" && b._trap.length > 0) {
    return NextResponse.json({ success: true, message: "Thanks for reaching out!" });
  }

  // Validate required fields
  const name = typeof b.name === "string" ? stripHtml(b.name) : "";
  const email = typeof b.email === "string" ? stripHtml(b.email).toLowerCase() : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Optional fields
  const phone = typeof b.phone === "string" ? stripHtml(b.phone) : null;
  const linkedin = typeof b.linkedin === "string" ? stripHtml(b.linkedin) : null;
  const message = typeof b.message === "string" ? stripHtml(b.message) : null;

  try {
    await ensureTables();
    const sql = getDb();

    // Duplicate detection on email
    const existing = await sql`SELECT id FROM supporters WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: "We already have your info — thank you for your continued interest!",
      });
    }

    await sql`
      INSERT INTO supporters (name, email, phone, linkedin, message)
      VALUES (${name}, ${email}, ${phone}, ${linkedin}, ${message})
    `;

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch soon.",
    });
  } catch (err) {
    console.error("Failed to save supporter:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
