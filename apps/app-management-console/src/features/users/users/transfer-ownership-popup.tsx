"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
    baseOmninodeApiClient,
    getApiAuthentication,
} from "@repo/omninode-api-client";
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
    Input,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationMembershipReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface TransferOwnershipPopupProps {
  show: boolean;
  user: OrganizationMembershipReadModel;
  onClose: () => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export default function TransferOwnershipPopup({
  show,
  user,
  onClose,
}: TransferOwnershipPopupProps) {
  const placeholderEmail = "unknown.user@example.com";
  const { organizationId } = useParams();
  const queryClient = useQueryClient();
  const [confirmation, setConfirmation] = useState("");

  const transferOwnershipMutation = useAuthedMutation({
    mutationFn: async ({ session }: { session: Session; variables: void }) => {
      return await baseOmninodeApiClient().organizationMicroservice.transferOwnership(
        {
          request: {
            pathParams: {
              id: organizationId as string,
            },
            body: {
              newOwnerMembershipId: user.id,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    onSuccess: () => {
      toast.success("Ownership transferred successfully");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["organizationUsers", organizationId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to transfer ownership");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Ownership</DialogTitle>
          <DialogDescription>
            Transfer your organization ownership to another member. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You are about to transfer ownership of this organization to this
            member. You will lose your owner privileges and become an admin.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={"Unknown User"} />
              <AvatarFallback seed={user.userId}>
                {getInitials("Unknown User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Unknown User</p>
              <p className="text-sm text-muted-foreground">
                unknown.user@example.com
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Confirm transfer</p>
            <Input
              placeholder={`Enter '${placeholderEmail}'`}
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={transferOwnershipMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => transferOwnershipMutation.mutate(undefined)}
            disabled={
              transferOwnershipMutation.isPending ||
              confirmation !== placeholderEmail
            }
            isLoading={transferOwnershipMutation.isPending}
          >
            {transferOwnershipMutation.isPending
              ? "Transferring..."
              : "Transfer Ownership"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
