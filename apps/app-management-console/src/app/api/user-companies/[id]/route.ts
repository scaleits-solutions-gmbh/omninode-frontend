import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { UserOrganizationInputSchema } from "@/schemas/user-schema";
import { FeUser } from "@/types/fe/fe-user";
import {
  ResultType,
  UserOrganizationService,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

const userOrganizationService = new UserOrganizationService();

export async function GET(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
): Promise<NextResponse<FeUser | unknown>> {
  const { id } = await params;

  const { result, resultType } =
    await userOrganizationService.fetchUserOrganizationById(id);

  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }
  try {
    const mappedResponse: FeUser = UserOrganizationInputSchema.parse(result);
    return NextResponse.json(mappedResponse);
  } catch {
    return handleServiceError(ResultType.RESPONSE_PARSE_ERROR);
  }
}

export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
): Promise<NextResponse<null | unknown>> {
  const { userOrganizationId } = await params;
  const body = await request.json();

  const { result, resultType } = await userOrganizationService.updateUserOrganizationById(
    userOrganizationId,
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
