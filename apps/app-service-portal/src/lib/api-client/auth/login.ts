import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";

type FeUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
}

const apiClient = new BaseApiClient({
  baseUrl: "service-portal/api",
  timeout: 10000,
});

type LoginResponse = {
    user: FeUser;
}
export async function login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
    });
    return response;
}

export async function logout(): Promise<void> {
    await apiClient.post("/auth/logout");
}



