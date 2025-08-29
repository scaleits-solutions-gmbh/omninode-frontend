import { View } from "@/types/feView";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const getViews = async (): Promise<View[]> => {
  const response = await apiClient.get<View[]>("/views");
  return response;
};
