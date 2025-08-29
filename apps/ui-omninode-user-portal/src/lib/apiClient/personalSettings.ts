import { FeUserProfile } from "@/types/feUser";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const fetchUserProfile = async (): Promise<FeUserProfile> => {
  return await apiClient.get("/user/profile");
};

export const updateUserProfile = async (userProfile: Partial<FeUserProfile>): Promise<FeUserProfile> => {
  return await apiClient.put("/user/profile", userProfile);
};
