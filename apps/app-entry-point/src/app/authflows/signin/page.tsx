"use client"
import { signIn } from "next-auth/react";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { isTrustedDomain } from "@repo/pkg-frontend-common-kit/utils";

function SignInInner() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const safeCallbackUrl = isTrustedDomain(callbackUrl) ? callbackUrl : "/";
  useEffect(() => {
    signIn("keycloak", { callbackUrl: safeCallbackUrl });
  }, [safeCallbackUrl]);
  return null;
}

//get search params
export default function SignIn() {
  return (
    <Suspense fallback={null}>
      <SignInInner />
    </Suspense>
  );
}
