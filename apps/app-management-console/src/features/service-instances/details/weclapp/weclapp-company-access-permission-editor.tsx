/* Commented out - service-instances feature
import { FeWeclappServiceInstanceOrganizationWithAccess } from "@/types/fe/fe-service-instance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Checkbox,
  Label,
  ScrollArea,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WeclappOrganizationAccessPermissionEditorProps {
  FeWeclappServiceInstanceOrganizationWithAccess?: FeWeclappServiceInstanceOrganizationWithAccess;
  onClose: () => void;
}

export default function WeclappOrganizationAccessPermissionEditor({
  FeWeclappServiceInstanceOrganizationWithAccess,
  onClose,
}: WeclappOrganizationAccessPermissionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (FeWeclappServiceInstanceOrganizationWithAccess) {
      setIsOpen(true);
    }
  }, [FeWeclappServiceInstanceOrganizationWithAccess]);

  const form = useForm({
    defaultValues: {
      canViewDashboard:
        FeWeclappServiceInstanceOrganizationWithAccess?.canViewDashboard,
      canViewQuotations:
        FeWeclappServiceInstanceOrganizationWithAccess?.canViewQuotations,
      canViewSalesOrders:
        FeWeclappServiceInstanceOrganizationWithAccess?.canViewSalesOrders,
      canViewInvoices:
        FeWeclappServiceInstanceOrganizationWithAccess?.canViewInvoices,
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
          <DialogTitle>Organization Access Permission Editor</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <ScrollArea className="py-4 h-[300px]">
            <div className="space-y-4">
              <form.Field name="canViewDashboard">
                {(field) => (
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked as boolean);
                      }}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={field.name}
                      className="cursor-pointer flex flex-col items-start"
                    >
                      View Dashboard
                      <span className="text-xs text-muted-foreground">
                        Allow this organization to view the dashboard.
                      </span>
                    </Label>
                  </div>
                )}
              </form.Field>

              <form.Field name="canViewQuotations">
                {(field) => (
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked as boolean);
                      }}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={field.name}
                      className="cursor-pointer flex flex-col items-start"
                    >
                      View Quotations
                      <span className="text-xs text-muted-foreground">
                        Allow this organization to view quotations.
                      </span>
                    </Label>
                  </div>
                )}
              </form.Field>

              <form.Field name="canViewSalesOrders">
                {(field) => (
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked as boolean);
                      }}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={field.name}
                      className="cursor-pointer flex flex-col items-start"
                    >
                      View Sales Orders
                      <span className="text-xs text-muted-foreground">
                        Allow this organization to view sales orders.
                      </span>
                    </Label>
                  </div>
                )}
              </form.Field>

              <form.Field name="canViewInvoices">
                {(field) => (
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked as boolean);
                      }}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={field.name}
                      className="cursor-pointer flex flex-col items-start"
                    >
                      View Invoices
                      <span className="text-xs text-muted-foreground">
                        Allow this organization to view invoices.
                      </span>
                    </Label>
                  </div>
                )}
              </form.Field>
            </div>
          </ScrollArea>
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
*/
