import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "thenewamerican.org";

const REDIRECT_HOSTS = [
  "newamericancodex.com",
  "www.newamericancodex.com",
  "newamericancodex.org",
  "www.newamericancodex.org",
  "www.thenewamerican.org",
];

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").split(":")[0];
  if (REDIRECT_HOSTS.includes(host)) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url.toString(), { status: 301 });
  }
}

export const config = {
  matcher: "/:path*",
};
