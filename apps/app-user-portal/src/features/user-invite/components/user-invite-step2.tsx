"use client";
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";

type ActivateAccountStep1Props = {
  password?: string;
  onNext: (password: string) => void;
  onBack: (password: string) => void;
};

export default function ActivateAccountStep1({
  password: initialPassword,
  onNext,
  onBack,
}: ActivateAccountStep1Props) {
  const t = useTranslations('features.userInvite.userInviteStep2');
  const tValidation = useTranslations('validation');

  const form = useForm({
    defaultValues: {
      password: initialPassword || "",
      confirmPassword: initialPassword || "",
    },
    onSubmit: async (data) => {
      await onNext(data.value.password);
    },
  });

  const isPasswordValid = (value: string) => {
    if (!value) return tValidation('passwordRequired');
    if (value.length < 8) return tValidation('passwordMinLength');
    if (value.length > 100) return tValidation('passwordMaxLength');
    if (!/[A-Z]/.test(value))
      return tValidation('passwordUppercase');
    if (!/[a-z]/.test(value))
      return tValidation('passwordLowercase');
    if (!/[0-9]/.test(value))
      return tValidation('passwordNumber');
    if (!/[^A-Za-z0-9]/.test(value))
      return tValidation('passwordSpecialChar');
    return undefined;
  }; /*
  const isConfirmPasswordValid = (value: string) => {
    if (!value) return "Confirm password is required";
    if (value !== form.getFieldValue("password"))
      return "Passwords do not match";
    return undefined;
  };*/

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="size-16 bg-muted rounded-md flex items-center justify-center">
              <KeyRound className="size-6 text-muted-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('createPassword')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('createPasswordSubtitle')}
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) => {
                return isPasswordValid(value);
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>{tValidation('password')}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="********"
                  value={field.state.value}
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
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onSubmit: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue("password");
                return value !== password
                  ? tValidation('passwordsDoNotMatch')
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>{t('confirmPassword')}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="********"
                  value={field.state.value}
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  type="button"
                  onClick={() => onBack(form.state.values.password)}
                  disabled={!canSubmit}
                >
                  {t('back')}
                </Button>
                <Button
                  className="flex-1 cursor-pointer"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {isSubmitting ? t('creating') : t('continue')}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
