import { FeUserProfile } from "@/types/fe/fe-user";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export function fetchUserProfile(): Promise<FeUserProfile> {
  return apiClient.get<FeUserProfile>("/profile");
}
