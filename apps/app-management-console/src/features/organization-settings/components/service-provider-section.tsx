"use client";

import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { useParams } from "next/navigation";
import { OrganizationType } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, Skeleton } from "@repo/pkg-frontend-common-kit/components";
import RequestServiceProviderCard from "./request-service-provider-card";

export default function ServiceProviderSection() {
  const { organizationId } = useParams();

  const { data: organization, isLoading } = useAuthedQuery({
    queryKey: ["organization", organizationId],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findOrganizationById({
        pathParams: { id: organizationId as string },
      });
      return response.data;
    },
    enabled: Boolean(organizationId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const isCustomer = organization?.type === OrganizationType.Customer;

  // Show loading skeleton while loading
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Service Provider</h3>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-5 w-72" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-full max-w-3xl" />
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-9 w-60" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Hide entire section (including title) if not a Customer
  if (!isCustomer) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Service Provider</h3>
      <RequestServiceProviderCard organization={organization} />
    </div>
  );
}

