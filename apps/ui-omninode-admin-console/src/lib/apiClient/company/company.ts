import { CompanyStatus, CompanyType, ManagementConsoleAccess, PaginatedResponse } from "@scaleits-solutions-gmbh/services";
import { Company } from "@/types/company";
import { QueryClient } from "@tanstack/react-query";
import { BaseApiClient, ValidationError } from '@scaleits-solutions-gmbh/api-client';
import { queryKeys } from '../queryKeys';
import { FeUser } from "@/types/fe/feUser";
import { FeUserInvite } from "@/types/fe/feUserInvite";

// Create a simple apiClient instance using the package
const apiClient = new BaseApiClient();

export interface FetchCompaniesParams {
    page: number;
    pageSize: number;
    search?: string;
    status?: CompanyStatus[];
    type?: CompanyType[];
}

/**
 * Fetches paginated list of companies with optional filters
 */
export async function fetchCompanies(params: FetchCompaniesParams): Promise<PaginatedResponse<Company>> {
    // Validate required parameters
    if (!params.page || params.page < 1) {
        throw new ValidationError("Page must be a positive number");
    }
    if (!params.pageSize || params.pageSize < 1) {
        throw new ValidationError("Page size must be a positive number");
    }

    const queryParams: Record<string, string | number | string[]> = {
        page: params.page,
        pageSize: params.pageSize,
    };

    // Add optional parameters only if they exist
    if (params.search?.trim()) {
        queryParams.search = params.search.trim();
    }
    if (params.status?.length) {
        queryParams.status = params.status;
    }
    if (params.type?.length) {
        queryParams.type = params.type;
    }
    console.log("-------------------------------------------------------------------------------");
    return apiClient.get<PaginatedResponse<Company>>('/companies', queryParams);
}

/**
 * Fetches a single company by ID
 */
export async function getCompanyById(id: string): Promise<Company> {
    // Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new ValidationError("Company ID is required and must be a valid string");
    }

    const trimmedId = id.trim();
    return apiClient.get<Company>(`/companies/${encodeURIComponent(trimmedId)}`);
}

/**
 * Creates a new company
 */
export async function createCompany(company: Omit<Company, "id" | "createdAt" | "updatedAt">): Promise<Company> {
    // Validate input
    if (!company) {
        throw new ValidationError("Company data is required");
    }
    if (!company.name?.trim()) {
        throw new ValidationError("Company name is required");
    }

    return apiClient.post<Company>('/companies', company);
}

/**
 * Updates an existing company
 */
export async function updateCompany(company: Company): Promise<Company> {
    // Validate input
    if (!company) {
        throw new ValidationError("Company data is required");
    }
    if (!company.id) {
        throw new ValidationError("Company ID is required for updates");
    }
    if (!company.name?.trim()) {
        throw new ValidationError("Company name is required");
    }

    return apiClient.put<Company>(`/companies/${encodeURIComponent(company.id)}`, company);
}

/**
 * Deletes a company by ID
 */
export async function deleteCompany(id: string): Promise<void> {
    // Validate input
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new ValidationError("Company ID is required and must be a valid string");
    }

    const trimmedId = id.trim();
    return apiClient.delete<void>(`/companies/${encodeURIComponent(trimmedId)}`);
}

export interface FetchCompanyUsersParams {
    page: number;
    pageSize: number;
    search?: string;
}

export async function fetchCompanyUsers(companyId: string, {page, pageSize, search}: FetchCompanyUsersParams): Promise<PaginatedResponse<FeUser>> {
    return apiClient.get<PaginatedResponse<FeUser>>(`/companies/${companyId}/users`, {
        page,
        pageSize,
        search: search?.trim(),
    });
}

export interface FetchCompanyInvitesParams {
    page: number;
    pageSize: number;
    search?: string;
}

export async function fetchCompanyInvites(companyId: string, {page, pageSize, search}: FetchCompanyInvitesParams): Promise<PaginatedResponse<FeUserInvite>> {
    return apiClient.get<PaginatedResponse<FeUserInvite>>(`/companies/${companyId}/invites`, {
        page,
        pageSize,
        search: search?.trim(),
    });
}

export interface SendUserInviteParams {
    email: string;
    managementConsoleAccess: ManagementConsoleAccess;
}

export async function sendCompanyUserInvite(companyId: string, {email, managementConsoleAccess}: SendUserInviteParams): Promise<void> {
    return apiClient.post<void>(`/companies/${companyId}/invites`, {
        email,
        managementConsoleAccess,
    });
}

/**
 * Invalidates all company-related queries
 */
export function invalidateCompaniesQueries(queryClient: QueryClient): void {
    // Invalidate all queries that start with "companies"
    queryClient.invalidateQueries({ 
        queryKey: queryKeys.companies.all,
        exact: false // This ensures it matches all queries starting with ["companies"]
    });
}

