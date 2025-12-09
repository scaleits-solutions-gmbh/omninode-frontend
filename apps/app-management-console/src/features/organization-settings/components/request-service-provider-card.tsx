"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Session } from "next-auth";
import { OrganizationType, OrganizationReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useQueryClient } from "@tanstack/react-query";

interface RequestServiceProviderCardProps {
  organization: OrganizationReadModel;
}

export default function RequestServiceProviderCard({ organization }: RequestServiceProviderCardProps) {
  const { organizationId } = useParams();
  const queryClient = useQueryClient();

  const changeTypeMutation = useAuthedMutation({
    mutationFn: async ({ session }: { session: Session }) => {
      const response = await getOrganizationClient(session).changeOrganizationType({
        pathParams: { id: organizationId as string },
        body: {
          type: OrganizationType.Provider,
        },
      });
      return response.data;
    },
    onMutate: () => toast.loading("Requesting Service Provider status...", { id: "change-org-type" }),
    onError: (e: Error) => toast.error(e.message || "Failed to request Service Provider status", { id: "change-org-type" }),
    onSuccess: () => {
      toast.success("Service Provider status requested successfully", { id: "change-org-type" });
      // Invalidate and refetch organization data to update UI
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
    },
  });

  const isProvider = organization?.type === OrganizationType.Provider;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request to become a Service Provider</CardTitle>
        <CardDescription>
          Request to change your organization type to Service Provider. This will allow you to offer services to other organizations.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => changeTypeMutation.mutate()}
          disabled={changeTypeMutation.isPending || isProvider}
          className="w-fit"
        >
          {changeTypeMutation.isPending ? "Requesting..." : "Request Service Provider Status"}
        </Button>
      </CardFooter>
    </Card>
  );
}

