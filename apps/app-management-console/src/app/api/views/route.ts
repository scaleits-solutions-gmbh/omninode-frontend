import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import {
  ResultType,
  UserCompanyService,
} from "@scaleits-solutions-gmbh/services";
import { NextResponse } from "next/server";

export async function GET() {
  const userCompanyService = new UserCompanyService();

  const sessionTokenPayload = await getSessionTokenPayload();

  if (!sessionTokenPayload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { result, resultType } = await userCompanyService.fetchUserCompanies({
    userId: sessionTokenPayload.sub,
    pageSize: 1000,
  });

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }

  if (!result) {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
  try {
    return NextResponse.json(result?.items);
  } catch (error) {
    console.error(error);
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}
