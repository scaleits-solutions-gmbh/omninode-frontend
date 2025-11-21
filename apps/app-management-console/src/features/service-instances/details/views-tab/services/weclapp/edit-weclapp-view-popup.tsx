"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
import {
  ComposedServiceViewReadModel,
  Service,
  WeclappFilterType,
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
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";

interface EditWeclappViewPopupProps {
  show: boolean;
  view: ComposedServiceViewReadModel;
  onClose: () => void;
  onUpdated?: () => void;
}

interface EditWeclappViewPopupInnerProps extends EditWeclappViewPopupProps {
  view: ComposedServiceViewReadModel & {
    service: Service.Weclapp;
    serviceView: {
      filterType: WeclappFilterType;
      filterValue: string;
      canViewDashboard: boolean;
      canViewQuotes: boolean;
      canViewSalesOrders: boolean;
      canViewInvoices: boolean;
      canViewProjects: boolean;
      canViewTickets: boolean;
      canCreateTickets: boolean;
      canRespondToTickets: boolean;
    };
  };
}

export default function EditWeclappViewPopup(
  props: EditWeclappViewPopupProps
) {
  if (props.view.service !== Service.Weclapp) {
    return null;
  }

  return (
    <EditWeclappViewPopupInner
      {...props}
      view={props.view as EditWeclappViewPopupInnerProps["view"]}
    />
  );
}

function EditWeclappViewPopupInner({
  show,
  view,
  onClose,
  onUpdated,
}: EditWeclappViewPopupInnerProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState(view.name);
  const [filterType, setFilterType] = React.useState<WeclappFilterType>(
    view.serviceView.filterType ?? WeclappFilterType.None
  );
  const [filterValue, setFilterValue] = React.useState<string>(
    view.serviceView.filterValue ?? ""
  );
  const [canViewDashboard, setCanViewDashboard] = React.useState<boolean>(
    view.serviceView.canViewDashboard ?? true
  );
  const [canViewQuotes, setCanViewQuotes] = React.useState<boolean>(
    view.serviceView.canViewQuotes ?? true
  );
  const [canViewSalesOrders, setCanViewSalesOrders] = React.useState<boolean>(
    view.serviceView.canViewSalesOrders ?? true
  );
  const [canViewInvoices, setCanViewInvoices] = React.useState<boolean>(
    view.serviceView.canViewInvoices ?? true
  );
  const [canViewProjects, setCanViewProjects] = React.useState<boolean>(
    view.serviceView.canViewProjects ?? true
  );
  const [canViewTickets, setCanViewTickets] = React.useState<boolean>(
    view.serviceView.canViewTickets ?? true
  );
  const [canCreateTickets, setCanCreateTickets] = React.useState<boolean>(
    view.serviceView.canCreateTickets ?? true
  );
  const [canRespondToTickets, setCanRespondToTickets] =
    React.useState<boolean>(
      view.serviceView.canRespondToTickets ?? true
    );

  React.useEffect(() => {
    if (show) {
      setName(view.name);
      const svc = view.serviceView;
      setFilterType(svc?.filterType ?? WeclappFilterType.None);
      setFilterValue(svc?.filterValue ?? "");
      setCanViewDashboard(svc?.canViewDashboard ?? true);
      setCanViewQuotes(svc?.canViewQuotes ?? true);
      setCanViewSalesOrders(svc?.canViewSalesOrders ?? true);
      setCanViewInvoices(svc?.canViewInvoices ?? true);
      setCanViewProjects(svc?.canViewProjects ?? true);
      setCanViewTickets(svc?.canViewTickets ?? true);
      setCanCreateTickets(svc?.canCreateTickets ?? true);
      setCanRespondToTickets(svc?.canRespondToTickets ?? true);
    }
  }, [show, view]);

  const original = view.serviceView;
  const isDirty =
    name.trim() !== view.name.trim() ||
    filterType !== (original?.filterType ?? WeclappFilterType.None) ||
    filterValue !== (original?.filterValue ?? "") ||
    canViewDashboard !== (original?.canViewDashboard ?? true) ||
    canViewQuotes !== (original?.canViewQuotes ?? true) ||
    canViewSalesOrders !== (original?.canViewSalesOrders ?? true) ||
    canViewInvoices !== (original?.canViewInvoices ?? true) ||
    canViewProjects !== (original?.canViewProjects ?? true) ||
    canViewTickets !== (original?.canViewTickets ?? true) ||
    canCreateTickets !== (original?.canCreateTickets ?? true) ||
    canRespondToTickets !== (original?.canRespondToTickets ?? true);

  const canSubmit = isDirty && name.trim().length > 0;

  const updateViewMutation = useAuthedMutation({
    mutationFn: async ({
      session,
    }: {
      session: Session;
    }): Promise<void> => {
      const apiClient = baseOmninodeApiClient();

      await apiClient.serviceMicroservice.updateServiceView({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
          body: {
            viewId: view.id,
            name: name.trim(),
            service: Service.Weclapp,
            view: {
              filterType,
              filterValue: filterValue,
              canViewDashboard,
              canViewQuotes,
              canViewSalesOrders,
              canViewInvoices,
              canViewProjects,
              canViewTickets,
              canCreateTickets,
              canRespondToTickets,
            },
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

  if (view.service !== Service.Weclapp) {
    return null;
  }

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Weclapp View</DialogTitle>
          <DialogDescription>
            Update the name, filter and permissions of this Weclapp service view.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="weclappViewName">View name</Label>
            <Input
              id="weclappViewName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter view name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weclappFilterType">Filter</Label>
            <Select
              value={filterType}
              onValueChange={(val) => setFilterType(val as WeclappFilterType)}
            >
              <SelectTrigger id="weclappFilterType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={WeclappFilterType.None}>None</SelectItem>
                <SelectItem value={WeclappFilterType.Organization}>
                  Organization
                </SelectItem>
              </SelectContent>
            </Select>
            {filterType === WeclappFilterType.Organization && (
              <div className="space-y-1 pt-2">
                <Label htmlFor="weclappOrgId">Organization ID</Label>
                <Input
                  id="weclappOrgId"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter organization ID"
                />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Permissions</Label>
            <div className="space-y-2">
              {[
                ["Dashboard", canViewDashboard, setCanViewDashboard],
                ["Quotes", canViewQuotes, setCanViewQuotes],
                ["Sales orders", canViewSalesOrders, setCanViewSalesOrders],
                ["Invoices", canViewInvoices, setCanViewInvoices],
                ["Projects", canViewProjects, setCanViewProjects],
                ["Tickets", canViewTickets, setCanViewTickets],
                ["Create tickets", canCreateTickets, setCanCreateTickets],
                [
                  "Respond to tickets",
                  canRespondToTickets,
                  setCanRespondToTickets,
                ],
              ].map(([label, value, setter]) => (
                <label
                  key={label as string}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={value as boolean}
                    onCheckedChange={(checked) =>
                      (setter as (v: boolean) => void)(checked as boolean)
                    }
                  />
                  <span>{label as string}</span>
                </label>
              ))}
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


