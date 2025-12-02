"use client";

import { useMemo } from "react";
import { useCurrentUserOrganizations } from "./use-current-user-organizations";
import { 
  UserOrganizationReadModel, 
  OrganizationRole 
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UseCurrentUserManageableOrganizationsResult = {
  /** Organizations where the user is Owner or Admin */
  organizations: UserOrganizationReadModel[] | undefined;
  /** Whether the data is loading */
  isLoading: boolean;
  /** Whether the query is currently fetching */
  isFetching: boolean;
  /** Error if the query failed */
  error: unknown;
  /** Function to manually refetch organizations */
  refetch: () => void;
};

/**
 * Hook that returns organizations where the current user has management permissions (Owner or Admin).
 * Useful for showing admin-only UI elements or restricting access to management features.
 */
export function useCurrentUserManageableOrganizations(): UseCurrentUserManageableOrganizationsResult {
  const { organizations, isLoading, isFetching, error, refetch } = useCurrentUserOrganizations();

  const manageableOrganizations = useMemo(() => {
    if (!organizations) return undefined;
    
    return organizations.filter(
      (org) => org.role === OrganizationRole.Owner || org.role === OrganizationRole.Admin
    );
  }, [organizations]);

  return {
    organizations: manageableOrganizations,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}

