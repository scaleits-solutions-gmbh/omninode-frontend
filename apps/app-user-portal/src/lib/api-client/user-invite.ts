import { FeCompanyUserInvite } from "@/types/fe-company-user-invite";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const getUserInvite = async (
  token: string,
): Promise<FeCompanyUserInvite> => {
  return await apiClient.get<FeCompanyUserInvite>(
    `/user-invite?token=${token}`,
  );
};

export const activateUserInvite = async (
  companyUserInviteId: string,
  {
    firstName,
    middleNames,
    lastName,
    position,
    password,
  }: {
    firstName: string;
    middleNames?: string;
    lastName: string;
    position: string;
    password: string;
  },
): Promise<void> => {
  return await apiClient.post<void>(
    `/user-invite/${companyUserInviteId}/accept`,
    {
      firstName,
      middleNames,
      lastName,
      position,
      password,
    },
  );
};
