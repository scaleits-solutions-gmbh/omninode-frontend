"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "frontend-common-kit/components";

import {
  getCompanyByIdQueryKey,
  invalidateCompaniesQueries,
  updateCompany,
} from "@/lib/api-client";
import { getCompanyById } from "@/lib/api-client/company/company";
import { FeCompany } from "@/types/fe/fe-company";
import {
  CompanyStatus,
  CompanyType,
  CountryCode,
  Currency,
  getCountryOptions,
  getCurrencyOptions,
  getIndustryOptions,
  Industry,
} from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CompanyDetailsLoading from "./company-details-loading";

export default function CompanyDetails() {
  const [mounted, setMounted] = useState(false);

  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: getCompanyByIdQueryKey(id as string),
    queryFn: () => getCompanyById(id as string),
    enabled: mounted && !!id, // Only run query after component is mounted and id exists
    retry: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <CompanyDetailsLoading />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-500">Error: {error.message}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <CompanyDetailsLoading />;
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>No Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div>No company data found</div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return <CompanyForm data={data} />;
}

function CompanyForm({ data }: { data: FeCompany }) {
  const industryOptions = getIndustryOptions();
  const countryOptions = getCountryOptions();
  const currencyOptions = getCurrencyOptions();

  const queryClient = useQueryClient();

  const updateCompanyMutation = useMutation({
    mutationFn: (company: Partial<FeCompany>) => updateCompany(company),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getCompanyByIdQueryKey(data.id),
      });
      invalidateCompaniesQueries(queryClient);
      toast.success("Company details saved successfully");
    },
    onError: (error) => {
      toast.error("Failed to save company details\n" + error.message);
    },
  });

  const form = useForm({
    defaultValues: data,
    onSubmit: async ({ value }) => {
      await updateCompanyMutation.mutateAsync(value);
    },
  });

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Section 1: General Information */}
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Section 2: Primary Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Section 3: Company Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Company Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <form.Field
              name="type"
              validators={{
                onSubmit: (field) => {
                  if (!field.value) {
                    return "Company type is required";
                  }
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
                  {!field.state.meta.isValid && (
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
                  {!field.state.meta.isValid && (
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
                      field.handleChange(value as Currency);
                    }}
                    onOpenChange={(open) => !open && field.handleBlur()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <div className="text-red-500 text-sm mt-1">
                      {field.state.meta.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSubmitting ? "Saving..." : "Save Company Details"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
