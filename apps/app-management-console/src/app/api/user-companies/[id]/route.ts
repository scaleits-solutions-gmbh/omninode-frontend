import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { UserCompanyInputSchema } from "@/schemas/user-schema";
import { FeUser } from "@/types/fe/fe-user";
import {
  ResultType,
  UserCompanyService,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const userCompanyService = new UserCompanyService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<FeUser | unknown>> {
  const { id } = await params;

  const { result, resultType } =
    await userCompanyService.fetchUserCompanyById(id);

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }
  try {
    const mappedResponse: FeUser = UserCompanyInputSchema.parse(result);
    return NextResponse.json(mappedResponse);
  } catch {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userCompanyId: string }> },
): Promise<NextResponse<null | unknown>> {
  const { userCompanyId } = await params;
  const body = await request.json();

  const { result, resultType } = await userCompanyService.updateUserCompanyById(
    userCompanyId,
    body,
  );

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }

  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }

  try {
    return NextResponse.json(null);
  } catch {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}
