import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

export const login = async (email: string, password: string): Promise<void> => {
  await apiClient.post("/auth/login", {
    email,
    password,
  });
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};
