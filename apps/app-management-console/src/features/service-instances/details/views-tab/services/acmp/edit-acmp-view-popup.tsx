"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
import {
  ACMPFilterType,
  ComposedServiceViewReadModel,
  Service,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
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
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/pkg-frontend-common-kit/components";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { toast } from "sonner";
import { getServiceClient } from "@repo/pkg-frontend-common-kit/utils";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";

interface EditAcmpViewPopupProps {
  show: boolean;
  view: ComposedServiceViewReadModel;
  onClose: () => void;
  onUpdated?: () => void;
}

interface EditAcmpViewPopupInnerProps extends EditAcmpViewPopupProps {
  view: ComposedServiceViewReadModel & {
    service: Service.Acmp;
    serviceView: {
      filterType: ACMPFilterType;
      filterValue1: string;
      filterValue2: string;
      canViewDashboard: boolean;
      canViewDevices: boolean;
      canViewJobs: boolean;
      canPushRollouts: boolean;
      canPushClientCommands: boolean;
      canViewAssets: boolean;
      canViewTickets: boolean;
    };
  };
}

export default function EditAcmpViewPopup(props: EditAcmpViewPopupProps) {
  if (props.view.service !== Service.Acmp) {
    return null;
  }

  return (
    <EditAcmpViewPopupInner
      {...props}
      view={props.view as EditAcmpViewPopupInnerProps["view"]}
    />
  );
}

function EditAcmpViewPopupInner({
  show,
  view,
  onClose,
  onUpdated,
}: EditAcmpViewPopupInnerProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(view.name);
  const [filterType, setFilterType] = React.useState<ACMPFilterType>(
    view.serviceView.filterType ?? ACMPFilterType.None
  );
  const [tenantId, setTenantId] = React.useState<string>(
    view.serviceView.filterValue1 ?? ""
  );
  const [groupId, setGroupId] = React.useState<string>(
    view.serviceView.filterValue2 ?? ""
  );
  const [canViewDashboard, setCanViewDashboard] = React.useState<boolean>(
    view.serviceView.canViewDashboard ?? true
  );
  const [canViewDevices, setCanViewDevices] = React.useState<boolean>(
    view.serviceView.canViewDevices ?? true
  );
  const [canViewJobs, setCanViewJobs] = React.useState<boolean>(
    view.serviceView.canViewJobs ?? false
  );
  const [canPushRollouts, setCanPushRollouts] = React.useState<boolean>(
    view.serviceView.canPushRollouts ?? false
  );
  const [canPushClientCommands, setCanPushClientCommands] =
    React.useState<boolean>(view.serviceView.canPushClientCommands ?? false);
  const [canViewAssets, setCanViewAssets] = React.useState<boolean>(
    view.serviceView.canViewAssets ?? false
  );
  const [canViewTickets, setCanViewTickets] = React.useState<boolean>(
    view.serviceView.canViewTickets ?? false
  );

  React.useEffect(() => {
    if (show) {
      setName(view.name);
      const svc = view.serviceView;
      setFilterType(svc?.filterType ?? ACMPFilterType.None);
      setTenantId(svc?.filterValue1 ?? "");
      setGroupId(svc?.filterValue2 ?? "");
      setCanViewDashboard(svc?.canViewDashboard ?? true);
      setCanViewDevices(svc?.canViewDevices ?? true);
      setCanViewJobs(svc?.canViewJobs ?? false);
      setCanPushRollouts(svc?.canPushRollouts ?? false);
      setCanPushClientCommands(svc?.canPushClientCommands ?? false);
      setCanViewAssets(svc?.canViewAssets ?? false);
      setCanViewTickets(svc?.canViewTickets ?? false);
    }
  }, [show, view]);

  const original = view.serviceView;
  const isDirty =
    name.trim() !== view.name.trim() ||
    filterType !== (original?.filterType ?? ACMPFilterType.None) ||
    tenantId !== (original?.filterValue1 ?? "") ||
    groupId !== (original?.filterValue2 ?? "") ||
    canViewDashboard !== (original?.canViewDashboard ?? true) ||
    canViewDevices !== (original?.canViewDevices ?? true) ||
    canViewJobs !== (original?.canViewJobs ?? false) ||
    canPushRollouts !== (original?.canPushRollouts ?? false) ||
    canPushClientCommands !== (original?.canPushClientCommands ?? false) ||
    canViewAssets !== (original?.canViewAssets ?? false) ||
    canViewTickets !== (original?.canViewTickets ?? false);

  const isTenantFilter = filterType === ACMPFilterType.Tenant;
  const isValidName = name.trim().length > 0;
  const isValidTenantFilter = !isTenantFilter || (isTenantFilter && tenantId.trim().length > 0 && groupId.trim().length > 0);
  const canSubmit = isDirty && isValidName && isValidTenantFilter;

  const updateViewMutation = useAuthedMutation({
    mutationFn: async ({
      session,
    }: {
      session: Session;
    }): Promise<void> => {
      await getServiceClient(session).updateServiceView({
        body: {
          viewId: view.id,
          name: name.trim(),
          service: Service.Acmp,
          view: {
            filterType,
            filterValue1: tenantId,
            filterValue2: groupId,
            canViewDashboard,
            canViewDevices,
            canViewJobs,
            canPushRollouts,
            canPushClientCommands,
            canViewAssets,
            canViewTickets,
          },
        },
      });
    },
    onSuccess: () => {
      toast.success("View updated successfully");
      onClose();
      onUpdated?.();
      queryClient.invalidateQueries({
        queryKey: ["serviceInstanceViews", organizationServiceInstanceId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update view");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit ACMP View</DialogTitle>
          <DialogDescription>
            Update the name, filter and permissions of this ACMP service view.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="acmpViewName">View name</Label>
            <Input
              id="acmpViewName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter view name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="acmpFilterType">Filter</Label>
            <Select
              value={filterType}
              onValueChange={(val) => setFilterType(val as ACMPFilterType)}
            >
              <SelectTrigger id="acmpFilterType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ACMPFilterType.None}>None</SelectItem>
                <SelectItem value={ACMPFilterType.Tenant}>Tenant</SelectItem>
              </SelectContent>
            </Select>
            {filterType === ACMPFilterType.Tenant && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="acmpTenantId">Tenant ID</Label>
                  <Input
                    id="acmpTenantId"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="Enter tenant ID"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="acmpGroupId">Group ID</Label>
                  <Input
                    id="acmpGroupId"
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value)}
                    placeholder="Enter group ID"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canViewDashboard}
                  onCheckedChange={(checked) =>
                    setCanViewDashboard(checked as boolean)
                  }
                />
                <span>View dashboard</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canViewDevices}
                  onCheckedChange={(checked) =>
                    setCanViewDevices(checked as boolean)
                  }
                />
                <span>View devices</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canViewJobs}
                  onCheckedChange={(checked) =>
                    setCanViewJobs(checked as boolean)
                  }
                />
                <span>View jobs</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canPushRollouts}
                  onCheckedChange={(checked) =>
                    setCanPushRollouts(checked as boolean)
                  }
                />
                <span>Push rollouts</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canPushClientCommands}
                  onCheckedChange={(checked) =>
                    setCanPushClientCommands(checked as boolean)
                  }
                />
                <span>Push client commands</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canViewAssets}
                  onCheckedChange={(checked) =>
                    setCanViewAssets(checked as boolean)
                  }
                />
                <span>View assets</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={canViewTickets}
                  onCheckedChange={(checked) =>
                    setCanViewTickets(checked as boolean)
                  }
                />
                <span>View tickets</span>
              </label>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={updateViewMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || updateViewMutation.isPending}
            isLoading={updateViewMutation.isPending}
            onClick={() => {
              if (!canSubmit) return;
              updateViewMutation.mutate();
            }}
          >
            {updateViewMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}