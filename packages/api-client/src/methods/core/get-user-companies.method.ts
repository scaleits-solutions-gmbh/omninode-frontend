import { GetUserCompaniesResponseDto } from "@/types/user-companies";

export const getUserCompanies = async (baseUrl: string, accessToken: string): Promise<GetUserCompaniesResponseDto> => {
    const response = await fetch(`${baseUrl}/bff/user/companies`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    return await response.json() as GetUserCompaniesResponseDto;
}