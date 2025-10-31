import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import {
  OrganizationRelationshipInviteService,
  OrganizationRole,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<null | unknown>> {
  const currentOrganizationId = (await getSessionTokenPayload()).organizationId;
  const body = await request.json();
  const { email, leftOrganizationId, rightOrganizationId, organizationId, relationshipType } =
    body;

  const organizationRelationshipInviteService =
    new OrganizationRelationshipInviteService();
  const { resultType } =
    await organizationRelationshipInviteService.createOrganizationRelationshipInvite({
      inviterOrganizationId: currentOrganizationId,
      leftOrganizationId: leftOrganizationId,
      rightOrganizationId: rightOrganizationId,
      relationshipType: relationshipType,
      email: email,
      organizationId: organizationId,
      organizationRole: OrganizationRole.Admin,
    });

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "sendUserInvite");
  }

  console.log("success");

  return NextResponse.json(null);
}
