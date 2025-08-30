import { FeUserInvite } from "@/types/fe/fe-user-invite";
import {
  BaseApiClient,
  PaginatedResponse,
} from "@scaleits-solutions-gmbh/api-client";
import { ManagementConsoleAccess } from "@scaleits-solutions-gmbh/services";

const apiClient = new BaseApiClient();

interface FetchCompanyInvitesParams {
  page: number;
  pageSize: number;
  search?: string;
}

export const fetchCompanyInvites = async ({
  page,
  pageSize,
  search,
}: FetchCompanyInvitesParams): Promise<PaginatedResponse<FeUserInvite>> => {
  const queryParams: {
    page: number;
    pageSize: number;
    search?: string;
  } = {
    page,
    pageSize,
  };
  if (search && search.trim() !== "") {
    queryParams.search = search.trim();
  }
  return apiClient.get<PaginatedResponse<FeUserInvite>>(
    "/company-user-invites",
    queryParams,
  );
};

interface SendUserInviteParams {
  email: string;
  managementConsoleAccess: ManagementConsoleAccess;
}

export const sendUserInvite = async ({
  email,
  managementConsoleAccess,
}: SendUserInviteParams): Promise<void> => {
  await apiClient.post<void>(`/company-user-invites`, {
    email,
    managementConsoleAccess,
  });
};
