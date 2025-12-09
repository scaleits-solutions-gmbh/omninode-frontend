"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Separator,
} from "@repo/pkg-frontend-common-kit/components";
import { isTrustedDomain } from "@repo/pkg-frontend-common-kit/utils";
import { AppLogo } from "@/components/custom/app-logo";

export default function PageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const safeCallbackUrl = isTrustedDomain(callbackUrl) ? callbackUrl : "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: safeCallbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError("An error occurred during sign in");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("azure-ad", { callbackUrl: safeCallbackUrl });
    } catch (err) {
      setError("An error occurred during Microsoft sign in");
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      <AppLogo customSize={45} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-6">
        <CardContent className="space-y-4">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleMicrosoftSignIn}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h10.931v10.931H0z" fill="#f25022" />
              <path d="M12.069 0H23v10.931H12.069z" fill="#00a4ef" />
              <path d="M0 12.069h10.931V23H0z" fill="#7fba00" />
              <path d="M12.069 12.069H23V23H12.069z" fill="#ffb900" />
            </svg>
            Microsoft
          </Button>

          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
      </Card>
    </div>
  );
}

