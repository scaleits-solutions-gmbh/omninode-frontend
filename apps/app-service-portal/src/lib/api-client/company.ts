import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/fe-company";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const baseApiClient = new BaseApiClient({
    baseUrl: "/service-portal/api",
    timeout: 10000,
});

export const fetchCompanies = async (): Promise<PaginatedResponse<FeCompany>> => {
    const response = await baseApiClient.get<PaginatedResponse<FeCompany>>("/companies");
    return response;
}