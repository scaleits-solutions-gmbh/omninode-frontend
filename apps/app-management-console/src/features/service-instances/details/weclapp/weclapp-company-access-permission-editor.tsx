import { FeWeclappServiceInstanceCompanyWithAccess } from "@/types/fe/fe-service-instance";
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
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WeclappCompanyAccessPermissionEditorProps {
  FeWeclappServiceInstanceCompanyWithAccess?: FeWeclappServiceInstanceCompanyWithAccess;
  onClose: () => void;
}

export default function WeclappCompanyAccessPermissionEditor({
  FeWeclappServiceInstanceCompanyWithAccess,
  onClose,
}: WeclappCompanyAccessPermissionEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (FeWeclappServiceInstanceCompanyWithAccess) {
      setIsOpen(true);
    }
  }, [FeWeclappServiceInstanceCompanyWithAccess]);

  const form = useForm({
    defaultValues: {
      canViewDashboard:
        FeWeclappServiceInstanceCompanyWithAccess?.canViewDashboard,
      canViewQuotations:
        FeWeclappServiceInstanceCompanyWithAccess?.canViewQuotations,
      canViewSalesOrders:
        FeWeclappServiceInstanceCompanyWithAccess?.canViewSalesOrders,
      canViewInvoices:
        FeWeclappServiceInstanceCompanyWithAccess?.canViewInvoices,
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
                        Allow this company to view the dashboard.
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
                        Allow this company to view quotations.
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
                        Allow this company to view sales orders.
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
                        Allow this company to view invoices.
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
