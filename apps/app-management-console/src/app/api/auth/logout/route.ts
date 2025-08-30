import { NextResponse } from "next/server";

export async function POST() {
  // Create response
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear both authentication and UI state cookies from shared domain
  // Use the same domain settings as when setting the cookies
  response.cookies.set("sessionToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    domain: process.env.DOMAIN,
    maxAge: 0, // This expires the cookie immediately
  });

  response.cookies.set("userState", "", {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    domain: process.env.DOMAIN,
    maxAge: 0, // This expires the cookie immediately
  });

  return response;
}
