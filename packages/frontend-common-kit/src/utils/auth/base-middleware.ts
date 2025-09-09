import { getAuthUrl } from "../url-utils";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function baseMiddleware(request: NextRequest,baseUrl: string, publicRoutes: string[] = [] ) {
  const { pathname } = request.nextUrl;
  const apiPrefix = `${baseUrl}/api`;
  const authApiPrefix = `${baseUrl}/api/auth`;
  // For non-public API requests, return 401 instead of redirect
  if (pathname.startsWith(apiPrefix) && !pathname.startsWith(authApiPrefix)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // For protected pages, if not authenticated, force redirect directly to Keycloak
  if (!publicRoutes.some((route) => pathname === route)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      const currentPath =
        baseUrl +
        request.nextUrl.pathname +
        request.nextUrl.search;
      return NextResponse.redirect(getAuthUrl(currentPath));
    }
  }
  return NextResponse.next();
}
