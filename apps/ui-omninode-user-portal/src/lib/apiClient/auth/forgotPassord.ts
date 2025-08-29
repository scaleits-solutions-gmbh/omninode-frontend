import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient()

export const forgotPassword = async (email: string): Promise<void> => {
    return await apiClient.post<void>(`/auth/forgot-password`, { email });
}

