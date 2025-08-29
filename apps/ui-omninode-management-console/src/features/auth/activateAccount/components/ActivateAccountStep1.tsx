"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
type ActivateAccountStep1Props = {
  password: string;
  onNext: (password: string) => void;
};

export default function ActivateAccountStep1({
  password: initialPassword,
  onNext,
}: ActivateAccountStep1Props) {
  const form = useForm({
    defaultValues: {
      password: initialPassword,
      confirmPassword: initialPassword,
    },
    onSubmit: async (data) => {
      await onNext(data.value.password);
    },
  });

  const isPasswordValid = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (value.length > 100) return "Password must be less than 100 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value))
      return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(value))
      return "Password must contain at least one special character";
    return undefined;
  }; /*
  const isConfirmPasswordValid = (value: string) => {
    if (!value) return "Confirm password is required";
    if (value !== form.getFieldValue("password"))
      return "Passwords do not match";
    return undefined;
  };*/

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="space-y-6">
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
              onChange: ({ value }) => {
                return isPasswordValid(value);
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Password</Label>
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
              onChange: ({ value, fieldApi }) => {
                const password = fieldApi.form.getFieldValue("password");
                return value !== password
                  ? "Passwords do not match"
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Confirm Password</Label>
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
            {([canSubmit]) => (
              <Button
                className="w-full bg-primary text-white"
                type="submit"
                disabled={!canSubmit}
              >
                Continue
              </Button>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
