import AcmpGroupSelector from "./acmp-group-selector";
import AcmpPermissionsSelector from "./acmp-permissions-selector";
import AcmpTenantSelector from "./acmp-tenant-selector";
import { FeAcmpServiceInstanceCompanyWithAccess } from "@/types/fe/fe-service-instance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "frontend-common-kit";
import { AcmpFilterType } from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AcmpCompanyAccessPermissionEditorProps {
  FeAcmpServiceInstanceCompanyWithAccess?: FeAcmpServiceInstanceCompanyWithAccess;
  onClose: () => void;
}

export default function AcmpCompanyAccessPermissionEditor({
  FeAcmpServiceInstanceCompanyWithAccess,
  onClose,
}: AcmpCompanyAccessPermissionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (FeAcmpServiceInstanceCompanyWithAccess) {
      setIsOpen(true);
    }
  }, [FeAcmpServiceInstanceCompanyWithAccess]);

  const form = useForm({
    defaultValues: {
      acmpFilterType: FeAcmpServiceInstanceCompanyWithAccess?.acmpFilterType,
      filterValue1:
        FeAcmpServiceInstanceCompanyWithAccess?.acmpFilterValue1 || "",
      filterValue2:
        FeAcmpServiceInstanceCompanyWithAccess?.acmpFilterValue2 || "",
      canViewDashboard:
        FeAcmpServiceInstanceCompanyWithAccess?.canViewDashboard,
      canViewClients: FeAcmpServiceInstanceCompanyWithAccess?.canViewClients,
      canViewClientCommands:
        FeAcmpServiceInstanceCompanyWithAccess?.canViewClientCommands,
      canViewRollouts: FeAcmpServiceInstanceCompanyWithAccess?.canViewRollouts,
      canPushClientCommands:
        FeAcmpServiceInstanceCompanyWithAccess?.canPushClientCommands,
      canPushRollouts: FeAcmpServiceInstanceCompanyWithAccess?.canPushRollouts,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast.success("Permissions saved");
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Company Access Permission Editor</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4 pb-4">
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
                              onValueChange={(value) =>
                                field.handleChange(value)
                              }
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
                              onValueChange={(value) =>
                                field.handleChange(value)
                              }
                            />
                          </div>
                        )}
                      </form.Field>
                    </div>
                  ) : acmpFilterType === AcmpFilterType.None ? (
                    <div className="text-sm text-muted-foreground">
                      No additional filters will be applied. The company will
                      have access to all resources.
                    </div>
                  ) : null}
                </>
              )}
            </form.Subscribe>
            <AcmpPermissionsSelector form={form} />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter className="pt-4 border-t">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
