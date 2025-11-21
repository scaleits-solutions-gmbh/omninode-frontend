"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { ComposedRelationshipViewGrantReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Alert,
  AlertDescription,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/pkg-frontend-common-kit/components";
import { AlertCircle } from "lucide-react";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import type { Session } from "next-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface OrganizationRelationshipGrantRevokeAccessPopupProps {
  show: boolean;
  grant: ComposedRelationshipViewGrantReadModel;
  onClose: () => void;
  onRevoked?: () => void;
}

export default function OrganizationRelationshipGrantRevokeAccessPopup({
  show,
  grant,
  onClose,
  onRevoked,
}: OrganizationRelationshipGrantRevokeAccessPopupProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const revokeAccessMutation = useAuthedMutation({
    mutationFn: async ({
      session,
    }: {
      session: Session;
    }): Promise<void> => {
      const apiClient = baseOmninodeApiClient();

      await apiClient.serviceMicroservice.revokeServiceViewFromOrganizationRelationship(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            body: {
              viewId: grant.view.id,
              organizationRelationshipId: grant.organizationRelationshipId,
            },
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Access revoked successfully");
      onClose();
      onRevoked?.();
      queryClient.invalidateQueries({
        queryKey: [
          "serviceInstanceOrganizationRelationshipGrants",
          organizationServiceInstanceId,
        ],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke access");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revoke Access</DialogTitle>
          <DialogDescription>
            Revoke this organization&apos;s access to the service view.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action will remove access for this organization to the selected
            view. You can grant access again later if needed.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage alt={grant.organization.name} />
              <AvatarFallback seed={grant.organization.id}>
                {grant.organization.name?.charAt(0) ?? "O"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{grant.organization.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                View: <span className="font-medium">{grant.view.name}</span>
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={revokeAccessMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => revokeAccessMutation.mutate()}
            disabled={revokeAccessMutation.isPending}
            isLoading={revokeAccessMutation.isPending}
          >
            {revokeAccessMutation.isPending ? "Revoking..." : "Revoke access"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


