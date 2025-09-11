import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("middleware", pathname);

  // Validate the NextAuth JWT using the shared secret (no local NextAuth routes needed)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (token) {
    return NextResponse.next();
  }

  // Not authenticated → redirect to centralized auth app's signin
  // Use the current URL as callback so the user returns to where they came from
  const signInUrl = new URL("/authflows/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);
  return NextResponse.redirect(signInUrl);
}
