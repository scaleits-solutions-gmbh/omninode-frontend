import { BaseApiClient } from "@scaleits-solutions-gmbh/api-client";
import { FeUser } from "@/types/feUser";

const apiClient = new BaseApiClient()

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

export async function logout() {
    const response = await apiClient.post("/auth/logout");
    return response;
}



