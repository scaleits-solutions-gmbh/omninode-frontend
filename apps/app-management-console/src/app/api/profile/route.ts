import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { UserProfileSchema } from "@/schemas/user-schema";
import { ResultType, UserService } from "@scaleits-solutions-gmbh/services";
import { NextResponse } from "next/server";

const userService = new UserService();

export async function GET() {
  try {
    const tokenPayload = await getSessionTokenPayload();
    if (!tokenPayload.sub) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { result, resultType } = await userService.getUserById(
      tokenPayload.sub,
    );

    if (resultType !== ResultType.SUCCESS) {
      return handleServiceError(resultType);
    }

    const sanitizedUser = UserProfileSchema.parse(result);

    return NextResponse.json(sanitizedUser);
  } catch (error) {
    console.error("Error in GET /api/profile:", error);
    if (error instanceof Error && error.message.includes("Invalid token")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
