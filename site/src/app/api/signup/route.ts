import { NextResponse } from "next/server";
import { getDb, ensureTables } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await ensureTables();
    const sql = getDb();

    // Check for duplicates
    const existing = await sql`SELECT id FROM signups WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: "You're already on the list! We'll keep you posted.",
      });
    }

    await sql`INSERT INTO signups (email) VALUES (${email})`;

    return NextResponse.json({
      success: true,
      message: "You're on the list! Welcome to the Codex community.",
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
