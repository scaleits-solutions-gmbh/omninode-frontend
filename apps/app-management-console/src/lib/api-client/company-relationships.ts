import { FeCompanyRelationship } from "@/types/fe/fe-company-relationship";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const apiClient = new BaseApiClient();

type fetchCompanyRelationsParams = {
  page: number;
  pageSize: number;
  search: string;
};

export const fetchCompanyRelations = async ({
  page,
  pageSize,
  search,
}: fetchCompanyRelationsParams): Promise<
  PaginatedResponse<FeCompanyRelationship>
> => {
  const response = await apiClient.get<
    PaginatedResponse<FeCompanyRelationship>
  >("/company-relations", {
    page,
    pageSize,
    search,
  });
  return response;
};
