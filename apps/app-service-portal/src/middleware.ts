import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@repo/pkg-frontend-common-kit/utils";

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};

const publicRoutes = [
  "/authflows/signin",
];

function isPublic(pathname: string) {
  return publicRoutes.some((route) => pathname.startsWith(route));
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // For non-public API requests, return 401 instead of redirect
  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // For protected pages, if not authenticated, force redirect directly to Keycloak
  if (!isPublic(pathname)) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      const path = "service-portal" + request.nextUrl.pathname + request.nextUrl.search;
      return NextResponse.redirect(getAuthUrl(path));
    }
  }
  return NextResponse.next();
}
