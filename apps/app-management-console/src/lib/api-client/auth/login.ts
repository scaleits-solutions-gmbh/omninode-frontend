import { FeUser } from "@/types/fe/fe-user";
import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

const apiClient = new BaseApiClient();

type LoginResponse = {
  user: FeUser;
};
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response;
}

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}
