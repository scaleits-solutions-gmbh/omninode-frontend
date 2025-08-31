import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const switchCompany = async (targetCompanyId: string): Promise<void> => {
  await apiClient.post("/auth/switch-company", {
    targetCompanyId,
  });
};
