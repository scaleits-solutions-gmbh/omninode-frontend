"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React, { useEffect, useMemo, useState } from "react";
import {
  ComposedServiceViewReadModel,
  OrganizationRelationshipReadModel,
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
import { useAuthedMutation, useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import { getOrganizationClient, getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";

interface OrganizationRelationshipGrantAddPopupProps {
  show: boolean;
  onClose: () => void;
  onGranted?: () => void;
}

export default function OrganizationRelationshipGrantAddPopup({
  show,
  onClose,
  onGranted,
}: OrganizationRelationshipGrantAddPopupProps) {
  const { organizationId, organizationServiceInstanceId: serviceInstanceId } =
    useParams<{
      organizationId: string;
      organizationServiceInstanceId: string;
    }>();

  const [selectedRelationshipId, setSelectedRelationshipId] = useState<
    string | undefined
  >(undefined);
  const [selectedViewId, setSelectedViewId] = useState<string | undefined>(
    undefined
  );

  const {
    data: relationshipsData,
    isLoading: relationshipsLoading,
    error: relationshipsError,
  } = useAuthedQuery({
    queryKey: [
      "organizationRelationshipsForAddGrant",
      organizationId,
      show,
    ],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findPaginatedOrganizationRelationships({
        pathParams: { id: organizationId as string },
        queryParams: {
          pageSize: 50,
          page: 1,
        },
      });
      return response.data;
    },
    enabled: show,
  });

  const relationships: OrganizationRelationshipReadModel[] = useMemo(
    () =>
      (relationshipsData?.data as OrganizationRelationshipReadModel[]) ||
      [],
    [relationshipsData]
  );

  const relationshipOptions = useMemo(
    () =>
      relationships.map((rel) => {
        const isLeft = rel.leftOrganizationId === (organizationId as string);
        const otherOrgName = isLeft
          ? rel.rightOrganizationName
          : rel.leftOrganizationName;
        const otherOrgId = isLeft
          ? rel.rightOrganizationId
          : rel.leftOrganizationId;
        return {
          id: rel.id,
          otherOrgId,
          otherOrgName,
        };
      }),
    [relationships, organizationId]
  );

  const {
    data: viewsData,
    isLoading: viewsLoading,
    error: viewsError,
  } = useAuthedQuery({
    queryKey: [
      "serviceInstanceViewsForAddOrgRelGrant",
      serviceInstanceId,
      show,
    ],
    queryFn: async ({ session }) => {
      const response = await getServiceClient(session).findComposedPaginatedServiceViews({
        pathParams: { id: serviceInstanceId as string },
        queryParams: {
          pageSize: 50,
          page: 1,
          searchTerm: undefined,
        },
      });
      return response.data;
    },
    enabled: show && Boolean(serviceInstanceId),
  });

  const availableViews: ComposedServiceViewReadModel[] = useMemo(
    () =>
      ((viewsData?.data as ComposedServiceViewReadModel[]) || []) as ComposedServiceViewReadModel[],
    [viewsData]
  );

  useEffect(() => {
    if (!show) {
      setSelectedRelationshipId(undefined);
      setSelectedViewId(undefined);
      return;
    }
    if (!selectedRelationshipId && relationshipOptions.length > 0) {
      setSelectedRelationshipId(relationshipOptions[0]?.id);
    }
    if (!selectedViewId && availableViews.length > 0) {
      setSelectedViewId(availableViews[0]?.id);
    }
  }, [
    show,
    relationshipOptions,
    availableViews,
    selectedRelationshipId,
    selectedViewId,
  ]);

  const grantAccessMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { relationshipId: string; viewId: string };
    }): Promise<void> => {
      const relOption = relationshipOptions.find(
        (r) => r.id === variables.relationshipId
      );
      if (!relOption) {
        throw new Error("Selected relationship not found");
      }

      await getServiceClient(session).grantServiceViewToOrganizationRelationship({
        body: {
          viewId: variables.viewId,
          targetOrganizationRelationshipId: variables.relationshipId,
          targetOrganizationId: relOption.otherOrgId,
        },
      });
    },
    onSuccess: () => {
      toast.success("Access granted successfully");
      onClose();
      onGranted?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to grant access");
    },
  });

  const canSubmit =
    !relationshipsLoading &&
    !viewsLoading &&
    !relationshipsError &&
    !viewsError &&
    !!selectedRelationshipId &&
    !!selectedViewId &&
    !grantAccessMutation.isPending;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Organization Relationship Grant</DialogTitle>
          <DialogDescription>
            Grant a service view to an organization connected via a relationship.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This will grant the selected organization access to the chosen view.
            You can change or revoke this access later.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="relationshipId">Organization relationship</Label>
            <Select
              value={selectedRelationshipId}
              onValueChange={(val) => setSelectedRelationshipId(val)}
              disabled={relationshipsLoading || !!relationshipsError}
            >
              <SelectTrigger id="relationshipId">
                <SelectValue
                  placeholder={
                    relationshipsLoading
                      ? "Loading relationships..."
                      : relationshipOptions.length === 0
                        ? "No relationships available"
                        : "Select an organization"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((rel) => (
                  <SelectItem key={rel.id} value={rel.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 rounded-md">
                        <AvatarImage alt={rel.otherOrgName} />
                        <AvatarFallback>{rel.otherOrgName?.charAt(0) ?? "O"}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{rel.otherOrgName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {relationshipsError && (
              <p className="text-xs text-red-500">
                Failed to load relationships: {relationshipsError.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgRelGrantViewId">View</Label>
            <Select
              value={selectedViewId}
              onValueChange={(val) => setSelectedViewId(val)}
              disabled={viewsLoading || !!viewsError}
            >
              <SelectTrigger id="orgRelGrantViewId">
                <SelectValue
                  placeholder={
                    viewsLoading
                      ? "Loading views..."
                      : availableViews.length === 0
                        ? "No views available"
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
            disabled={grantAccessMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() =>
              selectedRelationshipId &&
              selectedViewId &&
              grantAccessMutation.mutate({
                relationshipId: selectedRelationshipId,
                viewId: selectedViewId,
              })
            }
            disabled={!canSubmit}
            isLoading={grantAccessMutation.isPending}
          >
            {grantAccessMutation.isPending ? "Granting..." : "Grant access"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


