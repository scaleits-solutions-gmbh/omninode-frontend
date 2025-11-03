import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import {
  OrganizationRole,
  OmninodeLoginService,
  OmninodeLoginTokenPayload,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
): Promise<NextResponse<null | unknown>> {
  const userId = (await getSessionTokenPayload()).sub;
  const targetOrganizationId = (await request.json()).targetOrganizationId;

  const omninodeLoginService = new OmninodeLoginService();
  const { result, resultType } = await omninodeLoginService.switchOrganization(
    userId,
    targetOrganizationId,
  );
  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }

  const sessionTokenPayload = decodeJwt<OmninodeLoginTokenPayload>(
    result.token,
  );

  // Create NextResponse with the API response data
  const response = NextResponse.json({});

  // Add sessionToken cookie http only to response
  response.cookies.set("sessionToken", result.token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    domain: process.env.DOMAIN,
    maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
  });

  // Add currentOrganizationId cookie http only to response
  response.cookies.set(
    "currentOrganizationId",
    sessionTokenPayload.organizationId as string,
    {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      domain: process.env.DOMAIN,
      maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
    },
  );
  response.cookies.set(
    "organizationRole",
    OrganizationRole.None,
    {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      domain: process.env.DOMAIN,
      maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
    },
  );
  return response;
}
