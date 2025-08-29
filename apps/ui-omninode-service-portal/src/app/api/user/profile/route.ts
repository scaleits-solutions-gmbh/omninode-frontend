import { NextResponse } from "next/server";
import { ResultType, UserService } from "@scaleits-solutions-gmbh/services";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { FeUserProfileSchema } from "@/schema/feUserProfile";
import { FeUserProfile } from "@/types/feUser";

export async function GET(): Promise<NextResponse<FeUserProfile>|NextResponse<unknown>> {
    const sessionTokenPayload = await getSessionTokenPayload();

    const userService = new UserService();
    const {result,resultType} = await userService.getUserById(sessionTokenPayload.sub);

    if (resultType === ResultType.SUCCESS && result) {
        return NextResponse.json(FeUserProfileSchema.parse(result));
    }

    return handleServiceError(resultType, "User profile");
}

export async function PUT(request: Request): Promise<NextResponse<void>|NextResponse<unknown>> {
    const body = await request.json();

    const sessionTokenPayload = await getSessionTokenPayload();

    const userService = new UserService();
    const {resultType} = await userService.updateUser(sessionTokenPayload.sub,body);

    if (resultType === ResultType.SUCCESS) {
        return NextResponse.json(null);
    }

    return handleServiceError(resultType, "User profile");
}
