"use client";

// Import to register module augmentation FIRST
import "@/lib/next-auth-options";

import { ComposedOrganizationMembershipReadModel, OrganizationRole, organizationRoleOptions, Locale } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  AvatarFallback,
  Avatar,
  AvatarImage,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  baseOmninodeApiClient,
  getApiAuthentication,
} from "@repo/omninode-api-client";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import type { Session } from "next-auth";

interface ChangeRolePopupProps {
  show: boolean;
  user: ComposedOrganizationMembershipReadModel;
  onClose: () => void;
}

function getInitials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
  return initials || "U";
}

const isRoleValid = (value: OrganizationRole) => {
  if (!value) return "Role is required";
  if (!organizationRoleOptions(Locale.En).some(option => option.value === value)) return "Invalid role";
  return undefined;
};

export default function ChangeRolePopup({ show, user, onClose }: ChangeRolePopupProps) {
  const { organizationId } = useParams();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      role: user.role,
    },
    onSubmit: async ({ value }) => {
      if (!value.role) {
        toast.error("Please select a role");
        return;
      }

      await updateRoleMutation.mutateAsync({
        membershipId: user.id,
        role: value.role,
      });
    },
  });

  const updateRoleMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { membershipId: string; role: OrganizationRole };
    }) => {
      return await baseOmninodeApiClient().organizationMicroservice.updateOrganizationMembershipRole(
        {
          request: {
            pathParams: {
              id: variables.membershipId,
            },
            body: {
              role: variables.role,
            },
          },
          apiAuthentication: getApiAuthentication(session.access_token),
        }
      );
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      form.reset();
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["organizationUsers", organizationId],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update role");
    },
  });

  const roleOptions = organizationRoleOptions(Locale.En).filter(
    (option) => option.value !== OrganizationRole.Owner
  );

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>
            Update the role for this organization member.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage alt={`${user.user.firstName} ${user.user.lastName}`} />
              <AvatarFallback seed={user.user.id}>
                {getInitials(`${user.user.firstName} ${user.user.lastName}`.trim() || "Unknown User")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{`${user.user.firstName} ${user.user.lastName}`.trim() || "Unknown User"}</p>
              <p className="text-sm text-muted-foreground">
                {user.user.email}
              </p>
            </div>
          </div>
        </div>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
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
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Role"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
