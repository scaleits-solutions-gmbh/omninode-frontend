import { NextResponse } from "next/server";
import {
  AdminConsoleLoginService,
  AdminConsoleLoginJwtPayload,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { decodeJwt } from "jose";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";

export async function POST(
  request: Request,
): Promise<NextResponse<null | unknown>> {
  try {
    const { email, password } = await request.json();

    const adminConsoleLoginService = new AdminConsoleLoginService();
    const result = await adminConsoleLoginService.login(email, password);

    if (result.resultType === ResultType.SUCCESS && result.result) {
      const response = NextResponse.json(null);
      const decodedToken = decodeJwt<AdminConsoleLoginJwtPayload>(
        result.result.token,
      );
      response.cookies.set("ac_sessionToken", result.result.token, {
        httpOnly: true,
        secure: true,
        maxAge: decodedToken.exp - decodedToken.iat,
        path: "/",
      });
      return response;
    }

    return handleServiceError(result.resultType);
  } catch {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }
}
