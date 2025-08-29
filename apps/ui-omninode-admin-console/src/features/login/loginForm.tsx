"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/apiClient/auth/login";
import { toast } from "sonner";
import { useState } from "react";


const isEmailValid = (value: string) => {
  if (!value) return "Email is required";
  /*const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";*/
  return undefined;
};

const isPasswordValid = (value: string) => {
  if (!value) return "Password is required";
  return undefined;
};

export default function LoginCard() {
  const router = useRouter();
  const [showInvalidCredentialsError, setShowInvalidCredentialsError] = useState(false);

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await login(email, password);
    },
    onSuccess: () => {
        toast.success("Login successful!");
        router.push("/");
    },
    onError: (error: Error) => {
      if(error.message === "HTTP 401: Unauthorized"){
        setShowInvalidCredentialsError(true);
        toast.error("Login failed: Invalid email or password");
      }else{
        toast.error(`Login failed: ${error.message}`);
      }
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate({
        email: value.email,
        password: value.password,
      });
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
              onSubmit: ({ value }) => isEmailValid(value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="name@company.com"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setShowInvalidCredentialsError(false);
                  }}
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    setShowInvalidCredentialsError(false);
                  }}
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
                    onCheckedChange={(checked) =>
                      field.handleChange(checked === true)
                    }
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
              )}
            </form.Field>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {showInvalidCredentialsError && (
            <div className="w-full flex justify-start">
                <em role="alert" className="text-sm text-red-500 text-left">
                Invalid email or password
                </em>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full cursor-pointer"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full cursor-pointer" onClick={() => toast.info("This feature is not available yet")}>
          <Image
            src="/assets/microsoft.svg"
            alt="Microsoft"
            width={16}
            height={16}
          />
          Sign in with Microsoft
        </Button>
      </CardContent>
    </Card>
  );
}
