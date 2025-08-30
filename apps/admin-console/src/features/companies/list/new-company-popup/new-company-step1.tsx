import {
  Button,
  DialogFooter,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "frontend-common-kit/components";
import {
  CountryCode,
  getCountryOptions,
  getIndustryOptions,
  Industry,
} from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { ArrowRight } from "lucide-react";

interface NewCompanyStep1Props {
  onNext: (Step1CompanyData: Step1CompanyData) => void;
  Step1CompanyData: Step1CompanyData;
}

export type Step1CompanyData = {
  name: string;
  taxId: string;
  industry: Industry;
  email: string;
  phone: string;
  countryCode: CountryCode;
  city: string;
  address: string;
};

export default function NewCompanyStep1({
  onNext,
  Step1CompanyData,
}: NewCompanyStep1Props) {
  const industryOptions = getIndustryOptions();
  const countryOptions = getCountryOptions();
  const form = useForm({
    defaultValues: {
      name: Step1CompanyData.name,
      taxId: Step1CompanyData.taxId,
      industry: Step1CompanyData.industry,
      email: Step1CompanyData.email,
      phone: Step1CompanyData.phone,
      countryCode: Step1CompanyData.countryCode,
      city: Step1CompanyData.city,
      address: Step1CompanyData.address,
    },
    onSubmit: async ({ value }) => {
      onNext(value as Step1CompanyData);
    },
  });

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
              name="name"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Company name is required";
                  }
                  if (field.value.length < 2) {
                    return "Company name must be at least 2 characters long";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Company Name</Label>
                  <Input
                    type="text"
                    placeholder="Company Name"
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
            <form.Field
              name="taxId"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Tax ID is required";
                  }
                  if (field.value.length < 5) {
                    return "Tax ID must be at least 5 characters long";
                  }
                  // Basic alphanumeric validation
                  if (!/^[a-zA-Z0-9-]+$/.test(field.value)) {
                    return "Tax ID can only contain letters, numbers, and hyphens";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tax ID</Label>
                  <Input
                    type="text"
                    placeholder="Tax ID"
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
            <form.Field
              name="industry"
              validators={{
                onSubmit: (field) => {
                  if (!field.value || field.value.length === 0) {
                    return "Industry is required";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Industry</Label>
                  <Select
                    value={field.state.value || ""}
                    onValueChange={(value) => {
                      field.handleChange(value as Industry);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
            <form.Field
              name="email"
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

            <form.Field
              name="phone"
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
            <form.Field
              name="countryCode"
              validators={{
                onSubmit: (field) => {
                  if (!field.value || field.value.length === 0) {
                    return "Country is required";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Country</Label>
                  <Select
                    value={field.state.value || ""}
                    onValueChange={(value) => {
                      field.handleChange(value as CountryCode);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
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
            <form.Field
              name="city"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "City is required";
                  }
                  if (field.value.length < 2) {
                    return "City name must be at least 2 characters long";
                  }
                  // City name validation - letters, spaces, hyphens, apostrophes
                  if (!/^[a-zA-Z\s\-'\.]+$/.test(field.value)) {
                    return "City name can only contain letters, spaces, hyphens, and apostrophes";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>City</Label>
                  <Input
                    type="text"
                    placeholder="City"
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
            <form.Field
              name="address"
              validators={{
                onSubmit: (field) => {
                  if (field.value.length === 0) {
                    return "Address is required";
                  }
                  if (field.value.length < 5) {
                    return "Address must be at least 5 characters long";
                  }
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Address</Label>
                  <Input
                    type="text"
                    placeholder="Address"
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
        <DialogFooter className="pt-6 border-t">
          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </form.Subscribe>
        </DialogFooter>
      </form>
    </>
  );
}
