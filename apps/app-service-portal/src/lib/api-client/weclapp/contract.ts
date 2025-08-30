import { FeContract } from "@/types/weclapp/contract";
import { FeWeclappDocument } from "@/types/weclapp/document";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const apiClient = new BaseApiClient({
  baseUrl: "/service-portal/api",
  timeout: 10000,
});

export const fetchWeclappContracts = async (
  search: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeContract>> => {
  return apiClient.get<PaginatedResponse<FeContract>>(`/weclapp/contracts`, {
    search,
    page,
    pageSize,
  });
};

export const fetchWeclappContractDocuments = async (
  contractId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  return apiClient.get<PaginatedResponse<FeWeclappDocument>>(
    `/weclapp/contracts/${contractId}/documents`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};
