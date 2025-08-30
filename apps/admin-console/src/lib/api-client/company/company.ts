import {
  CompanyStatus,
  CompanyType,
  ManagementConsoleAccess,
  PaginatedResponse,
} from "@scaleits-solutions-gmbh/services";
import { FeCompany } from "@/types/fe/fe-company";
import { QueryClient } from "@tanstack/react-query";
import {
  BaseApiClient,
  ValidationError,
} from "@scaleits-solutions-gmbh/api-client";
import { queryKeys } from "../query-keys";
import { FeUser } from "@/types/fe/fe-user";
import { FeCompanyUserInvite } from "@/types/fe/fe-company-user-invite";

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
export async function fetchCompanies(
  params: FetchCompaniesParams,
): Promise<PaginatedResponse<FeCompany>> {
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
  console.log(
    "-------------------------------------------------------------------------------",
  );
  return apiClient.get<PaginatedResponse<FeCompany>>("/companies", queryParams);
}

/**
 * Fetches a single company by ID
 */
export async function getCompanyById(id: string): Promise<FeCompany> {
  // Validate input
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new ValidationError(
      "Company ID is required and must be a valid string",
    );
  }

  const trimmedId = id.trim();
  return apiClient.get<FeCompany>(
    `/companies/${encodeURIComponent(trimmedId)}`,
  );
}

/**
 * Creates a new company
 */
export async function createCompany(
  company: Omit<FeCompany, "id" | "createdAt" | "updatedAt">,
): Promise<FeCompany> {
  // Validate input
  if (!company) {
    throw new ValidationError("Company data is required");
  }
  if (!company.name?.trim()) {
    throw new ValidationError("Company name is required");
  }

  return apiClient.post<FeCompany>("/companies", company);
}

/**
 * Updates an existing company
 */
export async function updateCompany(
  company: Partial<FeCompany>,
): Promise<FeCompany> {
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

  return apiClient.put<FeCompany>(
    `/companies/${encodeURIComponent(company.id)}`,
    company,
  );
}

/**
 * Deletes a company by ID
 */
export async function deleteCompany(id: string): Promise<void> {
  // Validate input
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new ValidationError(
      "Company ID is required and must be a valid string",
    );
  }

  const trimmedId = id.trim();
  return apiClient.delete<void>(`/companies/${encodeURIComponent(trimmedId)}`);
}

export interface FetchCompanyUsersParams {
  page: number;
  pageSize: number;
  search?: string;
}

export async function fetchCompanyUsers(
  companyId: string,
  { page, pageSize, search }: FetchCompanyUsersParams,
): Promise<PaginatedResponse<FeUser>> {
  return apiClient.get<PaginatedResponse<FeUser>>(
    `/companies/${companyId}/users`,
    {
      page,
      pageSize,
      search: search?.trim(),
    },
  );
}

export interface FetchCompanyInvitesParams {
  page: number;
  pageSize: number;
  search?: string;
}

export async function fetchCompanyInvites(
  companyId: string,
  { page, pageSize, search }: FetchCompanyInvitesParams,
): Promise<PaginatedResponse<FeCompanyUserInvite>> {
  return apiClient.get<PaginatedResponse<FeCompanyUserInvite>>(
    `/companies/${companyId}/invites`,
    {
      page,
      pageSize,
      search: search?.trim(),
    },
  );
}

export interface SendUserInviteParams {
  email: string;
  managementConsoleAccess: ManagementConsoleAccess;
}

export async function sendCompanyUserInvite(
  companyId: string,
  { email, managementConsoleAccess }: SendUserInviteParams,
): Promise<void> {
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
    exact: false, // This ensures it matches all queries starting with ["companies"]
  });
}
