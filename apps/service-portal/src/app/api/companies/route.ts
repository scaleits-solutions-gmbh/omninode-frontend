import { NextResponse } from "next/server";
import { getSessionTokenPayload } from "@/lib/utils/misc/sessionToken";
import { handleServiceError } from "@/lib/utils/misc/api-error-handler";
import { UserCompanyService, PaginatedResponse, ResultType } from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/feCompany";
import { FeCompanySchema } from "@/schema/feCoompany";

export async function GET(): Promise<NextResponse<PaginatedResponse<FeCompany>>|NextResponse<unknown>> {
    const sessionTokenPayload = await getSessionTokenPayload();

    const userCompanyService = new UserCompanyService();
    const {result,resultType} = await userCompanyService.fetchUserCompanies({
        userId: sessionTokenPayload.sub,
        page: 1,
        pageSize: 100,
    });

    if (resultType === ResultType.SUCCESS && result) {
        const sanitizedResponse:PaginatedResponse<FeCompany> = {
            items: result.items.map(item => {
                // Transform UserCompany to FeCompany
                const feCompany: FeCompany = {
                    id: item.companyId, // Use companyId as the id
                    name: item.companyName, // Use companyName as the name
                    type: "company type", // Set a default type since API doesn't provide it
                };
                return FeCompanySchema.parse(feCompany);
            }),
            total: result.total,
            page: result.page,
            pageSize: result.pageSize,
            totalPages: result.totalPages,
        }
        return NextResponse.json(sanitizedResponse);
    }

    return handleServiceError(resultType, "Companies");
}