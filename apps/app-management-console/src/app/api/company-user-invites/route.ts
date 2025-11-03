/* Real Implementation */

import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { feOrganizationUserInviteSchema } from "@/schemas/transformers/fe-organization-user-invite-transformer";
import { FeOrganizationUserInvite } from "@/types/fe/fe-organization-user-invite";
import {
  OrganizationUserInviteService,
  PaginatedResponse,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginatedResponse<FeOrganizationUserInvite> | unknown>> {
  const organizationId = (await getSessionTokenPayload()).organizationId;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const organizationUserInviteService = new OrganizationUserInviteService();
  const { result, resultType } =
    await organizationUserInviteService.getOrganizationUserInvites({
      organizationId: organizationId,
      search: search,
      page: page,
      pageSize: pageSize,
    });

  if (resultType != ResultType.SUCCESS) {
    console.error("Error fetching user invites:", result);
    return handleServiceError(resultType, "fetchUserInvites");
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "fetchUserInvites");
  }

  try {
    const mappedResult: PaginatedResponse<FeOrganizationUserInvite> = {
      items: result.items.map((item) => {
        return feOrganizationUserInviteSchema.parse(item);
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };

    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error("Error transforming user invite data:", error);
    return handleServiceError(
      ResultType.RESPONSE_PARSE_ERROR,
      "Data parsing failed",
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<null | unknown>> {
  const organizationId = (await getSessionTokenPayload()).organizationId;
  const body = await request.json();
  const { email, organizationRole } = body;
  const bodyToSend = {
    organizationId: organizationId,
    email: email,
    organizationRole: organizationRole,
  };
  console.log(bodyToSend);
  const organizationUserInviteService = new OrganizationUserInviteService();
  const { resultType } = await organizationUserInviteService.createOrganizationUserInvite(
    {
      organizationId: organizationId,
      email: email,
      organizationRole: organizationRole,
    },
  );

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "sendUserInvite");
  }

  console.log("success");

  return NextResponse.json(null);
}
