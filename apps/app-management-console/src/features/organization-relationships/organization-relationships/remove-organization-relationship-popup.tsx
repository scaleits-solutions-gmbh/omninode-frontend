"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { OrganizationRelationshipReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Alert,
  AlertDescription,
  AvatarFallback,
  Avatar,
  AvatarImage,
  Input,
} from "@repo/pkg-frontend-common-kit/components";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import type { Session } from "next-auth";
import { AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

interface RemoveOrganizationRelationshipPopupProps {
  show: boolean;
  relationship: OrganizationRelationshipReadModel;
  currentOrganizationId: string;
  onClose: () => void;
}

export default function RemoveOrganizationRelationshipPopup({
  show,
  relationship,
  currentOrganizationId,
  onClose,
}: RemoveOrganizationRelationshipPopupProps) {
  const { organizationId } = useParams();
  const queryClient = useQueryClient();

  // Determine which organization is the "other" one (not the current org)
  const isCurrentLeft = relationship.leftOrganizationId === currentOrganizationId;
  const otherOrganizationName = isCurrentLeft
    ? relationship.rightOrganizationName
    : relationship.leftOrganizationName;
  const otherOrganizationId = isCurrentLeft
    ? relationship.rightOrganizationId
    : relationship.leftOrganizationId;

  const [confirmation, setConfirmation] = useState("");
  const loadingToastIdRef = useRef<string | number | undefined>(undefined);

  const removeRelationshipMutation = useAuthedMutation({
    onMutate: () => {
      loadingToastIdRef.current = toast.loading("Removing relationship...");
    },
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { relationshipId: string };
    }) => {
      const response = await getOrganizationClient(session).removeOrganizationRelationship({
        pathParams: {
          id: variables.relationshipId,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Relationship removed successfully", { id: loadingToastIdRef.current });
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["platformOrganizationRelationships", organizationId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove relationship", { id: loadingToastIdRef.current });
    },
    onSettled: () => {
      loadingToastIdRef.current = undefined;
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Relationship</DialogTitle>
          <DialogDescription>
            Remove this organization relationship. Both organizations will lose
            access to shared resources.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You are about to remove the relationship with this organization. You
            will have to send a new invitation to restore it.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-md">
              <AvatarImage src={""} />
              <AvatarFallback seed={otherOrganizationId}>
                {otherOrganizationName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{otherOrganizationName}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Confirm removal</p>
            <Input
              placeholder={`Enter '${otherOrganizationName}'`}
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
            disabled={removeRelationshipMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              removeRelationshipMutation.mutate({
                relationshipId: relationship.id,
              })
            }
            disabled={
              removeRelationshipMutation.isPending ||
              confirmation !== otherOrganizationName
            }
            isLoading={removeRelationshipMutation.isPending}
          >
            {removeRelationshipMutation.isPending
              ? "Removing..."
              : "Remove Relationship"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

