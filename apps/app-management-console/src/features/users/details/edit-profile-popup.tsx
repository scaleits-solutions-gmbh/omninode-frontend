"use client";

import { fetchUser, updateUserCompany } from "@/lib/api-client/user-companies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Button,
  Label,
  Input,
  Alert,
  AlertDescription,
  AlertTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/pkg-frontend-common-kit/components";
import {
  OrganizationRole,
  UserCompanyStatus,
  getOrganizationRoleOptions,
} from "@scaleits-solutions-gmbh/services";
import { useForm } from "@tanstack/react-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function EditProfilePopup() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id as string),
  });

  const updateUserCompanyMutation = useMutation({
    mutationFn: ({
      id,
      status,
      organizationRole,
    }: {
      id: string;
      status: UserCompanyStatus;
      organizationRole: OrganizationRole;
    }) => updateUserCompany(id, status, organizationRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userCompany"] });
      toast.success("Profile updated successfully");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const form = useForm({
    defaultValues: {
      status: undefined as UserCompanyStatus | undefined,
      organizationRole: undefined as OrganizationRole | undefined,
    },
    onSubmit: async ({ value }) => {
      if (!form.state.isDirty) {
        toast.info("No changes made");
        setOpen(false);
        return;
      }
      if (!data?.id) return;

      await updateUserCompanyMutation.mutateAsync({
        id: data.id,
        status: value.status as UserCompanyStatus,
        organizationRole:
          value.organizationRole as OrganizationRole,
      });
    },
  });

  // Update form values when data loads
  useEffect(() => {
    if (data) {
      form.setFieldValue("status", data.status);
      form.setFieldValue(
        "organizationRole",
        data.organizationRole,
      );
    }
  }, [data, form]);

  if (isLoading) {
    return null;
  }
  if (!data || error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load user details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  const isRoleValid = (value: OrganizationRole | undefined) => {
    if (!value) return "Role is required";
    return undefined;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" size="sm">
          <Pencil className="h-4 w-4" />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-6 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                disabled
                type="text"
                value={data.firstName || ""}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleNames">Middle Names</Label>
              <Input
                id="middleNames"
                disabled
                type="text"
                value={data.middleNames || ""}
                placeholder="Enter middle names (optional)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                disabled
                type="text"
                value={data.lastName || ""}
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                disabled
                type="text"
                value={data.position || ""}
                placeholder="Enter position"
              />
            </div>
            <form.Field
              name="status"
              validators={{
                onSubmit: ({ value }) => {
                  if (!value) return "Status is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Status</Label>
                  <Select
                    name={field.name}
                    value={field.state.value || ""}
                    onValueChange={(value) =>
                      field.handleChange(value as UserCompanyStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserCompanyStatus.ACTIVE}>
                        Active
                      </SelectItem>
                      <SelectItem value={UserCompanyStatus.INACTIVE}>
                        Inactive
                      </SelectItem>
                      <SelectItem value={UserCompanyStatus.PENDING}>
                        Pending
                      </SelectItem>
                      <SelectItem value={UserCompanyStatus.SUSPENDED}>
                        Suspended
                      </SelectItem>
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
            {data?.organizationRole == OrganizationRole.Owner ? (
              <div className="space-y-2">
                <Label htmlFor="organizationRole">
                  Management Console Access
                </Label>
                <Input
                  id="organizationRole"
                  disabled
                  type="text"
                  value={data.organizationRole}
                  placeholder="Enter position"
                />
              </div>
            ) : (
              <form.Field
                name="organizationRole"
                validators={{
                  onSubmit: ({ value }) => isRoleValid(value),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Management Console Access
                    </Label>
                    <Select
                      name={field.name}
                      value={field.state.value || ""}
                      onValueChange={(value) =>
                        field.handleChange(value as OrganizationRole)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a management console access" />
                      </SelectTrigger>
                      <SelectContent>
                        {getOrganizationRoleOptions().map((option) => {
                          if (option.value === OrganizationRole.Owner)
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
            )}
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter className="border-t pt-4">
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
