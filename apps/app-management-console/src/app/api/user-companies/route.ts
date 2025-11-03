import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { UserOrganizationInputSchema } from "@/schemas/user-schema";
import { FeUser } from "@/types/fe/fe-user";
import {
  PaginatedResponse,
  ResultType,
  UserOrganizationService,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const userOrganizationService = new UserOrganizationService();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<PaginatedResponse<FeUser> | unknown>> {
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const search = request.nextUrl.searchParams.get("search");

  const sessionTokenPayload = await getSessionTokenPayload();
  const organizationId = sessionTokenPayload.organizationId;

  if (!organizationId) {
    return NextResponse.json(
      { error: "Organization ID is required" },
      { status: 400 },
    );
  }
  const { result, resultType } = await userOrganizationService.fetchUserCompanies({
    organizationId: organizationId,
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
        return UserOrganizationInputSchema.parse(item);
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
