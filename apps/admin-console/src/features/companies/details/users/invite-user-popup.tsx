"use client";
import { sendCompanyUserInvite } from "@/lib/api-client/company/company";
import { queryClient } from "@/providers/query-client-provider";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import {
  getManagementConsoleAccessOptions,
  ManagementConsoleAccess,
} from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function InviteUserPopup() {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const inviteUserMutation = useMutation({
    mutationFn: async (value: { email: string; role: string }) => {
      await sendCompanyUserInvite(id, {
        email: value.email,
        managementConsoleAccess: value.role as ManagementConsoleAccess,
      });
    },
    onSuccess: () => {
      toast.success("User invited successfully");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["companies", id, "invites"] });
      form.reset();
    },
    onError: () => {
      toast.error("Failed to invite user");
    },
  });
  const form = useForm({
    defaultValues: {
      email: "",
      role: "",
    },
    onSubmit: async ({ value }) => {
      // Handle invite logic here
      await inviteUserMutation.mutateAsync(value);
    },
  });

  const isEmailValid = (value: string) => {
    if (!value) return "Email is required";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Invalid email address";
    }
    return undefined;
  };

  const isRoleValid = (value: string) => {
    if (!value) return "Access Level is required";
    if (
      !Object.values(ManagementConsoleAccess).includes(
        value as ManagementConsoleAccess,
      )
    ) {
      return "Invalid role";
    }
    return undefined;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Invite User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite User</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to invite. They will
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
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="name@example.com"
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
                <Label htmlFor={field.name}>
                  Management console access level
                </Label>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an access level" />
                  </SelectTrigger>
                  <SelectContent>
                    {getManagementConsoleAccessOptions().map((option) => {
                      if (option.value === ManagementConsoleAccess.Owner)
                        return null;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
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
                  disabled={!canSubmit}
                  // isLoading={isSubmitting} // TODO: Add isLoading to Button component if available in shadcn/ui
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
