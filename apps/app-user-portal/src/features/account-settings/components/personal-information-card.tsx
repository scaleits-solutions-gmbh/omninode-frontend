"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Skeleton,
  CardFooter,
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
import { useEffect, useState } from "react";
import { Session } from "next-auth";

export default function PersonalInformationCard() {
  const {
    data: userData,
    isLoading,
    error,
    refetch,
  } = useAuthedQuery({
    queryKey: ["me"],
    queryFn: async ({ session }) =>
      await baseOmninodeApiClient().userMicroservice.findCurrentUser({
        apiAuthentication: getApiAuthentication(session.access_token),
      }),
  });

  const user = userData?.body;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
    }
  }, [user]);

  const isDirty =
    firstName !== (user?.firstName ?? "") || lastName !== (user?.lastName ?? "");

  const updateMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { firstName: string; lastName: string };
    }) => {
      return await baseOmninodeApiClient().userMicroservice.updateCurrentUser(
        {
          apiAuthentication: getApiAuthentication(session.access_token),
          request: {
            body: {
              firstName: variables.firstName,
              lastName: variables.lastName,
            },
          },
        }
      );
    },
    onMutate: () => toast.loading("Saving...", { id: "save-profile" }),
    onError: (e: Error) =>
      toast.error(e.message || "Failed to save", { id: "save-profile" }),
    onSuccess: () => {
      toast.success("Personal information updated", { id: "save-profile" });
      refetch();
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>
            Update your name and view your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-16" />
        </CardFooter>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>Failed to load profile</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formId = "personal-info-form";

  const handleSubmit = () => {
    if (!isDirty) return;
    updateMutation.mutate({ firstName, lastName });
  };

  return (
    <form action={handleSubmit} id={formId}>
      <Card>
        <CardHeader>
          <CardTitle>Personal information</CardTitle>
          <CardDescription>
            Update your name and view your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={user.email}
              readOnly
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
