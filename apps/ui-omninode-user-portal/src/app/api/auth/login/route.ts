import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import {
  OmninodeLoginService,
  OmninodeLoginTokenPayload,
  ResultType,
  ManagementConsoleAccess,
} from "@scaleits-solutions-gmbh/services";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";

export async function POST(
  request: NextRequest
): Promise<NextResponse<null | unknown>> {
  const { email, password } = await request.json();
  const omninodeLoginService = new OmninodeLoginService();
  const { result, resultType } = await omninodeLoginService.login(
    email,
    password
  );
  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }

  const sessionTokenPayload = decodeJwt<OmninodeLoginTokenPayload>(
    result.token
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

  // Add currentUserId cookie http only to response
  response.cookies.set("currentUserId", sessionTokenPayload.sub as string, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    domain: process.env.DOMAIN,
    maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
  });
  // Add currentCompanyId cookie http only to response
  response.cookies.set(
    "currentCompanyId",
    sessionTokenPayload.companyId as string,
    {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      domain: process.env.DOMAIN,
      maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
    }
  );
  // Add managementConsoleAccess cookie http only to response
  response.cookies.set("managementConsoleAccess", ManagementConsoleAccess.Admin, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    domain: process.env.DOMAIN,
    maxAge: sessionTokenPayload.exp - sessionTokenPayload.iat,
  });
  return response;
}
