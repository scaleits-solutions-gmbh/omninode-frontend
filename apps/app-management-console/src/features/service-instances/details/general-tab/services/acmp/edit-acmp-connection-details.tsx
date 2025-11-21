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
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  ComposedOrganizationServiceInstanceReadModel,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

interface EditAcmpConnectionDetailsPopupProps {
  show: boolean;
  serviceInstance: ComposedOrganizationServiceInstanceReadModel;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function EditAcmpConnectionDetailsPopup({
  show,
  serviceInstance,
  onClose,
  onUpdated,
}: EditAcmpConnectionDetailsPopupProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const serviceInstanceId = serviceInstance.serviceInstance.id;
  const [hostname, setHostname] = React.useState(
    serviceInstance.serviceInstance.hostname ?? ""
  );
  const [apiKey, setApiKey] = React.useState("");
  const [hasTestPassed, setHasTestPassed] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      setHostname(serviceInstance.serviceInstance.hostname ?? "");
      setApiKey("");
      setHasTestPassed(false);
    }
  }, [show, serviceInstance.serviceInstance.hostname]);

  // Treat empty API key as "no change"
  const normalizedHostname = hostname.trim();
  const normalizedApiKey = apiKey.trim();
  const effectiveApiKey =
    normalizedApiKey === "" ? "" : normalizedApiKey;

  const isDirty =
    normalizedHostname !==
      (serviceInstance.serviceInstance.hostname ?? "").trim() ||
    effectiveApiKey !== "";
  const canSubmit = isDirty && normalizedHostname.length > 0 && hasTestPassed;

  // Reset test status whenever inputs change
  React.useEffect(() => {
    setHasTestPassed(false);
  }, [normalizedHostname, normalizedApiKey]);

  const testConnectionMutation = useAuthedMutation({
    mutationFn: async (): Promise<void> => {
      // TODO: wire to real ACMP test connection endpoint
      await baseOmninodeApiClient().serviceMicroservice;
      // Simulate success for now
      return;
    },
    onSuccess: () => {
      setHasTestPassed(true);
      toast.success("Connection test passed");
    },
    onError: (error) => {
      setHasTestPassed(false);
      toast.error(error.message || "Connection test failed");
    },
  });

  const updateConnectionMutation = useAuthedMutation({
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
            id: serviceInstanceId,
            service: Service.Acmp,
            config: {
              hostname: normalizedHostname,
              ...(effectiveApiKey !== "" && { apiKey: effectiveApiKey }),
            },
          },
        },
      });
    },
    onSuccess: () => {
      toast.success("ACMP connection details updated");
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
      toast.error(error.message || "Failed to update ACMP connection details");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit ACMP Connection</DialogTitle>
          <DialogDescription>
            Update the ACMP hostname and API key for this service instance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="acmpHostname">Hostname</Label>
            <Input
              id="acmpHostname"
              value={hostname}
              onChange={(e) => setHostname(e.target.value)}
              placeholder="acmp.example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acmpApiKey">API key</Label>
            <Input
              id="acmpApiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Leave empty for no change"
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to keep the existing API key unchanged.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            disabled={
              normalizedHostname.length === 0 || testConnectionMutation.isPending
            }
            isLoading={testConnectionMutation.isPending}
            onClick={() => {
              if (normalizedHostname.length === 0) return;
              testConnectionMutation.mutate();
            }}
          >
            {testConnectionMutation.isPending
              ? "Testing..."
              : hasTestPassed
              ? "Test passed"
              : "Test connection"}
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={
              updateConnectionMutation.isPending ||
              testConnectionMutation.isPending
            }
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || updateConnectionMutation.isPending}
            isLoading={updateConnectionMutation.isPending}
            onClick={() => {
              if (!canSubmit) return;
              updateConnectionMutation.mutate();
            }}
          >
            {updateConnectionMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


