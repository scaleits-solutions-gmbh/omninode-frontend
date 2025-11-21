"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React, { useEffect, useMemo, useState } from "react";
import {
  ComposedOrganizationMembershipReadModel,
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
import { useAuthedMutation, useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";

interface MembershipGrantAddPopupProps {
  show: boolean;
  onClose: () => void;
  onGranted?: () => void;
}

function getInitialsFromMembership(
  membership: ComposedOrganizationMembershipReadModel
): string {
  const fullName = `${membership.user.firstName} ${membership.user.lastName}`.trim();
  const parts = fullName.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

export default function MembershipGrantAddPopup({
  show,
  onClose,
  onGranted,
}: MembershipGrantAddPopupProps) {
  const { organizationId, organizationServiceInstanceId: serviceInstanceId } =
    useParams<{
      organizationId: string;
      organizationServiceInstanceId: string;
    }>();

  const [selectedMembershipId, setSelectedMembershipId] = useState<
    string | undefined
  >(undefined);
  const [selectedViewId, setSelectedViewId] = useState<string | undefined>(
    undefined
  );

  const {
    data: membershipsData,
    isLoading: membershipsLoading,
    error: membershipsError,
  } = useAuthedQuery({
    queryKey: [
      "organizationMembershipsForAddGrant",
      organizationId,
      show,
    ],
    queryFn: async ({ session }) => {
      return await baseOmninodeApiClient().organizationMicroservice.findComposedOrganizationMemberships(
        {
          request: {
            pathParams: { id: organizationId as string },
            queryParams: {
              pageSize: 50,
              page: 1,
              searchTerm: undefined,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    enabled: show,
  });

  const memberships: ComposedOrganizationMembershipReadModel[] = useMemo(
    () =>
      (membershipsData?.body.data as ComposedOrganizationMembershipReadModel[]) ||
      [],
    [membershipsData]
  );

  const {
    data: viewsData,
    isLoading: viewsLoading,
    error: viewsError,
  } = useAuthedQuery({
    queryKey: [
      "serviceInstanceViewsForAddMembershipGrant",
      serviceInstanceId,
      show,
    ],
    queryFn: async ({ session }) => {
      return await baseOmninodeApiClient().serviceMicroservice.findComposedPaginatedServiceViews(
        {
          request: {
            pathParams: { id: serviceInstanceId as string },
            queryParams: {
              pageSize: 50,
              page: 1,
              searchTerm: undefined,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    enabled: show && Boolean(serviceInstanceId),
  });

  const availableViews: ComposedServiceViewReadModel[] = useMemo(
    () =>
      ((viewsData?.body.data as ComposedServiceViewReadModel[]) || []) as ComposedServiceViewReadModel[],
    [viewsData]
  );

  useEffect(() => {
    if (!show) {
      setSelectedMembershipId(undefined);
      setSelectedViewId(undefined);
      return;
    }
    if (!selectedMembershipId && memberships.length > 0) {
      setSelectedMembershipId(memberships[0]?.id);
    }
    if (!selectedViewId && availableViews.length > 0) {
      setSelectedViewId(availableViews[0]?.id);
    }
  }, [show, memberships, availableViews, selectedMembershipId, selectedViewId]);

  const grantAccessMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { membershipId: string; viewId: string };
    }): Promise<void> => {
      const apiClient = baseOmninodeApiClient();

      await apiClient.serviceMicroservice.grantServiceViewToOrganizationMembership(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            body: {
              viewId: variables.viewId,
              organizationMembershipId: variables.membershipId,
            },
          },
        }
      );
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
    !membershipsLoading &&
    !viewsLoading &&
    !membershipsError &&
    !viewsError &&
    !!selectedMembershipId &&
    !!selectedViewId &&
    !grantAccessMutation.isPending;

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Add Membership Grant</DialogTitle>
          <DialogDescription>
            Grant a service view to a member of this organization.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This will grant the selected user access to the chosen view. You can
            change or revoke this access later.
          </AlertDescription>
        </Alert>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="membershipId">Member</Label>
            <Select
              value={selectedMembershipId}
              onValueChange={(val) => setSelectedMembershipId(val)}
              disabled={membershipsLoading || !!membershipsError}
            >
              <SelectTrigger id="membershipId">
                <SelectValue
                  placeholder={
                    membershipsLoading
                      ? "Loading members..."
                      : memberships.length === 0
                        ? "No members available"
                        : "Select a member"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {memberships.map((membership) => {
                  const fullName = `${membership.user.firstName} ${membership.user.lastName}`.trim();
                  return (
                    <SelectItem key={membership.id} value={membership.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage alt={fullName} />
                          <AvatarFallback seed={membership.user.id}>
                            {getInitialsFromMembership(membership)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">
                          {fullName || "Unknown User"}{" "}
                          <span className="text-xs text-muted-foreground">
                            ({membership.user.email})
                          </span>
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {membershipsError && (
              <p className="text-xs text-red-500">
                Failed to load members: {membershipsError.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="membershipGrantViewId">View</Label>
            <Select
              value={selectedViewId}
              onValueChange={(val) => setSelectedViewId(val)}
              disabled={viewsLoading || !!viewsError}
            >
              <SelectTrigger id="membershipGrantViewId">
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
              selectedMembershipId &&
              selectedViewId &&
              grantAccessMutation.mutate({
                membershipId: selectedMembershipId,
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


