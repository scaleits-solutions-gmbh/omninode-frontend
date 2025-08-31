import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import {
  CompanyUserInviteService,
  ResultType,
  UserCompanyService,
  UserService,
  UserStatus,
} from "@scaleits-solutions-gmbh/services";
import { NextRequest, NextResponse } from "next/server";

type UserInviteAcceptBody = {
  password: string;
  firstName: string;
  middleNames: string;
  lastName: string;
  position: string;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<null | unknown>> {
  const body: UserInviteAcceptBody = await request.json();
  const { id } = await params;
  const companyUserInviteService = new CompanyUserInviteService();
  const { result, resultType } =
    await companyUserInviteService.getCompanyUserInviteById(id);
  if (resultType !== ResultType.SUCCESS) {
    return handleServiceError(resultType);
  }
  if (!result) {
    return handleServiceError(ResultType.UNHANDLED_ERROR);
  }
  if (!result.userId) {
    const userService = new UserService();
    const { result: userResult, resultType: userResultType } =
      await userService.createUser({
        email: result.email,
        passwordHash: body.password,
        firstName: body.firstName,
        middleNames: body.middleNames,
        lastName: body.lastName,
        position: body.position,
        status: UserStatus.Active,
        imageUrl: "",
        salt: "",
        theme: "light",
        language: "en",
        lastSeenAt: new Date().toISOString(),
      });
    if (userResultType !== ResultType.SUCCESS) {
      return handleServiceError(userResultType);
    }
    if (!userResult) {
      return handleServiceError(ResultType.UNHANDLED_ERROR);
    }
    result.userId = userResult.id;
  }
  const userCompanyService = new UserCompanyService();
  const { resultType: userCompanyResultType } =
    await userCompanyService.createUserCompany({
      companyId: result.companyId,
      userId: result.userId,
      managementConsoleAccess: result.managementConsoleAccess,
    });
  if (userCompanyResultType !== ResultType.SUCCESS) {
    return handleServiceError(userCompanyResultType);
  }
  return NextResponse.json(null);
}
