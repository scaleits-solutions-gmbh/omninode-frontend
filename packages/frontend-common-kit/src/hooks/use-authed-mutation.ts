"use client";

import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { useValidSession } from "./use-valid-session";

function isAuthError(err: unknown): boolean {
  const message = String((err as any)?.message ?? "");
  return message.includes(" 401 ") || message.includes(" 403 ");
}

type AuthedMutationFn<TVariables, TData> = (ctx: { accessToken: string; variables: TVariables }) => Promise<TData>;

export function useAuthedMutation<TData = unknown, TVariables = void>(
  options: {
    mutationFn: AuthedMutationFn<TVariables, TData>;
  } & Omit<UseMutationOptions<TData, Error, TVariables, unknown>, "mutationFn">
): UseMutationResult<TData, Error, TVariables, unknown> {
  const { isValid, accessToken, refresh } = useValidSession();

  return useMutation<TData, Error, TVariables, unknown>({
    ...options,
    mutationFn: async (variables: TVariables) => {
      if (!isValid || !accessToken) throw new Error("Not authenticated");
      const token = accessToken as string;
      try {
        return await options.mutationFn({ accessToken: token, variables });
      } catch (err: unknown) {
        if (isAuthError(err)) await refresh();
        throw err as Error;
      }
    },
    retry: (failureCount, err: unknown) => isAuthError(err) && failureCount < 1,
  });
}


