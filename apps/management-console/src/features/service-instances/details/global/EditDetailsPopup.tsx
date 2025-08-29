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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FeUserProfile } from "@/types/feUser";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/apiClient/user-settings/profile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Pencil } from "lucide-react";
import { fetchServiceInstance } from "@/lib/apiClient/serviceInstances";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPopup() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["serviceInstance"],
    queryFn: () => fetchServiceInstance(id as string),
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
      instanceName: data?.instanceName || "",
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
    return <Skeleton className="h-8 w-32" />;
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
          Edit instance
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Edit Instance</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="space-y-2">
            <Label>Service</Label>
            <div className="text-sm bg-muted/50 p-2 rounded-md flex gap-2 items-center">
              <Image
                src={`/assets/${data?.service}.svg`}
                alt={data?.service}
                width={20}
                height={20}
              />
              {data?.service.toUpperCase()}
            </div>
          </div>
          <form.Field
            name="instanceName"
            validators={{
              onSubmit: ({ value }) => isFieldRequired(value, "Instance name"),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Instance Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter instance name"
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
              <DialogFooter className="border-t pt-4">
                <Button
                  variant="outline"
                  type="button"
                  className="gap-2"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Instance"}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
