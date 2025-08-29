import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeSessionJWT } from "@/lib/temp/sessionjwt";
import { CompanyRelationshipService, PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeCompanyRelationship } from "@/types/feCompanyRelationship";

const companyRelationshipService = new CompanyRelationshipService();

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const pageSize = request.nextUrl.searchParams.get('pageSize');
  const search = request.nextUrl.searchParams.get('search');

  const cookieStore = await cookies();
  const authorization = cookieStore.get("authorization")?.value as string;

  const decoded = await decodeSessionJWT(authorization);
  const companyId = decoded.companyId as string;

  if (!companyId) {
    return NextResponse.json({ error: "Company ID is required" }, { status: 400 });
  }
  
  const response = await companyRelationshipService.fetchCompanyRelationships({
    leftCompanyId: companyId,
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined,
    search: search ?? undefined,
  });

  // Check if the service call was successful
  if (!response.result) {
    return NextResponse.json({ error: "Failed to fetch company relationships" }, { status: 500 });
  }

  console.log(response.result);
  const mappedResponse: PaginatedResponse<FeCompanyRelationship> = {
    items: response.result.items.map((companyRelationship) => {
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
    total: response.result.total,
    page: response.result.page,
    pageSize: response.result.pageSize,
    totalPages: response.result.totalPages,
  };
  return NextResponse.json(mappedResponse);
}