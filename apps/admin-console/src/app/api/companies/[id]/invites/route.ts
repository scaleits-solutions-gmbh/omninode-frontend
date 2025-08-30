/* Real Implementation */
import { NextRequest, NextResponse } from "next/server";
import {
  CompanyUserInviteService,
  ResultType,
  PaginatedResponse,
} from "@scaleits-solutions-gmbh/services";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { feCompanyUserInviteSchema } from "@/schemas/transformers/fe-company-user-invite-transformer";
import { FeCompanyUserInvite } from "@/types/fe/fe-company-user-invite";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<PaginatedResponse<FeCompanyUserInvite> | unknown>> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const companyUserInviteService = new CompanyUserInviteService();
  const { result, resultType } =
    await companyUserInviteService.getCompanyUserInvites({
      companyId: id,
      search: search,
      page: page,
      pageSize: pageSize,
    });

  if (resultType != ResultType.SUCCESS) {
    console.error("Error fetching user invites:", result);
    return handleServiceError(resultType, "fetchUserInvites");
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR, "fetchUserInvites");
  }

  try {
    const mappedResult: PaginatedResponse<FeCompanyUserInvite> = {
      items: result.items.map((item) => {
        return feCompanyUserInviteSchema.parse(item);
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };

    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error("Error transforming user invite data:", error);
    return handleServiceError(
      ResultType.RESPONSE_PARSE_ERROR,
      "Data parsing failed",
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<null | unknown>> {
  const { id } = await params;
  const body = await request.json();
  const { email, managementConsoleAccess } = body;

  const companyUserInviteService = new CompanyUserInviteService();
  const { resultType } = await companyUserInviteService.createCompanyUserInvite(
    {
      companyId: id,
      email: email,
      managementConsoleAccess: managementConsoleAccess,
    },
  );

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "sendUserInvite");
  }

  return NextResponse.json(null);
}
