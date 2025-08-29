import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { PaginatedResponse, Service } from "@scaleits-solutions-gmbh/services";
import { FeCompanyServiceInstance } from "@/types/fe/feCompanyServiceInstance";

const apiClient = new BaseApiClient();

export interface FetchCompanyServiceInstancesParams {
    page: number;
    pageSize: number;
    companyId: string;
    search?: string;
    service?: Service;
}

export function fetchCompanyServiceInstances({companyId, page, pageSize, search, service}: FetchCompanyServiceInstancesParams): Promise<PaginatedResponse<FeCompanyServiceInstance>> {
    const queryParams: Record<string, string> = {};
    if(page) {
        queryParams.page = page.toString();
    }
    if(pageSize) {
        queryParams.pageSize = pageSize.toString();
    }
    if(companyId) {
        queryParams.companyId = companyId;
    }
    if(search) {
        queryParams.search = search;
    }
    if(service) {
        queryParams.service = service;
    }
    return apiClient.get<PaginatedResponse<FeCompanyServiceInstance>>(`/companies/${companyId}/service-instances`, queryParams);
}