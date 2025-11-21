"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
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
  Input,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import { AlertCircle } from "lucide-react";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import { baseOmninodeApiClient } from "@repo/omninode-api-client";
import { ComposedOrganizationServiceInstanceReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

interface RemoveServiceInstancePopupProps {
  show: boolean;
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
  onClose: () => void;
  onRemoved?: () => void;
}

export default function RemoveServiceInstancePopup({
  show,
  serviceInstance,
  onClose,
  onRemoved,
}: RemoveServiceInstancePopupProps) {
  const [confirmation, setConfirmation] = React.useState("");

  React.useEffect(() => {
    if (show) {
      setConfirmation("");
    }
  }, [show]);

  // TODO: replace fallback with real instance name when API is wired
  const expected = serviceInstance.serviceInstanceName?.trim() || "Service Instance";
  const canSubmit = confirmation.trim() === expected;

  const removeInstanceMutation = useAuthedMutation({
    mutationFn: async (): Promise<void> => {
      // TODO: wire to real remove-service-instance endpoint
      await baseOmninodeApiClient().serviceMicroservice;
      throw new Error("Remove service instance endpoint not yet implemented");
    },
    onSuccess: () => {
      toast.success("Service instance removed successfully");
      onClose();
      onRemoved?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove service instance");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove Service Instance</DialogTitle>
          <DialogDescription>
            Permanently remove this service instance.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This action cannot be undone. Type{" "}
            <span className="font-semibold">{expected}</span> to confirm.
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <Label htmlFor="removeServiceInstanceConfirm">Confirmation</Label>
          <Input
            id="removeServiceInstanceConfirm"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder={expected}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={removeInstanceMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={!canSubmit || removeInstanceMutation.isPending}
            isLoading={removeInstanceMutation.isPending}
            onClick={() => {
              if (!canSubmit) return;
              removeInstanceMutation.mutate();
            }}
          >
            {removeInstanceMutation.isPending ? "Removing..." : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


