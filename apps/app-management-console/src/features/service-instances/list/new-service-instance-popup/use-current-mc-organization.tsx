import { useMemo } from "react";
import { useParams } from "next/navigation";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import type { UserOrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

type UseCurrentMCOrganizationResult = {
  organizationId: string | undefined;
  organization: UserOrganizationReadModel | undefined;
  isLoading: boolean;
  error: unknown;
};

export function useCurrentMCOrganization(): UseCurrentMCOrganizationResult {
  const { organizationId } = useParams<{ organizationId: string }>();

  const query = useAuthedQuery<UserOrganizationReadModel[]>({
    queryKey: ["current-user-companies"],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findCurrentUserOrganizations({
        queryParams: {},
      });
      return response.data ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  const organization = useMemo(() => {
    if (!query.data || !organizationId) {
      return undefined;
    }

    return query.data.find(
      (org) => org.organizationId === organizationId
    );
  }, [query.data, organizationId]);

  return {
    organizationId,
    organization,
    isLoading: query.isLoading,
    error: query.error,
  };
}