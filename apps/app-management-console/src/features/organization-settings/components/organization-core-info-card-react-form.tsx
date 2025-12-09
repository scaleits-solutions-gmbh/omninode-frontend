"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import { useAuthedMutation, useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { toast } from "sonner";
import { type ReactNode } from "react";
import { Session } from "next-auth";
import {
  countryOptions,
  currencyOptions,
  industryOptions,
  Locale,
  Industry,
  Currency,
  CountryCode,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useParams } from "next/navigation";

// =============================================================================
// Types
// =============================================================================

type FormValues = {
  name: string;
  countryCode: string;
  city: string;
  address: string;
  industry: string;
  currency: string;
  email: string;
  phone: string;
  taxId: string;
};

type SelectOption = { value: string | number; label: string };

// =============================================================================
// Validators
// =============================================================================

const validators = {
  required: (label: string) => (value: string) =>
    value?.toString().trim().length > 0 ? undefined : `${label} is required`,

  optionalEmail: (value?: string) => {
    if (!value?.trim()) return undefined;
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.trim())
      ? undefined
      : "Invalid email address";
  },
};

// =============================================================================
// Field Components
// =============================================================================

function FieldError({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return (
    <em role="alert" className="text-sm text-red-500">
      {errors.join(", ")}
    </em>
  );
}

function TextField({
  field,
  label,
  type = "text",
}: {
  field: AnyFieldApi;
  label: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {!field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
}

function SelectField({
  field,
  label,
  placeholder,
  options,
  disabled,
}: {
  field: AnyFieldApi;
  label: string;
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        key={`${field.name}-${String(field.state.value || "empty")}`}
        value={field.state.value ? String(field.state.value) : undefined}
        onValueChange={(val) => field.handleChange(val)}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!field.state.meta.isValid && <FieldError errors={field.state.meta.errors} />}
    </div>
  );
}

// =============================================================================
// Layout Components
// =============================================================================

function FormCard({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Core information</CardTitle>
        <CardDescription>Basic information about your organization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

function FieldRow({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 2 | 3;
}) {
  const gridClass = cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return <div className={`grid grid-cols-1 gap-4 ${gridClass}`}>{children}</div>;
}

function SkeletonField({ label, withMargin }: { label: string; withMargin?: boolean }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Skeleton className={`h-9 w-full${withMargin ? " mb-2" : ""}`} />
    </div>
  );
}

// =============================================================================
// Loading & Error States
// =============================================================================

function LoadingSkeleton() {
  return (
    <FormCard footer={<Skeleton className="h-9 w-16" />}>
      <FieldRow>
        <SkeletonField label="Name" />
        <SkeletonField label="Organization ID" />
      </FieldRow>
      <FieldRow>
        <SkeletonField label="Country" withMargin />
        <SkeletonField label="City" />
      </FieldRow>
      <SkeletonField label="Address" />
      <FieldRow>
        <SkeletonField label="Industry" withMargin />
        <SkeletonField label="Currency" withMargin />
      </FieldRow>
      <FieldRow cols={3}>
        <SkeletonField label="Contact email (optional)" />
        <SkeletonField label="Contact phone (optional)" />
        <SkeletonField label="Tax ID (optional)" />
      </FieldRow>
    </FormCard>
  );
}

function ErrorState() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Core information</CardTitle>
        <CardDescription>Failed to load organization</CardDescription>
      </CardHeader>
    </Card>
  );
}

// =============================================================================
// Hooks
// =============================================================================

function useOrganizationQuery(organizationId: string | string[] | undefined) {
  return useAuthedQuery({
    queryKey: ["organization", organizationId],
    queryFn: async ({ session }) => {
      const response = await getOrganizationClient(session).findOrganizationById({
        pathParams: { id: organizationId as string },
      });
      return response.data;
    },
    enabled: Boolean(organizationId),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

function useUpdateOrganizationMutation(organizationId: string | string[] | undefined) {
  return useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: Omit<FormValues, "email" | "phone" | "taxId"> & {
        email?: string;
        phone?: string;
        taxId?: string;
      };
    }) => {
      const response = await getOrganizationClient(session).updateOrganizationCoreInfo({
        pathParams: { id: organizationId as string },
        body: {
          name: variables.name,
          countryCode: variables.countryCode as CountryCode,
          city: variables.city,
          address: variables.address,
          industry: variables.industry as Industry,
          currency: variables.currency as Currency,
          email: variables.email || undefined,
          phone: variables.phone || undefined,
          taxId: variables.taxId || undefined,
        },
      });
      return response.data;
    },
    onMutate: () => toast.loading("Saving...", { id: "save-org" }),
    onError: (e: Error) => toast.error(e.message || "Failed to save", { id: "save-org" }),
    onSuccess: () => toast.success("Organization updated", { id: "save-org" }),
  });
}

// =============================================================================
// Options (memoized at module level)
// =============================================================================

const industryOpts = industryOptions(Locale.En);
const currencyOpts = currencyOptions(Locale.En);
const countryOpts = countryOptions(Locale.En);

// =============================================================================
// Main Component (Data Fetching Layer)
// =============================================================================

export default function OrganizationCoreInfoCardReactForm() {
  const { organizationId } = useParams();
  const { data: org, isLoading, error } = useOrganizationQuery(organizationId);

  if (isLoading) return <LoadingSkeleton />;
  if (error || !org) return <ErrorState />;

  // Key forces form to remount with fresh data when org changes
  return <OrganizationForm key={org.id} org={org} organizationId={organizationId} />;
}

// =============================================================================
// Form Component (only mounts when data is available)
// =============================================================================

type OrganizationData = NonNullable<ReturnType<typeof useOrganizationQuery>["data"]>;

function OrganizationForm({
  org,
  organizationId,
}: {
  org: OrganizationData;
  organizationId: string | string[] | undefined;
}) {
  const updateMutation = useUpdateOrganizationMutation(organizationId);

  // Form initializes with server data (org is guaranteed to exist here)
  const form = useForm({
    defaultValues: {
      name: org.name ?? "",
      countryCode: (org.countryCode as string) ?? "",
      city: org.city ?? "",
      address: org.address ?? "",
      industry: (org.industry as string) ?? "",
      currency: (org.currency as string) ?? "",
      email: org.email ?? "",
      phone: org.phone ?? "",
      taxId: org.taxId ?? "",
    },
    onSubmit: async ({ value }) => {
      const hasEnums = Boolean(value.countryCode && value.industry && value.currency);
      const hasTexts = Boolean(value.name.trim() && value.city.trim() && value.address.trim());

      if (!hasEnums || !hasTexts) {
        toast.error("Please fill all required fields before saving");
        return;
      }

      await updateMutation.mutateAsync({
        name: value.name,
        countryCode: value.countryCode,
        city: value.city,
        address: value.address,
        industry: value.industry,
        currency: value.currency,
        email: value.email || undefined,
        phone: value.phone || undefined,
        taxId: value.taxId || undefined,
      });
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FormCard
        footer={
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        }
      >
        {/* Name & Organization ID */}
        <FieldRow>
          <form.Field
            name="name"
            validators={{ onSubmit: ({ value }) => validators.required("Name")(value) }}
          >
            {(field) => <TextField field={field} label="Name" />}
          </form.Field>
          <div className="space-y-2">
            <Label htmlFor="id">Organization ID</Label>
            <Input id="id" name="id" value={org.id} readOnly disabled />
          </div>
        </FieldRow>

        {/* Country & City */}
        <FieldRow>
          <form.Field
            name="countryCode"
            validators={{ onSubmit: ({ value }) => validators.required("Country code")(value) }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Country"
                placeholder="Select country"
                options={countryOpts}
                disabled={updateMutation.isPending}
              />
            )}
          </form.Field>
          <form.Field
            name="city"
            validators={{ onSubmit: ({ value }) => validators.required("City")(value) }}
          >
            {(field) => <TextField field={field} label="City" />}
          </form.Field>
        </FieldRow>

        {/* Address */}
        <form.Field
          name="address"
          validators={{ onSubmit: ({ value }) => validators.required("Address")(value) }}
        >
          {(field) => <TextField field={field} label="Address" />}
        </form.Field>

        {/* Industry & Currency */}
        <FieldRow>
          <form.Field
            name="industry"
            validators={{ onSubmit: ({ value }) => validators.required("Industry")(value) }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Industry"
                placeholder="Select industry"
                options={industryOpts}
                disabled={updateMutation.isPending}
              />
            )}
          </form.Field>
          <form.Field
            name="currency"
            validators={{ onSubmit: ({ value }) => validators.required("Currency")(value) }}
          >
            {(field) => (
              <SelectField
                field={field}
                label="Currency"
                placeholder="Select currency"
                options={currencyOpts}
                disabled={updateMutation.isPending}
              />
            )}
          </form.Field>
        </FieldRow>

        {/* Optional Contact Fields */}
        <FieldRow cols={3}>
          <form.Field
            name="email"
            validators={{ onSubmit: ({ value }) => validators.optionalEmail(value) }}
          >
            {(field) => <TextField field={field} label="Contact email (optional)" type="email" />}
          </form.Field>
          <form.Field name="phone">
            {(field) => <TextField field={field} label="Contact phone (optional)" />}
          </form.Field>
          <form.Field name="taxId">
            {(field) => <TextField field={field} label="Tax ID (optional)" />}
          </form.Field>
        </FieldRow>
      </FormCard>
    </form>
  );
}
