import { getSessionTokenPayload } from "./lib/utils/misc/sessionToken";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};

const publicRoutes: string[] = [
  "/login",
  "/api/auth/login",
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }
  try {
    const sessionTokenPayload = await getSessionTokenPayload();
    if (!sessionTokenPayload) {
      throw new Error("Session token not found");
    }
    if (sessionTokenPayload.exp < Date.now() / 1000) {
      throw new Error("Session token expired");
    }
    return NextResponse.next();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMessage === "Session token not found") {
      // Missing token - redirect to login
    } else if (errorMessage === "Session token expired") {
      // Expired token - redirect to login with message
    } else {
      // Invalid token - redirect to login
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}