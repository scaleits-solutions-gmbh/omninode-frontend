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
import {
  useAuthedMutation,
  useAuthedQuery,
} from "@repo/pkg-frontend-common-kit/hooks";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Session } from "next-auth";
import {
  countryOptions,
  currencyOptions,
  industryOptions,
  Locale,
} from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { useParams } from "next/navigation";
import { Check, Copy } from "lucide-react";

export default function OrganizationCoreInfoCard() {
  const params = useParams();
  const organizationId = params?.organizationId as string;

  const { data, isLoading, error, refetch } = useAuthedQuery({
    queryKey: ["organization", organizationId],
    queryFn: async ({ session }) =>
      await baseOmninodeApiClient().organizationMicroservice.findOrganizationById(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            pathParams: { id: organizationId },
          },
        }
      ),
    enabled: Boolean(organizationId),
  });

  const org = data?.body;

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");
  const [currency, setCurrency] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [taxId, setTaxId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  useMemo(() => {
    if (!org) return;
    setName(org.name ?? "");
    setCountryCode(String(org.countryCode ?? ""));
    setCity(org.city ?? "");
    setAddress(org.address ?? "");
    setIndustry(String(org.industry ?? ""));
    setCurrency(String(org.currency ?? ""));
    setEmail(org.email ?? "");
    setPhone(org.phone ?? "");
    setTaxId(org.taxId ?? "");
  }, [org]);

  const isDirty = useMemo(() => {
    if (!org) return false;
    return (
      name !== (org.name ?? "") ||
      countryCode !== String(org.countryCode ?? "") ||
      city !== (org.city ?? "") ||
      address !== (org.address ?? "") ||
      industry !== String(org.industry ?? "") ||
      currency !== String(org.currency ?? "") ||
      email !== (org.email ?? "") ||
      phone !== (org.phone ?? "") ||
      taxId !== (org.taxId ?? "")
    );
  }, [
    org,
    name,
    countryCode,
    city,
    address,
    industry,
    currency,
    email,
    phone,
    taxId,
  ]);

  const updateMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: {
        name: string;
        countryCode: string;
        city: string;
        address: string;
        industry: string;
        currency: string;
        email?: string;
        phone?: string;
        taxId?: string;
      };
    }) => {
      return await baseOmninodeApiClient().organizationMicroservice.updateOrganizationCoreInfo(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            pathParams: { id: organizationId },
            body: {
              name: variables.name,
              countryCode: variables.countryCode as any,
              city: variables.city,
              address: variables.address,
              industry: variables.industry as any,
              currency: variables.currency as any,
              email: variables.email || undefined,
              phone: variables.phone || undefined,
              taxId: variables.taxId || undefined,
            },
          },
        }
      );
    },
    onMutate: () => toast.loading("Saving...", { id: "save-org" }),
    onError: (e: Error) =>
      toast.error(e.message || "Failed to save", { id: "save-org" }),
    onSuccess: () => {
      toast.success("Organization updated", { id: "save-org" });
      refetch();
    },
  });

  const industryOpts = industryOptions(Locale.En);
  const currencyOpts = currencyOptions(Locale.En);
  const countryOpts = countryOptions(Locale.En);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Core information</CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Contact email (optional)</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label>Contact phone (optional)</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label>Tax ID (optional)</Label>
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

  const handleSubmit = () => {
    if (!isDirty) return;
    updateMutation.mutate({
      name,
      countryCode,
      city,
      address,
      industry,
      currency,
      email,
      phone,
      taxId,
    });
  };

  const formId = "org-core-info-form";

  return (
    <form action={handleSubmit} id={formId}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Core information</CardTitle>
          <CardDescription>
            Basic information about your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">Organization ID</Label>
              <div className="relative">
                <Input
                  id="id"
                  name="id"
                  value={org.id}
                  readOnly
                  disabled
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(org.id);
                      setCopiedId(true);
                    } catch (e) {
                      toast.error("Failed to copy");
                    }
                  }}
                >
                  {copiedId ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy organization ID</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="countryCode">Country</Label>
              <Select
                value={countryCode}
                onValueChange={(val) => setCountryCode(val)}
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={industry}
                onValueChange={(val) => setIndustry(val)}
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(val) => setCurrency(val)}
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
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="email">Contact email (optional)</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Contact phone (optional)</Label>
              <Input
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID (optional)</Label>
              <Input
                id="taxId"
                name="taxId"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={!isDirty || updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
