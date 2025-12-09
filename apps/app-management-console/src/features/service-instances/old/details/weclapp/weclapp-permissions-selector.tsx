/* Commented out - service-instances feature
import {
  ScrollArea,
  Checkbox,
  Label,
} from "@repo/pkg-frontend-common-kit/components";

interface WeclappPermissionsForm {
  canViewCustomers: boolean;
  canViewQuotations: boolean;
  canViewSalesOrders: boolean;
  canViewInvoices: boolean;
}

interface WeclappPermissionsSelectorProps {
  form: {
    Field: (props: {
      name: keyof WeclappPermissionsForm;
      children: (field: {
        name: string;
        state: { value: boolean };
        handleChange: (value: boolean) => void;
      }) => React.ReactNode;
    }) => React.ReactNode;
  };
}

export default function WeclappPermissionsSelector({
  form,
}: WeclappPermissionsSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Permissions</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          <form.Field name="canViewCustomers">
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
                  View Customers
                  <span className="text-xs text-muted-foreground">
                    Allow this organization to view customers.
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
    </div>
  );
}
*/
