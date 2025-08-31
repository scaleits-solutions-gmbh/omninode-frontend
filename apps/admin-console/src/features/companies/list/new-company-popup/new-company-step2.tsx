import {
  Button,
  DialogFooter,
  Input,
  Label,
  ScrollArea,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import { useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";

interface NewCompanyStep2Props {
  onNext: (Step2CompanyData: Step2CompanyData) => void;
  onBack: (Step2CompanyData: Step2CompanyData) => void;
  Step2CompanyData: Step2CompanyData;
}

export type Step2CompanyData = {
  primaryContactFirstName: string;
  primaryContactLastName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
};

export default function NewCompanyStep2({
  onNext,
  onBack,
  Step2CompanyData,
}: NewCompanyStep2Props) {
  const form = useForm({
    defaultValues: {
      primaryContactFirstName: Step2CompanyData.primaryContactFirstName,
      primaryContactLastName: Step2CompanyData.primaryContactLastName,
      primaryContactEmail: Step2CompanyData.primaryContactEmail,
      primaryContactPhone: Step2CompanyData.primaryContactPhone,
    },
    onSubmit: async ({ value }) => {
      onNext(value as Step2CompanyData);
    },
  });

  const handleBack = () => {
    onBack(form.state.values as Step2CompanyData);
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
        {" "}
        <ScrollArea className="overflow-y-auto h-[300px] sm:h-auto">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <form.Field
              name="primaryContactFirstName"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "First name is required";
                  }
                  if (field.value.length < 2) {
                    return "First name must be at least 2 characters long";
                  }
                  if (field.value.length > 50) {
                    return "First name must be less than 50 characters";
                  }
                  // Name validation - only letters, spaces, hyphens, and apostrophes
                  if (!/^[a-zA-Z\s\-']+$/.test(field.value)) {
                    return "First name can only contain letters, spaces, hyphens, and apostrophes";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    maxLength={50}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="primaryContactLastName"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Last name is required";
                  }
                  if (field.value.length < 2) {
                    return "Last name must be at least 2 characters long";
                  }
                  if (field.value.length > 50) {
                    return "Last name must be less than 50 characters";
                  }
                  // Name validation - only letters, spaces, hyphens, and apostrophes
                  if (!/^[a-zA-Z\s\-']+$/.test(field.value)) {
                    return "Last name can only contain letters, spaces, hyphens, and apostrophes";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    maxLength={50}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="primaryContactEmail"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Email is required";
                  }
                  // Email validation regex
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(field.value)) {
                    return "Please enter a valid email address";
                  }
                  if (field.value.length > 254) {
                    return "Email address is too long";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value.toLowerCase())
                    }
                    onBlur={field.handleBlur}
                    maxLength={254}
                  />
                  {field.state.meta.errors && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field
              name="primaryContactPhone"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Phone number is required";
                  }
                  // Phone validation - allows digits, spaces, hyphens, parentheses, and plus sign
                  const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
                  if (!phoneRegex.test(field.value.replace(/\s/g, ""))) {
                    return "Please enter a valid phone number";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
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
            <form.Subscribe selector={(state) => [state.canSubmit]}>
              {([canSubmit]) => (
                <Button type="submit" disabled={!canSubmit}>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </form.Subscribe>
          </div>
        </DialogFooter>
      </form>
    </>
  );
}
