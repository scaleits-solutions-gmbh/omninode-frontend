"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import React from "react";
import {
  WeclappFilterType,
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
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import type { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface CreateWeclappViewPopupProps {
  show: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateWeclappViewPopup({
  show,
  onClose,
  onCreated,
}: CreateWeclappViewPopupProps) {
  const { organizationServiceInstanceId } = useParams<{
    organizationId: string;
    organizationServiceInstanceId: string;
  }>();
  const queryClient = useQueryClient();
  const [name, setName] = React.useState("");
  const [filterType, setFilterType] = React.useState<WeclappFilterType>(
    WeclappFilterType.None
  );
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [canViewDashboard, setCanViewDashboard] = React.useState<boolean>(true);
  const [canViewQuotes, setCanViewQuotes] = React.useState<boolean>(true);
  const [canViewSalesOrders, setCanViewSalesOrders] =
    React.useState<boolean>(true);
  const [canViewInvoices, setCanViewInvoices] = React.useState<boolean>(true);
  const [canViewProjects, setCanViewProjects] = React.useState<boolean>(true);
  const [canViewTickets, setCanViewTickets] = React.useState<boolean>(true);
  const [canCreateTickets, setCanCreateTickets] =
    React.useState<boolean>(true);
  const [canRespondToTickets, setCanRespondToTickets] =
    React.useState<boolean>(true);

  React.useEffect(() => {
    if (show) {
      setName("");
      setFilterType(WeclappFilterType.None);
      setFilterValue("");
      setCanViewDashboard(true);
      setCanViewQuotes(true);
      setCanViewSalesOrders(true);
      setCanViewInvoices(true);
      setCanViewProjects(true);
      setCanViewTickets(true);
      setCanCreateTickets(true);
      setCanRespondToTickets(true);
    }
  }, [show]);

  const isOrgFilter = filterType === WeclappFilterType.Organization;
  const isValidName = name.trim().length > 0;
  const isValidFilter =
    !isOrgFilter || (isOrgFilter && filterValue.trim().length > 0);
  const canSubmit = isValidName && isValidFilter;

  const createViewMutation = useAuthedMutation({
    mutationFn: async ({ session }: { session: Session }): Promise<void> => {
      const apiClient = baseOmninodeApiClient();

      await apiClient.serviceMicroservice.createServiceView({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
          body: {
            viewId: crypto.randomUUID(),
            organizationServiceInstanceId:
              organizationServiceInstanceId as string,
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
          <DialogTitle>Create Weclapp View</DialogTitle>
          <DialogDescription>
            Define the name, filter and permissions for a new Weclapp service
            view.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="createWeclappViewName">View name</Label>
            <Input
              id="createWeclappViewName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter view name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="createWeclappFilterType">Filter</Label>
            <Select
              value={filterType}
              onValueChange={(val) => setFilterType(val as WeclappFilterType)}
            >
              <SelectTrigger id="createWeclappFilterType">
                <SelectValue placeholder="Select filter" />
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
                <Label htmlFor="createWeclappOrgId">Organization ID</Label>
                <Input
                  id="createWeclappOrgId"
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


