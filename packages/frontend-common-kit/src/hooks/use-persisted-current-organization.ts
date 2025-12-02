"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useCurrentUserOrganizations } from "./use-current-user-organizations";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

const PERSISTED_ORG_ID_KEY = "currentOrganizationId";
const PERSISTED_ORG_CHANGE_EVENT = "currentOrganizationIdChange";

function getPersistedOrganizationIdSafe(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(PERSISTED_ORG_ID_KEY);
  } catch {
    return null;
  }
}

function setPersistedOrganizationIdSafe(organizationId: string | null): void {
  if (typeof window === "undefined") return;
  try {
    if (!organizationId) {
      localStorage.removeItem(PERSISTED_ORG_ID_KEY);
    } else {
      localStorage.setItem(PERSISTED_ORG_ID_KEY, organizationId);
    }
  } catch {
    // ignore storage errors
  }
}

export type UsePersistedCurrentOrganizationResult = {
  /** 
   * The organization ID stored in localStorage.
   * Available immediately (synchronously) - no loading required.
   */
  organizationId: string | null;
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
  /** Function to change the persisted organization */
  setOrganizationId: (organizationId: string | null) => void;
  /** Function to manually refetch organizations */
  refetch: () => void;
};

/**
 * Hook for managing the current organization selection persisted in localStorage.
 * 
 * Use this in apps like User Portal where the organization is remembered across sessions
 * and is not tied to the URL.
 * 
 * Key behaviors:
 * - `organizationId` is available immediately from localStorage (no loading)
 * - `organization` data is available after API call completes
 * - Syncs across browser tabs via storage events
 * - Auto-selects first org if persisted selection is invalid
 */
export function usePersistedCurrentOrganization(): UsePersistedCurrentOrganizationResult {
  const { organizations, isLoading, isFetching, error, refetch } = useCurrentUserOrganizations();

  // State for the organization ID - initialized from localStorage
  const [organizationIdState, setOrganizationIdState] = useState<string | null>(
    getPersistedOrganizationIdSafe()
  );

  // Listen for storage changes from other tabs and custom events from same tab
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onStorage = (e: StorageEvent) => {
      if (e.key === PERSISTED_ORG_ID_KEY) {
        setOrganizationIdState(e.newValue);
      }
    };

    const onCustomChange = () => {
      setOrganizationIdState(getPersistedOrganizationIdSafe());
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener(PERSISTED_ORG_CHANGE_EVENT, onCustomChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(PERSISTED_ORG_CHANGE_EVENT, onCustomChange);
    };
  }, []);

  // Validate persisted ID against available organizations
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!organizations) return; // Don't clear before data loads

    if (!organizations.length) {
      setPersistedOrganizationIdSafe(null);
      setOrganizationIdState(null);
      return;
    }

    const currentId = getPersistedOrganizationIdSafe();
    const exists = organizations.some((org) => org.organizationId === currentId);

    if (!exists) {
      // Persisted ID not valid, select first organization
      const firstOrgId = organizations[0]?.organizationId ?? null;
      setPersistedOrganizationIdSafe(firstOrgId);
      setOrganizationIdState(firstOrgId);
    } else {
      // Ensure state reflects persisted selection
      setOrganizationIdState(currentId);
    }
  }, [organizations]);

  // Setter function that updates both localStorage and state
  const setOrganizationId = useCallback((newId: string | null) => {
    setPersistedOrganizationIdSafe(newId);
    setOrganizationIdState(newId);
    
    // Dispatch custom event for same-tab listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(PERSISTED_ORG_CHANGE_EVENT));
    }
  }, []);

  // Find the full organization data for the current ID
  const organization = useMemo(() => {
    if (!organizations?.length) return undefined;
    if (!organizationIdState) return organizations[0];
    
    return organizations.find((org) => org.organizationId === organizationIdState) ?? organizations[0];
  }, [organizations, organizationIdState]);

  return {
    organizationId: organizationIdState,
    organization,
    organizations,
    isLoading,
    isFetching,
    error,
    setOrganizationId,
    refetch,
  };
}

/**
 * Utility to set the persisted organization ID from outside React.
 * Useful for server-side navigation or initialization.
 */
export function setPersistedOrganizationId(organizationId: string | null): void {
  setPersistedOrganizationIdSafe(organizationId);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PERSISTED_ORG_CHANGE_EVENT));
  }
}

/**
 * Utility to get the persisted organization ID from outside React.
 */
export function getPersistedOrganizationId(): string | null {
  return getPersistedOrganizationIdSafe();
}

