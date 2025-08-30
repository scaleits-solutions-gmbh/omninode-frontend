import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/user-portal", request.url), 308);
}

export const config = {
  matcher: ["/"],
};
