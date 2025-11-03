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
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { toast } from "sonner";
import {
  currencyOptions,
  industryOptions,
  OrganizationType,
  countryOptions,
  Locale,
  Industry,
  Currency,
  CountryCode,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

type CreateOrganizationFormValues = {
  name: string;
  countryCode: CountryCode; // CountryCode
  city: string;
  address: string;
  industry: Industry; // Industry
  currency: Currency; // Currency
  email?: string;
  phone?: string;
  taxId?: string;
};

export default function OrganizationDetailsForm() {
  const router = useRouter();
  
  const createOrganizationMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: CreateOrganizationFormValues;
    }) => {
      return await baseOmninodeApiClient().organizationMicroservice.createOrganization(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            body: {
              name: variables.name,
              countryCode: variables.countryCode,
              city: variables.city,
              address: variables.address,
              industry: variables.industry,
              currency: variables.currency,
              type: OrganizationType.Customer,
              email: variables.email || undefined,
              phone: variables.phone || undefined,
              taxId: variables.taxId || undefined,
            },
          },
        }
      );
    },
    onMutate: () =>
      toast.loading("Creating organization...", { id: "create-org" }),
    onError: (e: Error) =>
      toast.error(e.message || "Failed to create organization", {
        id: "create-org",
      }),
    onSuccess: (response) => {
      toast.success("Organization created", { id: "create-org" });
      const organizationId = response.body.id;
      if (organizationId) {
        router.push(`/${organizationId}/dashboard`);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      countryCode: "",
      city: "",
      address: "",
      industry: "",
      currency: "",
      email: "",
      phone: "",
      taxId: "",
    },
    onSubmit: async ({ value }) => {
      await createOrganizationMutation.mutateAsync({
        name: value.name,
        countryCode: value.countryCode as CountryCode,
        city: value.city,
        address: value.address,
        industry: value.industry as Industry,
        currency: value.currency as Currency,
        email: value.email,
        phone: value.phone,
        taxId: value.taxId,
      });
      form.reset();
    },
  });

  const required = (label: string) => (value: string) =>
    value && value.toString().trim().length > 0
      ? undefined
      : `${label} is required`;

  const optionalEmail = (value?: string) => {
    if (!value) return undefined;
    const trimmed = value.trim();
    if (trimmed.length === 0) return undefined;
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)
      ? undefined
      : "Invalid email address";
  };

  const industryOpts = industryOptions(Locale.En);
  const currencyOpts = currencyOptions(Locale.En);
  const countryOpts = countryOptions(Locale.En);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Organization details</CardTitle>
          <CardDescription>
            Basic information about the organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <form.Field
              name="name"
              validators={{ onSubmit: ({ value }) => required("Name")(value) }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Acme Inc."
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field
              name="countryCode"
              validators={{
                onSubmit: ({ value }) => required("Country code")(value),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Country</Label>
                  <Select
                    value={String(field.state.value)}
                    onValueChange={(val) => field.handleChange(val)}
                    disabled={createOrganizationMutation.isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOpts.map((opt) => (
                        <SelectItem
                          key={String(opt.value)}
                          value={String(opt.value)}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="city"
              validators={{ onSubmit: ({ value }) => required("City")(value) }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>City</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Berlin"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="space-y-2">
            <form.Field
              name="address"
              validators={{
                onSubmit: ({ value }) => required("Address")(value),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Address</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Street, number, postal code"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field
              name="industry"
              validators={{
                onSubmit: ({ value }) => required("Industry")(value),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Industry</Label>
                  <Select
                    value={String(field.state.value)}
                    onValueChange={(val) => field.handleChange(val)}
                    disabled={createOrganizationMutation.isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOpts.map((opt) => (
                        <SelectItem
                          key={String(opt.value)}
                          value={String(opt.value)}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="currency"
              validators={{
                onSubmit: ({ value }) => required("Currency")(value),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Currency</Label>
                  <Select
                    value={String(field.state.value)}
                    onValueChange={(val) => field.handleChange(val)}
                    disabled={createOrganizationMutation.isPending}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOpts.map((opt) => (
                        <SelectItem
                          key={String(opt.value)}
                          value={String(opt.value)}
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <form.Field
              name="email"
              validators={{ onSubmit: ({ value }) => optionalEmail(value) }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact email (optional)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="name@organization.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="phone">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact phone (optional)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="+49 30 123456"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="taxId">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tax ID (optional)</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="DE123456789"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={createOrganizationMutation.isPending}>
            {createOrganizationMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
