"use client";

import { usePersistedCurrentOrganization } from "./use-persisted-current-organization";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

/**
 * @deprecated Use `usePersistedCurrentOrganization` or `useRouteCurrentOrganization` instead.
 * This hook is kept for backwards compatibility and delegates to `usePersistedCurrentOrganization`.
 */
export type UseGetCurrentOrganizationResult = {
  companies: UserOrganizationReadModel[] | undefined;
  selectedOrganization: UserOrganizationReadModel | undefined;
  selectedOrganizationId: string | null;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
  refetch: () => void;
  setSelectedOrganizationId: (companyId: string | null) => void;
};

/**
 * @deprecated Use `usePersistedCurrentOrganization` or `useRouteCurrentOrganization` instead.
 * 
 * This legacy hook is now a thin wrapper around `usePersistedCurrentOrganization`.
 * Migration guide:
 * - For localStorage-based selection (User Portal): use `usePersistedCurrentOrganization`
 * - For URL-based selection (Management Console, Service Portal): use `useRouteCurrentOrganization`
 */
export function useGetCurrentOrganization(): UseGetCurrentOrganizationResult {
  const {
    organizationId,
    organization,
    organizations,
    isLoading,
    isFetching,
    error,
    setOrganizationId,
    refetch,
  } = usePersistedCurrentOrganization();

  return {
    companies: organizations,
    selectedOrganization: organization,
    selectedOrganizationId: organizationId,
    isLoading,
    isFetching,
    error,
    refetch,
    setSelectedOrganizationId: setOrganizationId,
  };
}
