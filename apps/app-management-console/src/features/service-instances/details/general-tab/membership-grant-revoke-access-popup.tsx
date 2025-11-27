"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { ComposedMembershipViewGrantReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
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
import { getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import type { Session } from "next-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

interface MembershipGrantRevokeAccessPopupProps {
  show: boolean;
  grant: ComposedMembershipViewGrantReadModel;
  onClose: () => void;
  onRevoked?: () => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export default function MembershipGrantRevokeAccessPopup({
  show,
  grant,
  onClose,
  onRevoked,
}: MembershipGrantRevokeAccessPopupProps) {
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
      await getServiceClient(session).revokeServiceViewFromOrganizationMembership({
        body: {
          viewId: grant.view.id,
          organizationMembershipId: grant.membershipId,
        },
      });
    },
    onSuccess: () => {
      toast.success("Access revoked successfully");
      onClose();
      onRevoked?.();
      queryClient.invalidateQueries({
        queryKey: [
          "serviceInstanceMembershipGrants",
          organizationServiceInstanceId,
        ],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to revoke access");
    },
  });

  const fullName =
    `${grant.user.firstName} ${grant.user.lastName}`.trim() || "Unknown User";

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revoke Access</DialogTitle>
          <DialogDescription>
            Revoke this user&apos;s access to the service view.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action will remove access for this user to the selected view.
            You can grant access again later if needed.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={fullName} />
              <AvatarFallback seed={grant.user.id}>
                {getInitials(fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{fullName}</p>
              <p className="text-sm text-muted-foreground">
                {grant.user.email}
              </p>
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


