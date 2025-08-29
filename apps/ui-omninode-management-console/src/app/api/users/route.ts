import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decodeSessionJWT } from "@/lib/temp/sessionjwt";
import { UserCompanyService, PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeUser } from "@/types/feUser";
import { UserInputSchema } from "@/schemas/userSchema";

const userCompanyService = new UserCompanyService();

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
  const response = await userCompanyService.fetchUserCompanies({
    companyId: companyId,
    page: page ? parseInt(page) : undefined,
    pageSize: pageSize ? parseInt(pageSize) : undefined,
    search: search ?? undefined,
  });

  if (!response.result) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }

  const mappedResponse: PaginatedResponse<FeUser> = {
    items: response.result.items.map((item) => {
      return UserInputSchema.parse(item);
    }),
    total: response.result.total,
    page: response.result.page,
    pageSize: response.result.pageSize,
    totalPages: response.result.totalPages,
  };

  return NextResponse.json(mappedResponse);
}