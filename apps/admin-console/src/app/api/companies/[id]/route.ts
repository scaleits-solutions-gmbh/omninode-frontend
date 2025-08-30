import { NextRequest, NextResponse } from "next/server";
import { CompanyService, ResultType } from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/fe/fe-company";
import "@/schemas/company-schema";
import {
  handleServiceError,
  handleJsonParsingError,
  handleUnexpectedError,
} from "@/lib/utils/misc/api-error-handler";

export async function GET(
  request: NextRequest,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 },
      );
    }

    const companyService = new CompanyService();
    const { result, resultType } = await companyService.fetchCompanyById(id);

    if (resultType !== ResultType.SUCCESS || !result) {
      return handleServiceError(resultType, "Failed to fetch company");
    }

    const sanitizedResponse: FeCompany = result; // TODO: add transformer once FE fields are different from BE fields
    return NextResponse.json(sanitizedResponse);
  } catch (error) {
    return handleUnexpectedError(error, "fetching company");
  }
}

export async function PUT(
  request: Request,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any,
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Company ID is required" },
        { status: 400 },
      );
    }

    const companyService = new CompanyService();
    const body = await request.json();

    // Ensure the ID in the URL matches the ID in the body (if provided)
    if (body.id && body.id !== id) {
      return NextResponse.json(
        { error: "Company ID in URL does not match ID in request body" },
        { status: 400 },
      );
    }

    // Set the ID from the URL to ensure consistency
    body.id = id;

    const { result, resultType } =
      await companyService.updateCompanyByIdCurrent(id, body);

    if (resultType !== ResultType.SUCCESS || !result) {
      return handleServiceError(resultType, "Failed to update company");
    }

    return NextResponse.json(result);
  } catch (error) {
    // Check if it's a JSON parsing error first
    if (error instanceof SyntaxError) {
      return handleJsonParsingError(error);
    }

    return handleUnexpectedError(error, "updating company");
  }
}
