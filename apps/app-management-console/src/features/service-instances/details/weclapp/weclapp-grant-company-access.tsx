"use client";

import WeclappCompanySelector from "./weclapp-company-selector";
import WeclappPermissionsSelector from "./weclapp-permissions-selector";
import CompanySelector from "../global/company-selector";
import {
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "frontend-common-kit";
import { WeclappFilterType } from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { toast } from "sonner";

export default function WeclappGrantCompanyAccess() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const form = useForm({
    defaultValues: {
      companyId: "",
      filterType: WeclappFilterType.None,
      filterValue1: "",
      canViewCustomers: false,
      canViewQuotations: false,
      canViewSalesOrders: false,
      canViewInvoices: false,
    },
    onSubmit: async ({ value }) => {
      //wait 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(value);
      form.reset();
      setDialogOpen(false);
      toast.success("Access granted");
    },
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Grant company access</Button>
      </DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Grant Company Access</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="companyId">
            {(field) => (
              <CompanySelector
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              />
            )}
          </form.Field>

          <form.Field name="filterType">
            {(field) => (
              <div className="space-y-2">
                <Label>Filter Type</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value: WeclappFilterType) => {
                    field.handleChange(value);
                    if (value === WeclappFilterType.None) {
                      form.setFieldValue("filterValue1", "");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select filter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={WeclappFilterType.None}>None</SelectItem>
                    <SelectItem value={WeclappFilterType.Company}>
                      Company
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.values.filterType}>
            {(filterType) =>
              filterType === WeclappFilterType.Company ? (
                <form.Field name="filterValue1">
                  {(field) => (
                    <div className="space-y-2">
                      <Label>Weclapp Company</Label>
                      <WeclappCompanySelector
                        value={field.state.value}
                        onValueChange={(value: string) =>
                          field.handleChange(value)
                        }
                      />
                    </div>
                  )}
                </form.Field>
              ) : (
                <div className="text-sm text-muted-foreground">
                  The company will have access to the selected resources without
                  any filters.
                </div>
              )
            }
          </form.Subscribe>

          <WeclappPermissionsSelector form={form} />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter className="pt-4 border-t">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Granting..." : "Grant Access"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
