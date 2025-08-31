"use client";
import { fetchUserProfile, updateUserProfile } from "@/lib/api-client/personal-settings";
import { FeUserProfile } from "@/types/fe-user";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function EditProfilePopup() {
  const t = useTranslations('features.personalSettings.editProfilePopup');
  const tCommon = useTranslations('common');
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
      toast.success(t('profileUpdatedSuccessfully'));
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error(t('failedToUpdateProfile'));
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
        toast.info(tCommon('noChanges'));
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
        <AlertTitle>{tCommon('error')}</AlertTitle>
        <AlertDescription>
          {t('failedToLoadUserDetails')}
        </AlertDescription>
      </Alert>
    );
  }

  const isFieldRequired = (value: string, fieldName: string) => {
    if (!value || value.trim() === "") return t(`${fieldName.toLowerCase().replace(' ', '')}Required`);
    return undefined;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" size="sm">
          <Pencil className="h-4 w-4" />
          {t('editProfile')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t('editProfileTitle')}</DialogTitle>
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
                onSubmit: ({ value }) => isFieldRequired(value, "firstName"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t('firstName')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('enterFirstName')}
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
                  <Label htmlFor={field.name}>{t('middleNames')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('enterMiddleNames')}
                  />
                </div>
              )}
            </form.Field>
            <form.Field
              name="lastName"
              validators={{
                onSubmit: ({ value }) => isFieldRequired(value, "lastName"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t('lastName')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('enterLastName')}
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
                onSubmit: ({ value }) => isFieldRequired(value, "position"),
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{t('position')}</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={t('enterPosition')}
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
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? tCommon('updating') : t('updateProfile')}
                </Button>
              </DialogFooter>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
