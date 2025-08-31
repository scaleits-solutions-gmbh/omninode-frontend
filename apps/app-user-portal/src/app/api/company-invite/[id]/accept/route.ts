import { NextRequest, NextResponse } from "next/server";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import {
  CompanyRelationshipInviteService,
  CompanyRelationshipService,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<null | unknown>> {
  const { id } = await params;
  const currentCompanyId = (await getSessionTokenPayload()).companyId;
  const companyRelationshipInviteService =
    new CompanyRelationshipInviteService();
  const { result, resultType } =
    await companyRelationshipInviteService.getCompanyRelationshipInviteById(id);
  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(
      resultType,
      "Failed to accept company relationship invite",
    );
  }
  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "Unhandled error");
  }
  if (result.companyId !== currentCompanyId) {
    return handleServiceError(
      ResultType.UNAUTHORIZED,
      "You are not authorized to accept this company relationship invite",
    );
  }
  const companyRelationshipService = new CompanyRelationshipService();
  const { resultType: acceptResultType } =
    await companyRelationshipService.createCompanyRelationship({
      leftCompanyId: result.leftCompanyId,
      rightCompanyId: result.rightCompanyId,
      relationshipType: result.relationshipType,
    });
  if (acceptResultType !== ResultType.SUCCESS) {
    return handleServiceError(
      acceptResultType,
      "Failed to accept company relationship invite",
    );
  }
  return NextResponse.json(null);
}
