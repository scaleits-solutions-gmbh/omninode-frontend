import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import {
  CompanyRelationshipInviteService,
  ManagementConsoleAccess,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<null | unknown>> {
  const currentCompanyId = (await getSessionTokenPayload()).companyId;
  const body = await request.json();
  const { email, leftCompanyId, rightCompanyId, companyId, relationshipType } =
    body;

  const companyRelationshipInviteService =
    new CompanyRelationshipInviteService();
  const { resultType } =
    await companyRelationshipInviteService.createCompanyRelationshipInvite({
      inviterCompanyId: currentCompanyId,
      leftCompanyId: leftCompanyId,
      rightCompanyId: rightCompanyId,
      relationshipType: relationshipType,
      email: email,
      companyId: companyId,
      managementConsoleAccess: ManagementConsoleAccess.Admin,
    });

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "sendUserInvite");
  }

  console.log("success");

  return NextResponse.json(null);
}
