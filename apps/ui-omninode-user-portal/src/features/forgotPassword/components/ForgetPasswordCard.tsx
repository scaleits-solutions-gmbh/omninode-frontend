"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { LockIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/apiClient/auth/forgotPassord";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const isEmailValid = (value: string) => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";
  return undefined;
};

export default function ForgetPasswordCard() {
  const router = useRouter();
  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      await forgotPassword(email);
    },
    onSuccess: () => {
      toast.success("Password reset email sent", {
        description: "Please check your email including the spam folder",
      });
      router.push("/login");
    },
    onError: () => {
      toast.error("Failed to send password reset email");
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
          <h2 className="text-xl font-semibold text-foreground">Forgot Password?</h2>
          <p className="text-sm text-muted-foreground">
            No worries! Enter your email address and we&apos;ll send you a link to reset your password.
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
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
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
              <Button className="w-full bg-primary text-white" disabled={state.isSubmitting || !state.canSubmit}>
                {state.isSubmitting ? "Resetting Password..." : "Reset Password"}
              </Button>
            )}
          </form.Subscribe>
        </form>
        <Button variant="link" className="p-0 h-fit text-foreground">
          <Link href="/login">Back to Login</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
