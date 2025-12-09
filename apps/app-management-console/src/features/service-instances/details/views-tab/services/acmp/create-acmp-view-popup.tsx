"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
import {
  ACMPFilterType,
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
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface CreateAcmpViewPopupProps {
  show: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateAcmpViewPopup({
  show,
  onClose,
  onCreated,
}: CreateAcmpViewPopupProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [filterType, setFilterType] = React.useState<ACMPFilterType>(
    ACMPFilterType.None
  );
  const [tenantId, setTenantId] = React.useState<string>("");
  const [groupId, setGroupId] = React.useState<string>("");
  const [canViewDashboard, setCanViewDashboard] = React.useState<boolean>(true);
  const [canViewDevices, setCanViewDevices] = React.useState<boolean>(true);
  const [canViewJobs, setCanViewJobs] = React.useState<boolean>(false);
  const [canPushRollouts, setCanPushRollouts] = React.useState<boolean>(false);
  const [canPushClientCommands, setCanPushClientCommands] = React.useState<boolean>(false);
  const [canViewAssets, setCanViewAssets] = React.useState<boolean>(false);
  const [canViewTickets, setCanViewTickets] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (show) {
      setName("");
      setFilterType(ACMPFilterType.None);
      setTenantId("");
      setGroupId("");
      setCanViewDashboard(true);
      setCanViewDevices(true);
      setCanViewJobs(false);
      setCanPushRollouts(false);
      setCanPushClientCommands(false);
      setCanViewAssets(false);
      setCanViewTickets(false);
    }
  }, [show]);

  const isTenantFilter = filterType === ACMPFilterType.Tenant;
  const isValidName = name.trim().length > 0;
  const isValidTenantFilter = !isTenantFilter || (isTenantFilter && tenantId.trim().length > 0 && groupId.trim().length > 0);
  const canSubmit = isValidName && isValidTenantFilter;

  const createViewMutation = useAuthedMutation({
    mutationFn: async ({ session }: { session: Session }): Promise<void> => {
      await getServiceClient(session).createServiceView({
        body: {
          viewId: crypto.randomUUID(),
          organizationServiceInstanceId:
            organizationServiceInstanceId as string,
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
      toast.success("View created successfully");
      onClose();
      onCreated?.();
      queryClient.invalidateQueries({
        queryKey: ["serviceInstanceViews", organizationServiceInstanceId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create view");
    },
  });

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create ACMP View</DialogTitle>
          <DialogDescription>
            Define the name, filter and permissions for a new ACMP service view.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="createAcmpViewName">View name</Label>
            <Input
              id="createAcmpViewName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter view name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="createAcmpFilterType">Filter</Label>
            <Select
              value={filterType}
              onValueChange={(val) => setFilterType(val as ACMPFilterType)}
            >
              <SelectTrigger id="createAcmpFilterType">
                <SelectValue placeholder="Select filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ACMPFilterType.None}>None</SelectItem>
                <SelectItem value={ACMPFilterType.Tenant}>Tenant</SelectItem>
              </SelectContent>
            </Select>
            {filterType === ACMPFilterType.Tenant && (
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <Label htmlFor="createAcmpTenantId">Tenant ID</Label>
                  <Input
                    id="createAcmpTenantId"
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    placeholder="Enter tenant ID"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="createAcmpGroupId">Group ID</Label>
                  <Input
                    id="createAcmpGroupId"
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
            disabled={createViewMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!canSubmit || createViewMutation.isPending}
            isLoading={createViewMutation.isPending}
            onClick={() => {
              if (!canSubmit) return;
              createViewMutation.mutate();
            }}
          >
            {createViewMutation.isPending ? "Creating..." : "Create view"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

