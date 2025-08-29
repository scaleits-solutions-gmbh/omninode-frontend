import { NextResponse } from "next/server";
import {
  CompanyService,
  PaginatedResponse,
  sanitizeArrayWithZod,
  ResultType
} from "@scaleits-solutions-gmbh/services";
import "@/schemas/companySchema";
import { Company } from "@/types/company";
import { handleServiceError, handleJsonParsingError, handleUnexpectedError } from "@/lib/utils/misc/api-error-handler";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page: number = parseInt(searchParams.get("page") || "1");
    const pageSize: number = parseInt(searchParams.get("pageSize") || "10");
    const search: string = searchParams.get("search") || "";
    const status: string = searchParams.get("status") || "";
    //const type: string = searchParams.get("type") || "";

    const companyService = new CompanyService();

    const { result, resultType } = await companyService.fetchCompanies({
      page,
      pageSize,
      search,
      status,
    });

    if (resultType !== ResultType.SUCCESS || !result) {
      return handleServiceError(resultType, "Failed to fetch companies");
    }

    const sanitizedResponse: PaginatedResponse<Company> = {
      items: sanitizeArrayWithZod<Company>(result.items, "Company"),
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    };

    return NextResponse.json(sanitizedResponse);
  } catch (error) {
    return handleUnexpectedError(error, "fetching companies");
  }
}

export async function POST(request: Request) {
  try {
    const companyService = new CompanyService();
    const body = await request.json();
    console.log("body", body);

    const { result, resultType } = await companyService.createCompany(body);

    if (resultType !== ResultType.SUCCESS || !result) {
      return handleServiceError(resultType, "Failed to create company");
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // Check if it's a JSON parsing error first
    if (error instanceof SyntaxError) {
      return handleJsonParsingError(error);
    }
    
    return handleUnexpectedError(error, "creating company");
  }
}

