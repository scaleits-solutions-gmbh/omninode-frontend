"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
  Input,
  Textarea,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import type { Session } from "next-auth";
import { ComposedOrganizationServiceInstanceReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface EditServiceInstanceBasicInformationPopupProps {
  show: boolean;
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function EditServiceInstanceDetailsPopup({
  show,
  serviceInstance,
  onClose,
  onUpdated,
}: EditServiceInstanceBasicInformationPopupProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(
    serviceInstance.serviceInstanceName ?? ""
  );
  const [description, setDescription] = React.useState(
    serviceInstance.serviceInstanceDescription ?? ""
  );

  React.useEffect(() => {
    if (show) {
      setName(serviceInstance.serviceInstanceName ?? "");
      setDescription(serviceInstance.serviceInstanceDescription ?? "");
    }
  }, [show, serviceInstance]);

  const isDirty =
    name.trim() !== (serviceInstance.serviceInstanceName ?? "").trim() ||
    description.trim() !== (serviceInstance.serviceInstanceDescription ?? "").trim();
  const canSubmit = isDirty && name.trim().length > 0;

  const updateDetailsMutation = useAuthedMutation({
    mutationFn: async ({
      session,
    }: {
      session: Session;
    }): Promise<void> => {
      const apiClient = baseOmninodeApiClient();

      await apiClient.serviceMicroservice.updateServiceInstance({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
          body: {
            id: serviceInstance.serviceInstanceId,
            name: name.trim(),
            description: description.trim() || undefined,
          },
        },
      });
    },
    onSuccess: () => {
      toast.success("Service instance details updated");
      onClose();
      onUpdated?.();
      queryClient.invalidateQueries({
        queryKey: [
          "composedOrganizationServiceInstance",
          organizationServiceInstanceId,
        ],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update service instance details");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service Instance Details</DialogTitle>
          <DialogDescription>
            Update the name and description of this service instance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceInstanceName">Name</Label>
            <Input
              id="serviceInstanceName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter service instance name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceInstanceDescription">Description</Label>
            <Textarea
              id="serviceInstanceDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this service instance"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateDetailsMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || updateDetailsMutation.isPending}
            isLoading={updateDetailsMutation.isPending}
            onClick={() => {
              if (!canSubmit) return;
              updateDetailsMutation.mutate();
            }}
          >
            {updateDetailsMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


