"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { ComposedServiceViewReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Alert,
  AlertDescription,
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
import { baseOmninodeApiClient } from "@repo/omninode-api-client";

interface RemoveServiceViewPopupProps {
  show: boolean;
  view: ComposedServiceViewReadModel;
  onClose: () => void;
  onRemoved?: () => void;
}

export default function RemoveServiceViewPopup({
  show,
  view,
  onClose,
  onRemoved,
}: RemoveServiceViewPopupProps) {
  const removeViewMutation = useAuthedMutation({
    mutationFn: async (): Promise<void> => {
      // TODO: wire to real remove-service-view endpoint
      await baseOmninodeApiClient()
        .serviceMicroservice; // placeholder to keep pattern consistent
      throw new Error("Remove service view endpoint not yet implemented");
    },
    onSuccess: () => {
      toast.success("Service view removed successfully");
      onClose();
      onRemoved?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove service view");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Service View</DialogTitle>
          <DialogDescription>
            Remove this service view from the service instance.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action will remove the view{" "}
            <span className="font-semibold">{view.name}</span>You can recreate
            a similar view later if needed.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={removeViewMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeViewMutation.mutate()}
            disabled={removeViewMutation.isPending}
            isLoading={removeViewMutation.isPending}
          >
            {removeViewMutation.isPending ? "Removing..." : "Remove view"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


