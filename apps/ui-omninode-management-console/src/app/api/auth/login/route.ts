import { generateSessionJWT } from "@/lib/temp/sessionjwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Parse request body to get credentials
        const body = await request.json();
        const { email, password } = body;

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // TODO: Replace with actual authentication logic
        // For now, using sample validation - REMOVE IN PRODUCTION
        if (email !== "admin@omninode.com" || password !== "b8#%#K1642Ao") {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = await generateSessionJWT({
            sub: "c5664da2-b6cf-43d0-9a96-78bcfb0426a3", 
            role: 'admin',
            companyId: '16c963db-1f1e-4f41-98f3-c6d13470090a',
            // Add other user-specific claims as needed
        });

        // Set secure cookie
        const cookieStore = await cookies();
        cookieStore.set("authorization", token, {
            httpOnly: true,          // Prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // HTTPS in production
            sameSite: 'strict',      // CSRF protection
            maxAge: 60 * 60 * 24,    // 24 hours
            path: '/',               // Available site-wide
        });

        return NextResponse.json({ 
            user: {
                id: "1",
                email: "admin@example.com",
                firstName: "Admin",
                lastName: "User",
                role: "admin",
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}