/**
 * Standardized query keys for React Query
 * This provides type-safe and consistent query key management
 *
 * Note: These are application-specific query keys that extend the base patterns
 * from @scaleits-solutions-gmbh/api-client
 */

import { FetchCompaniesParams } from "./company/company";
import { FetchCompanyServiceInstancesParams } from "./company/company-service-instance";

// Base query key factory following the package conventions
export const queryKeys = {
  // Companies query keys
  companies: {
    // Base key for all company-related queries
    all: ["companies"] as const,

    // List queries with optional filters
    lists: () => [...queryKeys.companies.all, "list"] as const,
    list: (params?: FetchCompaniesParams) =>
      params
        ? ([...queryKeys.companies.lists(), params] as const)
        : ([...queryKeys.companies.lists()] as const),

    // Detail queries for individual companies
    details: () => [...queryKeys.companies.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.companies.details(), id] as const,
  },

  // Company Service Instances query keys
  companyServiceInstances: {
    // Base key for all company service instance-related queries
    all: ["companyServiceInstances"] as const,

    // List queries with optional filters
    lists: () => [...queryKeys.companyServiceInstances.all, "list"] as const,
    list: (params?: FetchCompanyServiceInstancesParams) =>
      params
        ? ([...queryKeys.companyServiceInstances.lists(), params] as const)
        : ([...queryKeys.companyServiceInstances.lists()] as const),

    // Detail queries for individual company service instances
    details: () =>
      [...queryKeys.companyServiceInstances.all, "detail"] as const,
    detail: (id: string) =>
      [...queryKeys.companyServiceInstances.details(), id] as const,
  },

  // Future entity query keys can be added here following the same pattern
  // users: {
  //   all: ['users'] as const,
  //   lists: () => [...queryKeys.users.all, 'list'] as const,
  //   detail: (id: string) => [...queryKeys.users.all, 'detail', id] as const,
  // },
} as const;

// Type-safe query key helpers
export type QueryKey = typeof queryKeys;

// Helper function to invalidate related queries
export interface QueryInvalidationHelpers {
  companies: {
    all: () => readonly string[];
    lists: () => readonly string[];
    detail: (id: string) => readonly string[];
  };
  companyServiceInstances: {
    all: () => readonly string[];
    lists: () => readonly string[];
    detail: (id: string) => readonly string[];
  };
}

export const getInvalidationKeys = (): QueryInvalidationHelpers => ({
  companies: {
    all: () => queryKeys.companies.all,
    lists: () => queryKeys.companies.lists(),
    detail: (id: string) => queryKeys.companies.detail(id),
  },
  companyServiceInstances: {
    all: () => queryKeys.companyServiceInstances.all,
    lists: () => queryKeys.companyServiceInstances.lists(),
    detail: (id: string) => queryKeys.companyServiceInstances.detail(id),
  },
});

// Export individual query key functions for backward compatibility
export const getCompaniesQueryKey = (params?: FetchCompaniesParams) =>
  queryKeys.companies.list(params);

export const getCompanyByIdQueryKey = (id: string) =>
  queryKeys.companies.detail(id);

export const getCompanyServiceInstancesQueryKey = (
  params?: FetchCompanyServiceInstancesParams,
) => queryKeys.companyServiceInstances.list(params);
