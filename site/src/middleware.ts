import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  if (host.startsWith("newamericancodex.com")) {
    const url = request.url.replace("newamericancodex.com", "newamericancodex.org");
    return NextResponse.redirect(url, { status: 301 });
  }
}

export const config = {
  matcher: "/:path*",
};
