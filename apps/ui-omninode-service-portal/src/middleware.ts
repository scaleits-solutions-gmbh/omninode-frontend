import { getSessionToken } from "./lib/utils/misc/sessionToken";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  try {
    // Try to get the session token
    await getSessionToken();
    
    // If successful, continue to the next middleware/route
    return NextResponse.next();
  } catch {
    
    // Get the custom domain from headers (Vercel sets x-forwarded-host for custom domains)
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    
    // Construct the current URL with the custom domain
    const currentUrl = `${protocol}://${host}${request.nextUrl.pathname}${request.nextUrl.search}`;
    
    // If session token is not found or invalid, redirect to login
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_USER_PORTAL_URL}/login?redirectUrl=${encodeURIComponent(currentUrl)}`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - Static assets (images, fonts, etc.)
     */   
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
  ],
};