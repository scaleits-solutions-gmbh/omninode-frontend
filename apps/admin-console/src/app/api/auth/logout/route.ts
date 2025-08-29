import { NextResponse } from "next/server";

export async function POST() {
    // Create response
    const response = NextResponse.json({ message: "Logged out successfully" });
    
    response.cookies.set("ac_sessionToken", "", {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        path: "/",
    });
    
    return response;
} 