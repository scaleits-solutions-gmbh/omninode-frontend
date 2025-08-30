import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { FeCompanyRelationship } from "@/types/fe/fe-company-relationship";
import {
  CompanyRelationshipService,
  PaginatedResponse,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const companyRelationshipService = new CompanyRelationshipService();

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const search = request.nextUrl.searchParams.get("search");

  const sessionTokenPayload = await getSessionTokenPayload();
  const companyId = sessionTokenPayload.companyId;

  const { result, resultType } =
    await companyRelationshipService.fetchCompanyRelationships({
      leftCompanyId: companyId,
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 10,
      search: search ?? undefined,
    });

  // Check if the service call was successful
  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }
  try {
    const mappedResponse: PaginatedResponse<FeCompanyRelationship> = {
      items: result.items.map((companyRelationship) => {
        return {
          id: companyRelationship.id,
          leftCompanyId: companyRelationship.leftCompanyId,
          leftCompanyName: companyRelationship.leftCompanyName,
          leftCompanyImageUrl: "", // Not provided by service, setting empty string
          leftCompanyEmail: companyRelationship.leftCompanyEmail,
          rightCompanyId: companyRelationship.rightCompanyId,
          rightCompanyName: companyRelationship.rightCompanyName,
          rightCompanyImageUrl: "", // Not provided by service, setting empty string
          rightCompanyEmail: companyRelationship.rightCompanyEmail,
          relationshipType: companyRelationship.relationshipType,
          createdAt: new Date(companyRelationship.createdAt),
          updatedAt: new Date(companyRelationship.updatedAt),
        };
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
