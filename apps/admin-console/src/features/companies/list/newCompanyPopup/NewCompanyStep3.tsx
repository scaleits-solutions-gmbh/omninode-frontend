import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { Plus, Loader2 } from "lucide-react";
import {
  CompanyType,
  CompanyStatus,
  Currency,
  getCurrencyOptions,
} from "@scaleits-solutions-gmbh/services";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NewCompanyStep3Props {
  OnCreateCompany: (Step3CompanyData: Step3CompanyData) => Promise<void>;
  onBack: (Step3CompanyData: Step3CompanyData) => void;
  Step3CompanyData: Step3CompanyData;
}

export type Step3CompanyData = {
  type?: CompanyType;
  status?: CompanyStatus;
  currency?: Currency;
};

export default function NewCompanyStep3({
  OnCreateCompany,
  onBack,
  Step3CompanyData,
}: NewCompanyStep3Props) {
  console.log("Step3CompanyData received:", Step3CompanyData);

  const form = useForm({
    defaultValues: {
      type: Step3CompanyData.type,
      status: Step3CompanyData.status,
      currency: Step3CompanyData.currency,
    },
    onSubmit: async ({ value }) => {
      await OnCreateCompany(value as Step3CompanyData);
    },
  });

  console.log("Form state:", form.state.values);

  const handleBack = () => {
    onBack(form.state.values as Step3CompanyData);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <ScrollArea className="overflow-y-auto h-[300px] sm:h-auto">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <form.Field
              name="type"
              validators={{
                onSubmit: (field) => {
                  if (!field.value) {
                    return "Company type is required";
                  }
                  // Validate that the value is a valid CompanyType enum value
                  if (!Object.values(CompanyType).includes(field.value)) {
                    return "Please select a valid company type";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Company Type</Label>
                  <Select
                    value={field.state.value || ""}
                    onValueChange={(value) => {
                      console.log("Company type selected:", value);
                      field.handleChange(value as CompanyType);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CompanyType.CUSTOMER}>
                        Customer
                      </SelectItem>
                      <SelectItem value={CompanyType.PROVIDER}>
                        Provider
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="status"
              validators={{
                onSubmit: (field) => {
                  if (!field.value) {
                    return "Company status is required";
                  }
                  // Validate that the value is a valid CompanyStatus enum value
                  if (!Object.values(CompanyStatus).includes(field.value)) {
                    return "Please select a valid company status";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Company Status</Label>
                  <Select
                    value={field.state.value || ""}
                    onValueChange={(value) => {
                      console.log("Company status selected:", value);
                      field.handleChange(value as CompanyStatus);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CompanyStatus.ACTIVE}>
                        Active
                      </SelectItem>
                      <SelectItem value={CompanyStatus.INACTIVE}>
                        Inactive
                      </SelectItem>
                      <SelectItem value={CompanyStatus.PENDING}>
                        Pending
                      </SelectItem>
                      <SelectItem value={CompanyStatus.SUSPENDED}>
                        Suspended
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="currency"
              validators={{
                onSubmit: (field) => {
                  if (!field.value) {
                    return "Currency is required";
                  }
                  // Validate that the value is a valid Currency enum value
                  if (!Object.values(Currency).includes(field.value)) {
                    return "Please select a valid currency";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Currency</Label>
                  <Select
                    value={field.state.value || ""}
                    onValueChange={(value) => {
                      console.log("Currency selected:", value);
                      field.handleChange(value as Currency);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {getCurrencyOptions().map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </div>
        </ScrollArea>

        <DialogFooter className="col-span-2 pt-6 border-t">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Creating..." : "Create Company"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </DialogFooter>
      </form>
    </>
  );
}
