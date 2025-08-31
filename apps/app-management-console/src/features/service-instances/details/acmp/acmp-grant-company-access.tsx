"use client";

import AcmpGroupSelector from "./acmp-group-selector";
import AcmpPermissionsSelector from "./acmp-permissions-selector";
import AcmpTenantSelector from "./acmp-tenant-selector";
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
import { AcmpFilterType } from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import * as React from "react";
import { toast } from "sonner";

export default function AcmpGrantCompanyAccess() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const form = useForm({
    defaultValues: {
      companyId: "",
      acmpFilterType: undefined as AcmpFilterType | undefined,
      filterValue1: "",
      filterValue2: "",
      canViewDashboard: false,
      canViewClients: false,
      canViewClientCommands: false,
      canViewRollouts: false,
      canPushClientCommands: false,
      canPushRollouts: false,
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
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="acmpFilterType">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor={field.name}>ACMP Filter Type</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      field.handleChange(value as AcmpFilterType);
                      // Reset filter values when changing filter type
                      if (value === AcmpFilterType.None) {
                        form.setFieldValue("filterValue1", "");
                        form.setFieldValue("filterValue2", "");
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a filter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AcmpFilterType.None}>None</SelectItem>
                      <SelectItem value={AcmpFilterType.Tenant}>
                        Tenant
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </form.Field>
          </div>
          <form.Subscribe selector={(state) => state.values.acmpFilterType}>
            {(acmpFilterType) => (
              <>
                {acmpFilterType === AcmpFilterType.Tenant ? (
                  <div className="space-y-4">
                    <form.Field name="filterValue1">
                      {(field) => (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={field.name}>ACMP Tenant</Label>
                          <AcmpTenantSelector
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                          />
                        </div>
                      )}
                    </form.Field>
                    <form.Field name="filterValue2">
                      {(field) => (
                        <div className="flex flex-col gap-2">
                          <Label htmlFor={field.name}>ACMP Group</Label>
                          <AcmpGroupSelector
                            value={field.state.value}
                            onValueChange={(value) => field.handleChange(value)}
                          />
                        </div>
                      )}
                    </form.Field>
                  </div>
                ) : acmpFilterType === AcmpFilterType.None ? (
                  <div className="text-sm text-muted-foreground">
                    No additional filters will be applied. The company will have
                    access to all resources.
                  </div>
                ) : null}
              </>
            )}
          </form.Subscribe>
          <AcmpPermissionsSelector form={form} />

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
