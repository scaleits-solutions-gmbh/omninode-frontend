/* Mock Implementation */
import { NextRequest, NextResponse } from "next/server";
import { FeUserInvite } from "@/types/fe/feUserInvite";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { getMockData } from "./data";

export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<FeUserInvite>|unknown>> {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return NextResponse.json(getMockData({page, pageSize, search}));
}

export async function POST(): Promise<NextResponse<null|unknown>> {
    return NextResponse.json(null);
}


/* Real Implementation */
/*import { NextRequest, NextResponse } from "next/server";
import { UserInviteService, ResultType,PaginatedResponse} from "@scaleits-solutions-gmbh/services";
import { FeUserInvite } from "@/types/fe/FeUserInvite";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { FeUserInviteTransformerSchema } from "@/schemas/transformers/FeUserInviteTransformer";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<PaginatedResponse<FeUserInvite>|unknown>> {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  const UserInviteService = new UserInviteService();
  const {result,resultType} = await UserInviteService.fetchUserInvites({
    companyId: id,
    search: search,
    page: page,
    pageSize: pageSize,
  });

  if (resultType != ResultType.SUCCESS) {
    return handleServiceError(resultType, "fetchUserInvites");
  }

  if (!result) {
    return handleServiceError(ResultType.INTERNAL_SERVER_ERROR, "fetchUserInvites");
  }

  try {
    const mappedResult: PaginatedResponse<FeUserInvite> = {
      items: result.items.map((item) => {
        return FeUserInviteTransformerSchema.parse(item);
      }),
      page: result.page,
      pageSize: result.pageSize,
      total: result.total,
      totalPages: result.totalPages,
    };

    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error("Error transforming user invite data:", error);
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR, "Data parsing failed");
  }
}
  
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<null|unknown>> {
    const { id } = await params;
    const body = await request.json();
    const { email, managementConsoleAccess } = body;

    const UserInviteService = new UserInviteService();
    const {result,resultType} = await UserInviteService.sendUserInvite({
      companyId: id,
      email: email,
      managementConsoleAccess: managementConsoleAccess,
    });

    if (resultType != ResultType.SUCCESS) {
        return handleServiceError(resultType, "sendUserInvite");
    }

    return NextResponse.json(null);
}
*/