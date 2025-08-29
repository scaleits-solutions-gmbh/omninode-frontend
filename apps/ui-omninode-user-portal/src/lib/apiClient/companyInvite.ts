import { feCompanyInvite } from "@/types/feCompanyInvite";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const getCompanyInvite = async (token: string): Promise<feCompanyInvite> => {
  return await apiClient.get<feCompanyInvite>(`/company-invite?token=${token}`);
};

export const acceptCompanyInvite = async (companyInviteId: string): Promise<void> => {
    return await apiClient.post<void>(`/company-invite/${companyInviteId}/accept`);
}