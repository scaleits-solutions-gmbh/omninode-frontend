import { FeWeclappDocument } from "@/types/weclapp/document";
import { FeQuotation } from "@/types/weclapp/quotation";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const fetchWeclappQuotations = async (
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeQuotation>> => {
  return apiClient.get<PaginatedResponse<FeQuotation>>(`/weclapp/quotations`, {
    searchText,
    page,
    pageSize,
  });
};

export const fetchWeclappQuotationDocuments = async (
  quotationId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  return apiClient.get<PaginatedResponse<FeWeclappDocument>>(
    `/weclapp/quotations/${quotationId}/documents`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};
