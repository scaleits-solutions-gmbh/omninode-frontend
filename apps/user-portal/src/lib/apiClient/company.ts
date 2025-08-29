import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/feCompany";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const baseApiClient = new BaseApiClient();

export const fetchCompanies = async (): Promise<PaginatedResponse<FeCompany>> => {
    return await baseApiClient.get<PaginatedResponse<FeCompany>>("/companies");
}