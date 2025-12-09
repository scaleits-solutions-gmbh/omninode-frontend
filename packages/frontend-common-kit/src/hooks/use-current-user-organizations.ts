"use client";

import { useAuthedQuery } from "./use-authed-query";
import { useValidSession } from "./use-valid-session";
import { useMounted } from "./use-mounted";
import { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { getOrganizationClient } from "@/utils/api-clients";

export type UseCurrentUserOrganizationsResult = {
  /** List of organizations the current user belongs to */
  organizations: UserOrganizationReadModel[] | undefined;
  /** Whether the data is loading */
  isLoading: boolean;
  /** Whether the query is currently fetching (includes refetches) */
  isFetching: boolean;
  /** Error if the query failed */
  error: unknown;
  /** Function to manually refetch organizations */
  refetch: () => void;
};

/**
 * Base hook that fetches all organizations the current user has access to.
 * This hook serves as the foundation for other organization-related hooks.
 */
export function useCurrentUserOrganizations(): UseCurrentUserOrganizationsResult {
  const mounted = useMounted();
  const { isValid: isSessionValid, status: sessionStatus } = useValidSession();

  const query = useAuthedQuery<UserOrganizationReadModel[]>({
    queryKey: ["current-user-organizations"],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findCurrentUserOrganizations({
        queryParams: {},
      });
      return response.data ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  return {
    organizations: query.data,
    isLoading:
      !mounted ||
      sessionStatus !== "authenticated" ||
      query.isLoading ||
      (isSessionValid && typeof query.data === "undefined"),
    isFetching: query.isFetching,
    error: query.error,
    refetch: () => {
      void query.refetch();
    },
  };
}

