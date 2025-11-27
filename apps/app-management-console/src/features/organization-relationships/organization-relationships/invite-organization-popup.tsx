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
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { getOrganizationClient } from "@repo/pkg-frontend-common-kit/utils";
import { useAuthedMutation } from "@repo/pkg-frontend-common-kit/hooks";
import type { Session } from "next-auth";

interface InviteOrganizationPopupProps {
  currentOrganizationId: string;
}

export default function InviteOrganizationPopup({ currentOrganizationId }: InviteOrganizationPopupProps) {
  const { organizationId } = useParams();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      organizationId: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.organizationId) {
        toast.error("Please fill in all fields");
        return;
      }

      if (value.organizationId === currentOrganizationId) {
        toast.error("You cannot add own org as a relationship");
        return;
      }

      await sendInviteMutation.mutateAsync({
        organizationId: value.organizationId,
      });
    },
  });

  const sendInviteMutation = useAuthedMutation({
    mutationFn: async ({
      session,
      variables,
    }: {
      session: Session;
      variables: { organizationId: string };
    }) => {
      const response = await getOrganizationClient(session).sendOrganizationRelationshipInvite({
        body: {
          inviterOrganizationId: currentOrganizationId,
          targetOrganizationId: variables.organizationId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Invite sent successfully");
      form.reset();
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["platformOrganizationRelationshipInvites", organizationId],
      });
      // Ensure notifications widget refreshes actionable invites count
      queryClient.invalidateQueries({
        queryKey: ["current-user-relationship-invites"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error sending invite");
    },
  });

  const isOrganizationValid = (value: string) => {
    if (!value) return "Organization is required";
    return undefined;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Invite Organization</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Organization</DialogTitle>
          <DialogDescription>
            Enter the email address of the organization you want to invite. They will
            receive an invitation to join.
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
            name="organizationId"
            validators={{
              onSubmit: ({ value }) => isOrganizationValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Organization ID</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="a1a1a1a1-2b2b..."
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
