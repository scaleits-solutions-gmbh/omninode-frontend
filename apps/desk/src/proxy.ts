//import { getSessionTokenPayload } from "./lib/utils/misc/session-token";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|assets).*)",
  ],
};

const publicRoutes = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/api/login",
  "/api/auth/login",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/user-invite",
  "/api/user-invite",
];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }
  try {
    /*const sessionTokenPayload = await getSessionTokenPayload();
    if (!sessionTokenPayload) {
      throw new Error("Session token not found");
    }
    if (sessionTokenPayload.exp < Date.now() / 1000) {
      throw new Error("Session token expired");
    }*/
    return NextResponse.next();
  } catch {
    // Get the custom domain from headers (Vercel sets x-forwarded-host for custom domains)
    const host =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "https";

    // Construct the current URL with the custom domain
    const currentUrl = `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`;

    return NextResponse.redirect(
      new URL(
        `/login?redirectUrl=${encodeURIComponent(currentUrl)}`,
        request.url,
      ),
    );
  }
}
