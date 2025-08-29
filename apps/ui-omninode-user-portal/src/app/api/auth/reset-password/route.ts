import { NextRequest, NextResponse } from "next/server";
import { getMockData } from "./data";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { ResultType } from "@scaleits-solutions-gmbh/services";
import { ResetPasswordProcess } from "@/types/feResetPasswordProcess";

export async function GET(request: NextRequest): Promise<NextResponse<ResetPasswordProcess|unknown>> {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return handleServiceError(ResultType.BAD_REQUEST, "Token is required");
  }

  const { result, resultType } = await getMockData(token);

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType, "Failed to get reset password process");
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "Unhandled error");
  }

  try {
    const mappedResult: ResetPasswordProcess = {
      id: result.id,
      userId: result.userId,
      email: result.email,
      expiresAt: result.expiresAt,
      isUsed: result.isUsed,
    };

    return NextResponse.json(mappedResult);
  } catch {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR, "Failed to parse response");
  }
}
