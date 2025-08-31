"use client"
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

//get search params
export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  useEffect(() => {
    signIn("keycloak", { callbackUrl: callbackUrl });
  }, [callbackUrl]);
  return null;
}