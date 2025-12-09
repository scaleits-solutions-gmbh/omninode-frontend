"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
  ComposedRelationshipViewGrantReadModel,
  ComposedServiceViewReadModel,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
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
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/pkg-frontend-common-kit/components";
import { AlertCircle } from "lucide-react";
import {
  useAuthedMutation,
  useAuthedQuery,
} from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import { getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface OrganizationRelationshipGrantChangeAccessPopupProps {
  show: boolean;
  grant: ComposedRelationshipViewGrantReadModel;
  onClose: () => void;
  onChanged?: () => void;
}

export default function OrganizationRelationshipGrantChangeAccessPopup({
  show,
  grant,
  onClose,
  onChanged,
}: OrganizationRelationshipGrantChangeAccessPopupProps) {
  const { organizationServiceInstanceId: serviceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();

  const [selectedViewId, setSelectedViewId] = useState<string | undefined>(
    undefined
  );

  const {
    data: viewsData,
    isLoading: viewsLoading,
    error: viewsError,
  } = useAuthedQuery({
    queryKey: [
      "serviceInstanceViewsForChangeAccessOrgRelationships",
      serviceInstanceId,
    ],
    queryFn: async ({ session }) => {
      const response = await getServiceClient(session).findComposedPaginatedServiceViews({
        pathParams: { id: serviceInstanceId as string },
        queryParams: {
          pageSize: 50,
          page: 1,
        },
      });
      return response.data;
    },
    enabled: show,
  });

  const availableViews: ComposedServiceViewReadModel[] =
    ((viewsData?.data as ComposedServiceViewReadModel[]) || []).filter(
      (v) => v.id !== grant.view.id
    );

  useEffect(() => {
    if (!show) {
      setSelectedViewId(undefined);
      return;
    }
    if (!selectedViewId && availableViews.length > 0) {
      setSelectedViewId(availableViews[0]?.id);
    }
  }, [show, availableViews, selectedViewId]);

  const changeAccessMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { newViewId: string };
    }): Promise<void> => {
      // First revoke current view access
      await getServiceClient(session).revokeServiceViewFromOrganizationRelationship({
        body: {
          viewId: grant.view.id,
          organizationRelationshipId: grant.organizationRelationshipId,
        },
      });

      // Then grant the new view
      await getServiceClient(session).grantServiceViewToOrganizationRelationship({
        body: {
          viewId: variables.newViewId,
          targetOrganizationRelationshipId: grant.organizationRelationshipId,
          targetOrganizationId: grant.organization.id,
        },
      });
    },
    onSuccess: () => {
      toast.success("Access updated successfully");
      onClose();
      onChanged?.();
      queryClient.invalidateQueries({
        queryKey: [
          "serviceInstanceOrganizationRelationshipGrants",
          serviceInstanceId,
        ],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update access");
    },
  });

  const canSubmit =
    !viewsLoading &&
    !viewsError &&
    !!selectedViewId &&
    selectedViewId !== grant.view.id &&
    !changeAccessMutation.isPending;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Access</DialogTitle>
          <DialogDescription>
            Switch this organization&apos;s access to a different view.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Changing access will revoke the current view and grant access to the
            selected view.
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
                Current view:{" "}
                <span className="font-medium">{grant.view.name}</span>
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newOrgRelViewId">New view</Label>
            <Select
              value={selectedViewId}
              onValueChange={(val) => setSelectedViewId(val)}
              disabled={viewsLoading || !!viewsError}
            >
              <SelectTrigger id="newOrgRelViewId">
                <SelectValue
                  placeholder={
                    viewsLoading
                      ? "Loading views..."
                      : availableViews.length === 0
                        ? "No other views available"
                        : "Select a view"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {availableViews.map((view) => (
                  <SelectItem key={view.id} value={view.id}>
                    {view.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {viewsError && (
              <p className="text-xs text-red-500">
                Failed to load views: {viewsError.message}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={changeAccessMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() =>
              selectedViewId &&
              changeAccessMutation.mutate({ newViewId: selectedViewId })
            }
            disabled={!canSubmit}
            isLoading={changeAccessMutation.isPending}
          >
            {changeAccessMutation.isPending ? "Updating..." : "Update access"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


