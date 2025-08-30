import { NextRequest, NextResponse } from "next/server";
import {
  UserCompanyService,
  ResultType,
  PaginatedResponse,
} from "@scaleits-solutions-gmbh/services";
import { FeUser } from "@/types/fe/fe-user";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { feUserTransformerSchema } from "@/schemas/transformers/fe-user-transformer";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<PaginatedResponse<FeUser> | unknown>> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const userCompanyService = new UserCompanyService();
  const { result, resultType } = await userCompanyService.fetchUserCompanies({
    companyId: id,
    search: search,
    page: page,
    pageSize: pageSize,
  });

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "fetchUserCompanies");
  }

  if (!result) {
    return handleServiceError(
      ResultType.INTERNAL_SERVER_ERROR,
      "fetchUserCompanies",
    );
  }

  try {
    const mappedResult: PaginatedResponse<FeUser> = {
      items: result.items.map((item) => {
        return feUserTransformerSchema.parse(item);
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };

    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error("Error transforming user data:", error);
    return handleServiceError(
      ResultType.RESPONSE_PARSE_ERROR,
      "Data parsing failed",
    );
  }
}
