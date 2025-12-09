"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useCurrentUserOrganizations } from "./use-current-user-organizations";
import { setPersistedOrganizationId } from "./use-persisted-current-organization";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

export type UseRouteCurrentOrganizationResult = {
  /** 
   * The organization ID from the URL path parameter.
   * Available immediately (synchronously) - no loading required.
   */
  organizationId: string | undefined;
  /** 
   * Full organization data. 
   * Available after organizations data loads.
   */
  organization: UserOrganizationReadModel | undefined;
  /** All organizations the user belongs to */
  organizations: UserOrganizationReadModel[] | undefined;
  /** Whether the organizations data is loading */
  isLoading: boolean;
  /** Whether the query is currently fetching */
  isFetching: boolean;
  /** Error if the query failed */
  error: unknown;
  /** Whether the URL organization ID is valid (exists in user's organizations) */
  isValidOrganization: boolean | undefined;
  /** Function to manually refetch organizations */
  refetch: () => void;
};

export type UseRouteCurrentOrganizationOptions = {
  /** 
   * Whether to automatically sync the URL organization ID to localStorage.
   * When enabled, this keeps the persisted selection in sync with the URL.
   * Useful for Management Console and Service Portal.
   * @default true
   */
  syncToPersisted?: boolean;
  /**
   * The name of the URL param to read organizationId from.
   * @default "organizationId"
   */
  paramName?: string;
};

/**
 * Hook for getting the current organization based on the URL path parameter.
 * 
 * Use this in apps like Management Console and Service Portal where the organization
 * is part of the URL (e.g., /org-123/dashboard).
 * 
 * Key behaviors:
 * - `organizationId` is available immediately from URL params (no loading)
 * - `organization` data is available after API call completes
 * - Automatically syncs to localStorage when URL org changes (configurable)
 * - Returns `isValidOrganization` to check if URL org is accessible
 */
export function useRouteCurrentOrganization(
  options: UseRouteCurrentOrganizationOptions = {}
): UseRouteCurrentOrganizationResult {
  const { syncToPersisted = true, paramName = "organizationId" } = options;
  
  const params = useParams<{ [key: string]: string }>();
  const organizationId = params?.[paramName];

  const { organizations, isLoading, isFetching, error, refetch } = useCurrentUserOrganizations();

  // Sync URL organization to localStorage when it changes
  useEffect(() => {
    if (!syncToPersisted) return;
    if (!organizationId) return;
    
    // Only sync after we confirm the org is valid
    if (organizations && organizations.some(org => org.organizationId === organizationId)) {
      setPersistedOrganizationId(organizationId);
    }
  }, [organizationId, organizations, syncToPersisted]);

  // Find the full organization data for the URL ID
  const organization = useMemo(() => {
    if (!organizations?.length) return undefined;
    if (!organizationId) return undefined;
    
    return organizations.find((org) => org.organizationId === organizationId);
  }, [organizations, organizationId]);

  // Check if the URL org ID is valid
  const isValidOrganization = useMemo(() => {
    if (!organizations) return undefined; // Still loading
    if (!organizationId) return false;
    
    return organizations.some((org) => org.organizationId === organizationId);
  }, [organizations, organizationId]);

  return {
    organizationId,
    organization,
    organizations,
    isLoading,
    isFetching,
    error,
    isValidOrganization,
    refetch,
  };
}

