"use client";

import { Users, Layers2, Smile, Group } from "lucide-react";
import KpiCard from "./kpi-card";
import { useOrganizationId } from "@/hooks/use-organization-id";
import { useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";

export default function KpiCards() {
  const organizationId = useOrganizationId();

  // Fetch organization members count (Users)
  const { data: usersData, isLoading: usersLoading } = useAuthedQuery({
    queryKey: ["organizationMembersCount", organizationId],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(
        session
      ).findOrganizationMembersCount({
        pathParams: { id: organizationId },
        queryParams: {},
      });
      return response.data;
    },
    enabled: !!organizationId,
  });

  // Fetch organization relationships count
  const { data: relationshipsData, isLoading: relationshipsLoading } =
    useAuthedQuery({
      queryKey: ["organizationRelationshipsCount", organizationId],
      queryFn: async ({ session }) => {
        const response = await getOrganizationClient(
          session
        ).findOrganizationRelationshipsCount({
          pathParams: { id: organizationId },
          queryParams: {},
        });
        return response.data;
      },
      enabled: !!organizationId,
    });

  // Fetch service instances count
  // Note: Using API route since service instance microservice is not yet available
  const { data: serviceInstancesData, isLoading: serviceInstancesLoading } =
    useAuthedQuery({
      queryKey: ["serviceInstancesCount", organizationId],
      queryFn: async () => {
        return { count: 0 };
      },
      enabled: !!organizationId,
    });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Service Instances"
        value={serviceInstancesData?.count ?? 0}
        icon={<Layers2 className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/service-instances`}
        valueLoading={serviceInstancesLoading}
      />
      <KpiCard
        label="Org Relationships"
        value={relationshipsData?.count ?? 0}
        icon={<Smile className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/organization-relationships`}
        valueLoading={relationshipsLoading}
      />
      <KpiCard
        label="Users"
        value={usersData?.count ?? 0}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        href={`/${organizationId}/users`}
        valueLoading={usersLoading}
      />
      <KpiCard
        label="Groups"
        value={"0"}
        icon={<Group className="h-4 w-4 text-muted-foreground" />}
        valueLoading={false}
      />
    </div>
  );
}
