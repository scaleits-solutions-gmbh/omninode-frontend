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
import { useForm } from "@tanstack/react-form";
import { useAuthedMutation, useAuthedQuery } from "@repo/pkg-frontend-common-kit/hooks";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
import { toast } from "sonner";
import { useEffect } from "react";
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


export default function OrganizationCoreInfoCardReactForm() {
  const { organizationId } = useParams();

  const { data, isLoading, error } = useAuthedQuery({
    queryKey: ["organization", organizationId],
    queryFn: async ({ session }) =>
      await baseOmninodeApiClient().organizationMicroservice.findOrganizationById({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: { pathParams: { id: organizationId as string } },
      }),
    enabled: Boolean(organizationId),
    staleTime: 60_000, // Consider data fresh for 60 seconds
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  const org = data?.body;

  const updateMutation = useAuthedMutation({
    mutationFn: async ({ session, variables }: { session: Session; variables: { name: string; countryCode: CountryCode; city: string; address: string; industry: Industry; currency: Currency; email?: string; phone?: string; taxId?: string } }) => {
      return await baseOmninodeApiClient().organizationMicroservice.updateOrganizationCoreInfo({
        apiAuthentication: getApiAuthentication(session.access_token),
        request: {
          pathParams: { id: organizationId as string },
          body: {
            name: variables.name,
            countryCode: variables.countryCode,
            city: variables.city,
            address: variables.address,
            industry: variables.industry,
            currency: variables.currency,
            email: variables.email || undefined,
            phone: variables.phone || undefined,
            taxId: variables.taxId || undefined,
          },
        },
      });
    },
    onMutate: () => toast.loading("Saving...", { id: "save-org" }),
    onError: (e: Error) => toast.error(e.message || "Failed to save", { id: "save-org" }),
    onSuccess: () => toast.success("Organization updated", { id: "save-org" }),
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
      // Guard required enum and text fields
      const hasEnums = Boolean(value.countryCode && value.industry && value.currency);
      const hasTexts = Boolean(value.name.trim() && value.city.trim() && value.address.trim());
      if (!hasEnums || !hasTexts) {
        toast.error("Please fill all required fields before saving");
        return;
      }

      await updateMutation.mutateAsync({
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
    },
  });

  // Populate form when org loads
  useEffect(() => {
    if (!org) return;
    form.reset({
      name: org.name ?? "",
      countryCode: (org.countryCode as CountryCode) ?? "",
      city: org.city ?? "",
      address: org.address ?? "",
      industry: (org.industry as Industry) ?? "",
      currency: (org.currency as Currency) ?? "",
      email: org.email ?? "",
      phone: org.phone ?? "",
      taxId: org.taxId ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [org]);

  const required = (label: string) => (value: string) =>
    value && value.toString().trim().length > 0 ? undefined : `${label} is required`;

  const optionalEmail = (value?: string) => {
    if (!value) return undefined;
    const trimmed = value.trim();
    if (trimmed.length === 0) return undefined;
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed) ? undefined : "Invalid email address";
  };

  const industryOpts = industryOptions(Locale.En);
  const currencyOpts = currencyOptions(Locale.En);
  const countryOpts = countryOptions(Locale.En);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Core information</CardTitle>
          <CardDescription>Basic information about your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label>Id</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Country</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Industry</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-20" />
        </CardFooter>
      </Card>
    );
  }

  if (error || !org) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Core information</CardTitle>
          <CardDescription>Failed to load organization</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Core information</CardTitle>
          <CardDescription>Basic information about your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="name" validators={{ onSubmit: ({ value }) => required("Name")(value) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>
            <div className="space-y-2">
              <Label htmlFor="id">Organization ID</Label>
              <Input id="id" name="id" value={org.id} readOnly disabled />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="countryCode" validators={{ onSubmit: ({ value }) => required("Country code")(value as unknown as string) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Country</Label>
                  <Select key={`country-${String(field.state.value || 'empty')}`} value={field.state.value ? String(field.state.value) : undefined} onValueChange={(val) => field.handleChange(val as CountryCode)} disabled={updateMutation.isPending}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOpts.map((opt) => (
                        <SelectItem key={String(opt.value)} value={String(opt.value)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="city" validators={{ onSubmit: ({ value }) => required("City")(value) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>City</Label>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="address" validators={{ onSubmit: ({ value }) => required("Address")(value) }}>
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Address</Label>
                <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                {!field.state.meta.isValid && (
                  <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                )}
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field name="industry" validators={{ onSubmit: ({ value }) => required("Industry")(value as unknown as string) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Industry</Label>
                  <Select key={`industry-${String(field.state.value || 'empty')}`} value={field.state.value ? String(field.state.value) : undefined} onValueChange={(val) => field.handleChange(val as Industry)} disabled={updateMutation.isPending}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOpts.map((opt) => (
                        <SelectItem key={String(opt.value)} value={String(opt.value)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="currency" validators={{ onSubmit: ({ value }) => required("Currency")(value as unknown as string) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Currency</Label>
                  <Select key={`currency-${String(field.state.value || 'empty')}`} value={field.state.value ? String(field.state.value) : undefined} onValueChange={(val) => field.handleChange(val as Currency)} disabled={updateMutation.isPending}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOpts.map((opt) => (
                        <SelectItem key={String(opt.value)} value={String(opt.value)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <form.Field name="email" validators={{ onSubmit: ({ value }) => optionalEmail(value) }}>
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact email (optional)</Label>
                  <Input id={field.name} name={field.name} type="email" value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                  {!field.state.meta.isValid && (
                    <em role="alert" className="text-sm text-red-500">{field.state.meta.errors.join(", ")}</em>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="phone">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Contact phone (optional)</Label>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
              )}
            </form.Field>

            <form.Field name="taxId">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tax ID (optional)</Label>
                  <Input id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} onChange={(e) => field.handleChange(e.target.value)} />
                </div>
              )}
            </form.Field>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}


