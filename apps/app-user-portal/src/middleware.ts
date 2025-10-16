import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function formatDurationFromMs(milliseconds: number): string {
  const abs = Math.abs(milliseconds);
  const seconds = Math.floor(abs / 1000) % 60;
  const minutes = Math.floor(abs / (1000 * 60)) % 60;
  const hours = Math.floor(abs / (1000 * 60 * 60)) % 24;
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const parts: string[] = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}

function formatIsoOrNA(epochMs: number): string {
  return epochMs > 0 ? new Date(epochMs).toISOString() : "N/A";
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export default async function middleware(request: NextRequest) {
  // Validate the NextAuth JWT using the shared secret (no local NextAuth routes needed)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // Treat tokens without exp or with past exp as invalid
  
  const tokenExpiresAtMs = typeof token?.exp === "number" ? token.exp * 1000 : 0;
  const nowMs = Date.now();
  const msUntilExpiry = tokenExpiresAtMs - nowMs;

  console.log(
    "Token expiry:",
    tokenExpiresAtMs,
    `| ${formatIsoOrNA(tokenExpiresAtMs)}`
  );
  console.log("Now:", nowMs, `| ${new Date(nowMs).toISOString()}`);
  console.log(
    "Time until expiry:",
    msUntilExpiry >= 0
      ? `${formatDurationFromMs(msUntilExpiry)} (${msUntilExpiry}ms)`
      : `expired ${formatDurationFromMs(-msUntilExpiry)} ago (${msUntilExpiry}ms)`
  );
  const isTokenValid = !!token && tokenExpiresAtMs > Date.now();
  if (isTokenValid) {
    return NextResponse.next();
  }

  // Not authenticated → redirect to centralized auth app's signin
  // Use the current URL as callback so the user returns to where they came from
  const signInUrl = new URL("/authflows/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
  return NextResponse.redirect(signInUrl);
}
