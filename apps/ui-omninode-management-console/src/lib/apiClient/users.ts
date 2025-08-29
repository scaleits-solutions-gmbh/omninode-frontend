import { FeUser } from "@/types/feUser";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { PaginatedResponse } from "@scaleits-solutions-gmbh/services";

const apiClient = new BaseApiClient()

export interface fetchUsersParams {
  page: number;
  pageSize: number;
  search?: string;
}

export function fetchUsers({page, pageSize, search}: fetchUsersParams): Promise<PaginatedResponse<FeUser>> {
  return apiClient.get("/users", {
    page,
    pageSize,
    search
  });
}

export function fetchUser(id: string): Promise<FeUser> {
  return apiClient.get(`/users/${id}`);
}
