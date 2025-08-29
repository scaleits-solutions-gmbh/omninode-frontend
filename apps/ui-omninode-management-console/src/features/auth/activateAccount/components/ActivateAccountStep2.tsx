"use client";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivatingUser } from "../types/ActivatingUser";

type ActivateAccountStep2ReactFormProps = {
  userData: Partial<ActivatingUser>;
  onActivate: (data: Partial<ActivatingUser>) => Promise<void>;
  onBack: (data: Partial<ActivatingUser>) => void;
};

export default function ActivateAccountStep2ReactForm({
  userData,
  onActivate,
  onBack,
}: ActivateAccountStep2ReactFormProps) {
  const form = useForm({
    defaultValues: {
      firstName: userData.firstName || "",
      middleNames: userData.middleNames || "",
      lastName: userData.lastName || "",
      position: userData.position || "",
      imageUrl: userData.imageUrl || "",
    },
    onSubmit: async (data) => {
      await onActivate(data as Partial<ActivatingUser>);
    },
  });

  const isFirstNameValid = (value: string) => {
    if (!value) return "First name is required";
    if (value.length < 2) return "First name must be at least 2 characters";
    if (value.length > 50) return "First name must be less than 50 characters";
    return undefined;
  };

  const isLastNameValid = (value: string) => {
    if (!value) return "Last name is required";
    if (value.length < 2) return "Last name must be at least 2 characters";
    if (value.length > 50) return "Last name must be less than 50 characters";
    return undefined;
  };

  const isPositionValid = (value: string) => {
    if (!value) return "Position is required";
    if (value.length < 2) return "Position must be at least 2 characters";
    if (value.length > 100) return "Position must be less than 100 characters";
    return undefined;
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="space-y-6 ">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) => isFirstNameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>First Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
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
                <Label htmlFor={field.name}>Middle Names</Label>
                <Input
                  id={field.name}
                  name={field.name}
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
              onChange: ({ value }) => isLastNameValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Last Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
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
              onChange: ({ value }) => isPositionValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Position</Label>
                <Input
                  id={field.name}
                  name={field.name}
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  type="button"
                  variant="outline"
                  onClick={() => onBack(form.state.values as Partial<ActivatingUser>)}
                >
                  Back
                </Button>
                <Button
                  disabled={!canSubmit}
                  isLoading={isSubmitting}
                  className="flex-1"
                  type="submit"
                >
                  Activate Account
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
