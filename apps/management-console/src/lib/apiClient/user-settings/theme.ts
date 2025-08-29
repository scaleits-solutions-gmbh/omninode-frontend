import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const baseApiClient = new BaseApiClient();

export const updateTheme = async (theme: string) => {
  const response = await baseApiClient.put("/personal-settings/theme", { theme: theme });
  return response;
};

