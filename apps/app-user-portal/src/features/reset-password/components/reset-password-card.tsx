"use client";
import {
  Card,
  CardContent,
  Input,
  Button,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { RotateCcwKey } from "lucide-react";
import { useTranslations } from "next-intl";

type ResetPasswordCardProps = {
  onResetPassword: (password: string) => Promise<void>;
  isLoading: boolean;
};

export default function ResetPasswordCard({
  onResetPassword,
  isLoading,
}: ResetPasswordCardProps) {
  const t = useTranslations('features.resetPassword.resetPasswordCard');
  const tValidation = useTranslations('validation');

  const isPasswordValid = (value: string) => {
    if (!value) return tValidation('passwordRequired');
    if (value.length < 8) return tValidation('passwordMinLength');
    return undefined;
  };

  const isConfirmPasswordValid = (value: string, password: string) => {
    if (!value) return tValidation('confirmPasswordRequired');
    if (value !== password) return tValidation('passwordsDoNotMatch');
    return undefined;
  };

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      await onResetPassword(value.password);
    },
  });

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="text-center flex flex-col gap-2">
          <div className="size-12 mx-auto bg-muted rounded-md flex items-center justify-center">
            <RotateCcwKey className="size-6 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">
              {t('title')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
        </div>
        <form
          className="space-y-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) => isPasswordValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="password">{t('newPassword')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterNewPassword')}
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
              onSubmit: ({ value }) => {
                const password = form.getFieldValue("password");
                return isConfirmPasswordValid(value, password);
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={t('confirmNewPassword')}
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
              <Button
                type="submit"
                disabled={!canSubmit || isLoading}
                className="w-full cursor-pointer"
              >
                {isSubmitting || isLoading ? t('resetting') : t('resetPassword')}
              </Button>
            )}
          </form.Subscribe>
        </form>
        <Button variant="link" className="p-0 h-fit text-foreground">
          <Link href="/login">{t('backToLogin')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
