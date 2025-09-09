import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(request: NextRequest) {
    console.log("middleware", request.nextUrl.pathname);
    if(request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/user-portal", request.url), 308);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to the signin page and auth-related routes without authentication
        if (req.nextUrl.pathname.startsWith("/authflows") || 
            req.nextUrl.pathname.startsWith("/api/auth")) {
          return true;
        }
        // For all other routes, require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/authflows/signin",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - .png and .svg files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)",
  ],
};
