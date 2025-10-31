"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import { OrganizationRole, organizationRoleOptions, Locale } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import type { Session } from "next-auth";

const isEmailValid = (value: string) => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";
  return undefined;
};

const isRoleValid = (value: OrganizationRole) => {
  if (!value) return "Role is required";
  //check if value is in organizationRoleOptions Values
  if (!organizationRoleOptions(Locale.En).some(option => option.value === value)) return "Invalid role";
  return undefined;
};

export default function NewUserInvitePopup() {
  const { organizationId } = useParams();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      role: OrganizationRole.Member,
    },
    onSubmit: async ({ value }) => {
      if (!value.email || !value.role) {
        toast.error("Please fill in all fields");
        return;
      }

      await sendInviteMutation.mutateAsync({
        email: value.email,
        role: value.role,
      });
    },
  });

  const sendInviteMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { email: string; role: OrganizationRole };
    }) => {
      return await baseOmninodeApiClient().organizationMicroservice.sendOrganizationMembershipInvite(
        {
          request: {
            pathParams: {
              id: organizationId as string,
            },
            body: {
              email: variables.email,
              role: variables.role,
              expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    onSuccess: () => {
      toast.success("Invite sent successfully");
      form.reset();
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["organizationUserInvites", organizationId],
      });
    },
    onError: () => {
      toast.error("Error sending invite");
    },
  });

  

  const roleOptions = organizationRoleOptions(Locale.En).filter(
    (option) => option.value !== OrganizationRole.Owner
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to invite. They will
            receive an invitation to join this organization.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            validators={{
              onSubmit: ({ value }) => isEmailValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="user@example.com"
                />
                {!field.state.meta.isValid &&
                  field.state.meta.errors.length > 0 && (
                    <div className="w-full flex justify-start">
                      <em
                        role="alert"
                        className="text-sm text-red-500 text-left"
                      >
                        {field.state.meta.errors.join(", ")}
                      </em>
                    </div>
                  )}
              </div>
            )}
          </form.Field>
          <form.Field
            name="role"
            validators={{
              onSubmit: ({ value }) => isRoleValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Role</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(val) => field.handleChange(val as OrganizationRole)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!field.state.meta.isValid &&
                  field.state.meta.errors.length > 0 && (
                    <div className="w-full flex justify-start">
                      <em
                        role="alert"
                        className="text-sm text-red-500 text-left"
                      >
                        {field.state.meta.errors.join(", ")}
                      </em>
                    </div>
                  )}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Invite"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}

