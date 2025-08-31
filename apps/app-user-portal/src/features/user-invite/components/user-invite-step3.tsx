"use client";
import { useForm } from "@tanstack/react-form";
import {
  Input,
  Label,
  Card,
  CardContent,
  Button,
} from "@repo/pkg-frontend-common-kit/components";
import { ActivatingUser } from "../types/activating-user";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type ActivateAccountStep2ReactFormProps = {
  isLoading: boolean;
  userData: Partial<ActivatingUser>;
  onActivate: (data: Partial<ActivatingUser>) => Promise<void>;
  onBack: (data: Partial<ActivatingUser>) => void;
};

export default function ActivateAccountStep2ReactForm({
  isLoading,
  userData,
  onActivate,
  onBack,
}: ActivateAccountStep2ReactFormProps) {
  const t = useTranslations('features.userInvite.userInviteStep3');
  const tValidation = useTranslations('validation');
  const tCommon = useTranslations('common');

  const form = useForm({
    defaultValues: {
      firstName: userData.firstName || "",
      middleNames: userData.middleNames || "",
      lastName: userData.lastName || "",
      position: userData.position || "",
      imageUrl: userData.imageUrl || "",
    },
    onSubmit: async (data) => {
      await onActivate(data.value);
    },
  });

  const isFirstNameValid = (value: string) => {
    if (!value) return tValidation('firstNameRequired');
    if (value.length < 2) return tValidation('firstNameMinLength');
    if (value.length > 50) return tValidation('firstNameMaxLength');
    return undefined;
  };

  const isLastNameValid = (value: string) => {
    if (!value) return tValidation('lastNameRequired');
    if (value.length < 2) return tValidation('lastNameMinLength');
    if (value.length > 50) return tValidation('lastNameMaxLength');
    return undefined;
  };

  const isPositionValid = (value: string) => {
    if (!value) return tValidation('positionRequired');
    if (value.length < 2) return tValidation('positionMinLength');
    if (value.length > 100) return tValidation('positionMaxLength');
    return undefined;
  };

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="size-16 bg-muted rounded-md flex items-center justify-center">
              <UserIcon className="size-6 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('completeProfile')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('completeProfileSubtitle')}
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">{tCommon('email')}</Label>
            <Input value={userData.email} disabled />
          </div>

          <form.Field
            name="firstName"
            validators={{
              onSubmit: ({ value }) => isFirstNameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>{t('firstName')}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={t('enterFirstName')}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
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
                  placeholder={t('enterMiddleNames')}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{
              onSubmit: ({ value }) => isLastNameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>{t('lastName')}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={t('enterLastName')}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
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
              onSubmit: ({ value }) => isPositionValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>{t('position')}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder={t('enterJobTitle')}
                  value={field.state.value as string}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {!field.state.meta.isValid && (
                  <div className="w-full flex justify-start">
                    <em role="alert" className="text-sm text-red-500 text-left">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                )}
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit]}>
            {([canSubmit]) => (
              <div className="flex gap-2">
                <Button
                  className="flex-1 cursor-pointer"
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onBack(form.state.values as Partial<ActivatingUser>)
                  }
                >
                  {t('back')}
                </Button>
                <Button
                  disabled={!canSubmit || isLoading}
                  className="flex-1 cursor-pointer"
                  type="submit"
                  isLoading={isLoading}
                >
                  {isLoading ? t('activatingAccount') : t('activateAccount')}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
