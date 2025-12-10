"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { ProjectionOrganizationUserListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
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
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

interface RemoveUserPopupProps {
  show: boolean;
  user: ProjectionOrganizationUserListItemReadModel;
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
export default function RemoveUserPopup({
  show,
  user,
  onClose,
}: RemoveUserPopupProps) {
    const placeholderEmail = user.user.email;
  const { organizationId } = useParams();
  const queryClient = useQueryClient();
  const [confirmation, setConfirmation] = useState("");

  const removeUserMutation = useAuthedMutation({
    mutationFn: async ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      variables: _variables,
    }: {
      variables: { membershipId: string };
    }): Promise<never> => {
      throw new Error(
        "Remove organization membership endpoint not yet implemented"
      );
    },
    onSuccess: () => {
      toast.success("User removed successfully");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["organizationUsers", organizationId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove user");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove User</DialogTitle>
          <DialogDescription>
            Remove this user from the organization. They will lose access to all
            organization resources.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You are about to remove this user from the organization. You will
            have to add them again.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={`${user.user.firstName} ${user.user.lastName}`} />
              <AvatarFallback seed={user.user.id}>
                {getInitials(`${user.user.firstName} ${user.user.lastName}`.trim() || "Unknown User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{`${user.user.firstName} ${user.user.lastName}`.trim() || "Unknown User"}</p>
              <p className="text-sm text-muted-foreground">
                {user.user.email}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Confirm removal</p>
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
          disabled={removeUserMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={() => removeUserMutation.mutate({ membershipId: user.id })}
          disabled={removeUserMutation.isPending || confirmation !== placeholderEmail}
          isLoading={removeUserMutation.isPending}
        >
          {removeUserMutation.isPending ? "Removing..." : "Remove User"}
        </Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
