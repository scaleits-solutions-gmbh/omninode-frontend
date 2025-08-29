import { FeUserProfile } from "@/types/feUser";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient()

export function fetchUserProfile(): Promise<FeUserProfile> {
    const user = apiClient.get<FeUserProfile>("/personal-settings/profile");
    console.log(user);
    return user;
}

export function updateUserProfile(data: Partial<FeUserProfile>): Promise<FeUserProfile> {
    const user = apiClient.put<FeUserProfile>("/personal-settings/profile", data);
    return user;
}
