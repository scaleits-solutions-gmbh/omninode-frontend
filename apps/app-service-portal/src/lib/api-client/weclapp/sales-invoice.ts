import { FeWeclappDocument } from "@/types/weclapp/document";
import { FeSalesInvoice } from "@/types/weclapp/sales-invoice";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient({
  baseUrl: "/service-portal/api",
  timeout: 10000,
});

export const fetchWeclappSalesInvoices = async (
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeSalesInvoice>> => {
  return apiClient.get<PaginatedResponse<FeSalesInvoice>>(
    `/weclapp/sales-invoices`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};

export const fetchWeclappSalesInvoiceDocuments = async (
  salesInvoiceId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  return apiClient.get<PaginatedResponse<FeWeclappDocument>>(
    `/weclapp/sales-invoices/${salesInvoiceId}/documents`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};
