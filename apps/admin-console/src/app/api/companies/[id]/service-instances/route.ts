import { NextRequest, NextResponse } from "next/server";
import { getMockData } from "./data";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeCompanyServiceInstance } from "@/types/fe/fe-company-service-instance";

export async function GET(
  request: NextRequest,
): Promise<
  NextResponse<PaginatedResponse<FeCompanyServiceInstance> | unknown>
> {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  return NextResponse.json(getMockData({ page, pageSize, search }));
}

/* Real Implementation 
import { NextRequest, NextResponse } from "next/server";
import { CompanyServiceInstanceService, ResultType,PaginatedResponse} from "@scaleits-solutions-gmbh/services";
import { FeCompanyServiceInstance } from "@/types/fe/fe-company-service-instance";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { FeCompanyServiceInstanceTransformerSchema } from "@/schemas/transformers/fe-company-service-instance-transformer";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<PaginatedResponse<FeCompanyServiceInstance>|unknown>> {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const CompanyServiceInstanceService = new CompanyServiceInstanceService();
    const {result,resultType} = await CompanyServiceInstanceService.fetchCompanyServiceInstances({
        companyId: id,
        search: search,
        page: page,
        pageSize: pageSize,
    });

    if (resultType != ResultType.SUCCESS) {
        return handleServiceError(resultType, "fetchCompanyServiceInstances");
    }
    try {
        return NextResponse.json(FeCompanyServiceInstanceTransformerSchema.parse(result));
    } catch (error) {
        return handleServiceError(ResultType.PARSE_ERROR, "fetchCompanyServiceInstances");
    }
}
*/
