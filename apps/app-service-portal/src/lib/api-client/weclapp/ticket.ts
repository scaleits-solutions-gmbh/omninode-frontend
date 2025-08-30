import { FeTicket } from "@/types/weclapp/ticket";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient({
  baseUrl: "/service-portal/api",
  timeout: 10000,
});

export const fetchWeclappTickets = async (
  search: string,
  page: number,
  pageSize: number
): Promise<PaginatedResponse<FeTicket>> => {
  return apiClient.get<PaginatedResponse<FeTicket>>(`/weclapp/tickets`, {
    search,
    page,
    pageSize,
  });
};
