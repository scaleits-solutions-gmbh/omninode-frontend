"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryResult } from "@tanstack/react-query";
import { useValidSession } from "./use-valid-session";

function isAuthError(err: unknown): boolean {
  const message = String((err as any)?.message ?? "");
  return message.includes(" 401 ") || message.includes(" 403 ");
}

type AuthedQueryOptions<TData, TQueryKey extends QueryKey = QueryKey> = {
  queryKey: TQueryKey;
  queryFn: (ctx: { accessToken: string }) => Promise<TData>;
  enabled?: boolean;
  retry?: any;
  refetchOnWindowFocus?: boolean;
  placeholderData?: any;
  staleTime?: number;
};

export function useAuthedQuery<TData = unknown, TQueryKey extends QueryKey = QueryKey>(
  options: AuthedQueryOptions<TData, TQueryKey>
): UseQueryResult<TData, Error> {
  const { isValid, accessToken, refresh } = useValidSession();

  return useQuery<TData, Error, TData, TQueryKey>({
    queryKey: options.queryKey,
    enabled: isValid && (options.enabled ?? true),
    queryFn: async () => {
      const token = accessToken as string;
      try {
        return await options.queryFn({ accessToken: token });
      } catch (err: unknown) {
        if (isAuthError(err)) await refresh();
        throw err;
      }
    },
    retry: options.retry ?? ((failureCount: number, err: unknown) => isAuthError(err) && failureCount < 1),
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    placeholderData: options.placeholderData ?? keepPreviousData,
    staleTime: options.staleTime,
  } as any);
}


