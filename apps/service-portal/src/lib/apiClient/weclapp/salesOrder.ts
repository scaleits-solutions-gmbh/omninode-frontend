import { FeWeclappDocument } from "@/types/weclapp/document";
import { FeSalesOrder } from "@/types/weclapp/salesOrder";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const fetchWeclappSalesOrders = async (
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeSalesOrder>> => {
  return apiClient.get<PaginatedResponse<FeSalesOrder>>(
    `/weclapp/sales-orders`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};

export const fetchWeclappSalesOrderDocuments = async (
  salesOrderId: string,
  searchText: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeWeclappDocument>> => {
  return apiClient.get<PaginatedResponse<FeWeclappDocument>>(
    `/weclapp/sales-orders/${salesOrderId}/documents`,
    {
      searchText,
      page,
      pageSize,
    }
  );
};
