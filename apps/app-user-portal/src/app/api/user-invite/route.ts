import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { feCompanyUserInviteSchema } from "@/schema/fe-company-user-invite";
import { FeCompanyUserInvite } from "@/types/fe-company-user-invite";
import { CompanyUserInviteService, ResultType } from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<FeCompanyUserInvite | unknown>> {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return handleServiceError(ResultType.BAD_REQUEST, "Token is required");
  }
  const companyUserInviteService = new CompanyUserInviteService();

  const { result, resultType } =
    await companyUserInviteService.getCompanyUserInvites({
      page: 1,
      pageSize: 1,
      token: token,
    });

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType, "Failed to get user invite");
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "Unhandled error");
  }
  if (result.items.length === 0) {
    return handleServiceError(ResultType.NOT_FOUND, "User invite not found");
  }

  try {
    const mappedResult: FeCompanyUserInvite = feCompanyUserInviteSchema.parse(
      result.items[0],
    );

    return NextResponse.json(mappedResult);
  } catch {
    return handleServiceError(
      ResultType.RESPONSE_PARSE_ERROR,
      "Failed to parse response",
    );
  }
}
