import { cookies } from "next/headers";
import { decodeSessionJWT } from "@/lib/temp/sessionjwt";
import {
  UserCompanyService,
  sanitizeArrayWithZod,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextResponse } from "next/server";
import "@/schemas/viewSchema";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";

export async function GET() {
  const userCompanyService = new UserCompanyService();
  const cookieStore = await cookies();
  const authorization = cookieStore.get("authorization")?.value as string;
  if (!authorization) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = await decodeSessionJWT(authorization);
  const userId = decoded.sub as string;

  if (!userId) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const views = await userCompanyService.fetchUserCompanies({
    userId: userId,
    pageSize: 1000,
  });

  if (views.resultType !== ResultType.SUCCESS) {
    return handleServiceError(views.resultType);
  }

  if (!views.result) {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
  try {
    const sanitizedViews = sanitizeArrayWithZod(views.result?.items, "View");
    return NextResponse.json(sanitizedViews);
  } catch (error) {
    console.error(error);
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}
