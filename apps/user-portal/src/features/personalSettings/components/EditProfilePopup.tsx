"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/apiClient/personalSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FeUserProfile } from "@/types/feUser";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/apiClient/personalSettings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Pencil } from "lucide-react";

export default function EditProfilePopup() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchUserProfile(),
    retry: false,
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
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
      firstName: data?.firstName || "",
      middleNames: data?.middleNames || "",
      lastName: data?.lastName || "",
      position: data?.position || "",
    },
    onSubmit: async ({ value }) => {
      if (!form.state.isDirty) {
        toast.info("No changes made");
        setOpen(false);
        return;
      }
      if (!data?.id) return;
      const updatingProfile: Partial<FeUserProfile> = {
        ...value,
        id: data.id,
      };
      await updateUserProfileMutation.mutateAsync(updatingProfile);
    },
  });
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

  const isFieldRequired = (value: string, fieldName: string) => {
    if (!value || value.trim() === "") return `${fieldName} is required`;
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
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4 md:grid-cols-2">
            <form.Field
              name="firstName"
              validators={{
                onSubmit: ({ value }) => isFieldRequired(value, "First name"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>First Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your first name"
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
            <form.Field name="middleNames">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Middle Names</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your middle names (optional)"
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="lastName"
              validators={{
                onSubmit: ({ value }) => isFieldRequired(value, "Last name"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Last Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your last name"
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
              name="position"
              validators={{
                onSubmit: ({ value }) => isFieldRequired(value, "Position"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Position</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your position"
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
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <DialogFooter>
                <Button type="submit" disabled={!canSubmit || isSubmitting} isLoading={isSubmitting}>
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
