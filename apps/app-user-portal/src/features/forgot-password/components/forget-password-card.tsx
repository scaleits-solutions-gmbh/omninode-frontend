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
import { LockIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api-client/auth/forgot-passord";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { createValidationFunctions } from "@/lib/utils/validation";

export default function ForgetPasswordCard() {
  const router = useRouter();
  const t = useTranslations('features.forgotPassword.forgotPasswordCard');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');
  const tNotifications = useTranslations('notifications');

  const { isEmailValid } = createValidationFunctions(tValidation);

  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      await forgotPassword(email);
    },
    onSuccess: () => {
      toast.success(tNotifications('passwordResetSent'), {
        description: tNotifications('passwordResetSentDescription'),
      });
      router.push("/login");
    },
    onError: () => {
      toast.error(tNotifications('passwordResetError'));
    },
  });
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => {
      await forgotPasswordMutation.mutateAsync({ email: value.email });
    },
  });
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="text-center flex flex-col gap-2 mb-2">
          <div className="size-12 mx-auto bg-muted rounded-md flex items-center justify-center">
            <LockIcon className="size-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <form
          className="space-y-6 w-full"
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
                <Label htmlFor="email">{tCommon('email')}</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@company.com"
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
          <form.Subscribe>
            {(state) => (
              <Button
                className="w-full bg-primary text-white"
                disabled={state.isSubmitting || !state.canSubmit}
              >
                {state.isSubmitting
                  ? t('resettingPassword')
                  : t('resetPassword')}
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
