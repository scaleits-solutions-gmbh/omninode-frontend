import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getAuthUrl, getOriginUrl } from "@repo/pkg-frontend-common-kit/utils";

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export default async function proxy(request: NextRequest) {
  // Validate the NextAuth JWT using the shared secret (no local NextAuth routes needed)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if token exists and is not expired
  // We check access_token_expired (Keycloak token expiry) as primary validation
  // since it reflects the actual backend token validity, not just the session cookie
  const accessTokenExpiredMs =
    typeof token?.access_token_expired === "number"
      ? token.access_token_expired
      : 0;

  const isTokenValid = !!token && accessTokenExpiredMs > Date.now();
  if (isTokenValid) {
    return NextResponse.next();
  }

  // Not authenticated or token expired → redirect to centralized auth app's signin
  // Always redirect via the parent app domain so users never see sub-app domains
  const originUrl = getOriginUrl();
  const callbackUrl = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    originUrl,
  ).toString();

  const signInUrl = getAuthUrl(callbackUrl);
  return NextResponse.redirect(signInUrl);
}
