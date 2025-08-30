import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { UserCompanyInputSchema } from "@/schemas/user-schema";
import { FeUser } from "@/types/fe/fe-user";
import {
  PaginatedResponse,
  ResultType,
  UserCompanyService,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const userCompanyService = new UserCompanyService();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginatedResponse<FeUser> | unknown>> {
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const search = request.nextUrl.searchParams.get("search");

  const sessionTokenPayload = await getSessionTokenPayload();
  const companyId = sessionTokenPayload.companyId;

  if (!companyId) {
    return NextResponse.json(
      { error: "Company ID is required" },
      { status: 400 },
    );
  }
  const { result, resultType } = await userCompanyService.fetchUserCompanies({
    companyId: companyId,
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined,
    search: search ?? undefined,
  });

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }
  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }
  try {
    const mappedResponse: PaginatedResponse<FeUser> = {
      items: result.items.map((item) => {
        return UserCompanyInputSchema.parse(item);
      }),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };
    return NextResponse.json(mappedResponse);
  } catch {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}
