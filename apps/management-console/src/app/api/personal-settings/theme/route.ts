import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionJWT } from "@/lib/temp/sessionjwt";
import {  ResultType, UserService, sanitizeWithZod} from "@scaleits-solutions-gmbh/services"
import { handleServiceError } from "@/lib/utils/misc/api-error-handler"
import "@/schemas/userSchema";

const userService = new UserService();


export async function PUT(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const authorization = cookieStore.get("authorization");
        
        if (!authorization) {
            return NextResponse.json({ error: "Authorization not found" }, { status: 401 });
        }
        
        const tokenPayload = await verifySessionJWT(authorization.value);
        if (!tokenPayload.sub) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
        
        const body = await request.json();
        
        // Basic validation for required fields
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }
        
        const {result, resultType} = await userService.updateUser(tokenPayload.sub, body);

        if (resultType !== ResultType.SUCCESS) {
            return handleServiceError(resultType);
        }
        
        const sanitizedUser = sanitizeWithZod(result, "UserProfile");
        return NextResponse.json(sanitizedUser);
    } catch (error) {
        console.error("Error in PUT /api/profile:", error);
        if (error instanceof Error && error.message.includes('Invalid token')) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
