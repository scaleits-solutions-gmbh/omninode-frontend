"use client";
import { login } from "@/lib/api-client/auth/login";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
} from "@repo/pkg-frontend-common-kit/components";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { createValidationFunctions } from "@/lib/utils/validation";

type LoginCardParams = {
  redirectUrl?: string;
};

export default function LoginCard({ redirectUrl }: LoginCardParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations('features.login.loginCard');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');
  const tNotifications = useTranslations('notifications');

  const { isEmailValid, isPasswordValid } = createValidationFunctions(tValidation);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      toast.success(tNotifications('loginSuccess'));
      if (redirectUrl) {
        router.replace(redirectUrl);
        queryClient.invalidateQueries({ queryKey: ["sessionData"] });
      } else {
        router.push("/");
      }
    },
    onError: () => {
      toast.error(tNotifications('loginError'));
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync({
        email: value.email,
        password: value.password,
      });
    },
  });

  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <div className="size-12 mx-auto bg-muted rounded-md flex items-center justify-center">
            <UserIcon className="size-6 text-muted-foreground" />
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

          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) => isPasswordValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="password">{tCommon('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
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

          <div className="flex items-center justify-between">
            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={field.state.value}
                    onCheckedChange={(checked: boolean) =>
                      field.handleChange(checked === true)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t('rememberMe')}
                  </Label>
                </div>
              )}
            </form.Field>
            <Button variant="link" className="p-0 h-fit text-foreground">
              <Link href="/forgot-password">{t('forgotPassword')}</Link>
            </Button>
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full cursor-pointer"
                isLoading={isSubmitting}
              >
                {isSubmitting ? t('signingIn') : t('signIn')}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-gray-500">{t('orContinueWith')}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => {
            toast.info(t('microsoftNotAvailable'));
          }}
        >
          <Image
            src="/assets/microsoft.svg"
            alt={t('microsoftLogoAlt')}
            width={16}
            height={16}
          />
          {t('signInWithMicrosoft')}
        </Button>
      </CardContent>
    </Card>
  );
}
