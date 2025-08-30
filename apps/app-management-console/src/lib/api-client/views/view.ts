import { View } from "@/types/fe/fe-view";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const getViews = async (): Promise<View[]> => {
  const response = await apiClient.get<View[]>("/views");
  return response;
};
