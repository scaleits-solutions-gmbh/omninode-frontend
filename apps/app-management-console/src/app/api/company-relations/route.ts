import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { getSessionTokenPayload } from "@/lib/utils/misc/session-token";
import { FeOrganizationRelationship } from "@/types/fe/fe-organization-relationship";
import {
  OrganizationRelationshipService,
  PaginatedResponse,
  ResultType,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const organizationRelationshipService = new OrganizationRelationshipService();

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const pageSize = request.nextUrl.searchParams.get("pageSize");
  const search = request.nextUrl.searchParams.get("search");

  const sessionTokenPayload = await getSessionTokenPayload();
  const organizationId = sessionTokenPayload.organizationId;

  const { result, resultType } =
    await organizationRelationshipService.fetchOrganizationRelationships({
      leftOrganizationId: organizationId,
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
    const mappedResponse: PaginatedResponse<FeOrganizationRelationship> = {
      items: result.items.map((organizationRelationship) => {
        return {
          id: organizationRelationship.id,
          leftOrganizationId: organizationRelationship.leftOrganizationId,
          leftOrganizationName: organizationRelationship.leftOrganizationName,
          leftOrganizationImageUrl: "", // Not provided by service, setting empty string
          leftOrganizationEmail: organizationRelationship.leftOrganizationEmail,
          rightOrganizationId: organizationRelationship.rightOrganizationId,
          rightOrganizationName: organizationRelationship.rightOrganizationName,
          rightOrganizationImageUrl: "", // Not provided by service, setting empty string
          rightOrganizationEmail: organizationRelationship.rightOrganizationEmail,
          relationshipType: organizationRelationship.relationshipType,
          createdAt: new Date(organizationRelationship.createdAt),
          updatedAt: new Date(organizationRelationship.updatedAt),
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
