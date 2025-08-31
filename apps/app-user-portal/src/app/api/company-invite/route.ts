import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { feCompanyInvite } from "@/types/fe-company-invite";
import { CompanyRelationshipInviteService, ResultType } from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<feCompanyInvite | unknown>> {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return handleServiceError(ResultType.BAD_REQUEST, "Token is required");
  }

  const companyRelationshipInviteService =
    new CompanyRelationshipInviteService();

  const { result, resultType } =
    await companyRelationshipInviteService.getCompanyRelationshipInvites({
      page: 1,
      pageSize: 1,
      token: token,
    });

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType, "Failed to get company invite");
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "Unhandled error");
  }

  try {
    const mappedResult: feCompanyInvite = {
      id: result.items[0].id,
      companyId: result.items[0].inviterCompanyId,
      companyName: result.items[0].inviterCompanyName,
      inviteeCompanyId: result.items[0].companyId,
      inviteeCompanyName: result.items[0].companyName,
      leftCompanyId: result.items[0].leftCompanyId,
      leftCompanyName: result.items[0].leftCompanyName,
      rightCompanyId: result.items[0].rightCompanyId,
      rightCompanyName: result.items[0].rightCompanyName,
      relationship: result.items[0].relationshipType,
    };

    return NextResponse.json(mappedResult);
  } catch {
    return handleServiceError(
      ResultType.RESPONSE_PARSE_ERROR,
      "Failed to parse response",
    );
  }
}
