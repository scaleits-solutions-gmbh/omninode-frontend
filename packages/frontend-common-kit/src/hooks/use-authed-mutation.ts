"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// Import module augmentation to ensure extended Session type is available
import "../utils/next-auth-options";


type AuthedMutationFn<TVariables, TData> = (ctx: { accessToken: string; variables: TVariables }) => Promise<TData>;

export function useAuthedMutation<TData = unknown, TVariables = void>(
  options: {
    mutationFn: AuthedMutationFn<TVariables, TData>;
  } & Omit<UseMutationOptions<TData, Error, TVariables, unknown>, "mutationFn">
): UseMutationResult<TData, Error, TVariables, unknown> {
  const { data: session, status } = useSession();

  return useMutation<TData, Error, TVariables, unknown>({
    ...options,
    mutationFn: async (variables: TVariables) => {
      if (status !== "authenticated") throw new Error("Not authenticated");
      return options.mutationFn({ accessToken: session?.access_token ?? "", variables });
    },
  });
}


