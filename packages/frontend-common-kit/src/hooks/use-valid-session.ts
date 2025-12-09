"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
// Import module augmentation to ensure extended Session type is available
import "../utils/next-auth-options";

export type UseValidSessionResult = {
  accessToken?: string;
  status: "loading" | "authenticated" | "unauthenticated";
  isValid: boolean;
  isLoading: boolean;
  refresh: () => Promise<boolean>;
};

type SessionWithToken = {
  access_token?: string;
  accessTokenExpires?: number; // epoch ms
};

export function useValidSession(): UseValidSessionResult {
  const session = useSession();
  const data = session.data as SessionWithToken | null;

  const accessToken = data?.access_token;
  const isExpired =
    typeof data?.accessTokenExpires === "number" &&
    Number.isFinite(data.accessTokenExpires) &&
    Date.now() >= data.accessTokenExpires;

  const isValid = useMemo(
    () => session.status === "authenticated" && Boolean(accessToken) && !isExpired,
    [session.status, accessToken, isExpired]
  );

  const refresh = async (): Promise<boolean> => {
    try {
      await session.update?.();
      return true;
    } catch {
      return false;
    }
  };

  return {
    accessToken,
    status: session.status,
    isValid,
    isLoading: session.status === "loading",
    refresh,
  };
}


