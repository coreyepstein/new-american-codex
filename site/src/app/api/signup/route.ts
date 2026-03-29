import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Signup {
  email: string;
  timestamp: string;
}

interface SignupsData {
  signups: Signup[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const SIGNUPS_FILE = path.join(DATA_DIR, "signups.json");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureDataFile(): Promise<SignupsData> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory exists
  }

  try {
    const raw = await fs.readFile(SIGNUPS_FILE, "utf-8");
    return JSON.parse(raw) as SignupsData;
  } catch {
    const initial: SignupsData = { signups: [] };
    await fs.writeFile(SIGNUPS_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
}

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

    const data = await ensureDataFile();

    // Check for duplicates
    const exists = data.signups.some((s) => s.email === email);
    if (exists) {
      return NextResponse.json({
        success: true,
        message: "You're already on the list! We'll keep you posted.",
      });
    }

    data.signups.push({
      email,
      timestamp: new Date().toISOString(),
    });

    await fs.writeFile(SIGNUPS_FILE, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      message: "You're on the list! Welcome to the Codex community.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
