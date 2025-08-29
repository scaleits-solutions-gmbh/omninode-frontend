"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";

const isEmailValid = (value: string) => {
  if (!value) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";
  return undefined;
};

export default function ForgetPasswordCard() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });
  return (
    <Card className="w-full max-w-sm rounded-lg shadow-md">
      <CardContent className="space-y-6">
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
              onChange: ({ value }) => isEmailValid(value),
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
          <Button className="w-full bg-primary text-white">
            Reset Password
          </Button>
        </form>
        <Link href="/login" className="text-sm text-primary hover:underline">
          Back to Login
        </Link>
      </CardContent>
    </Card>
  );
}
