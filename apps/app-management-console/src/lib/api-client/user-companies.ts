import { FeUser } from "@/types/fe/fe-user";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import {
  ManagementConsoleAccess,
  PaginatedResponse,
  UserCompanyStatus,
} from "@scaleits-solutions-gmbh/services";

const apiClient = new BaseApiClient();

export interface fetchUsersParams {
  page: number;
  pageSize: number;
  search?: string;
}

export function fetchUsers({
  page,
  pageSize,
  search,
}: fetchUsersParams): Promise<PaginatedResponse<FeUser>> {
  return apiClient.get("/userCompanies", {
    page,
    pageSize,
    search,
  });
}

export function fetchUser(id: string): Promise<FeUser> {
  return apiClient.get(`/userCompanies/${id}`);
}

export function updateUserCompany(
  id: string,
  status: UserCompanyStatus,
  managementConsoleAccess: ManagementConsoleAccess,
): Promise<void> {
  return apiClient.put(`/userCompanies/${id}`, {
    status,
    managementConsoleAccess,
  });
}
