"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { QueryKey, UseQueryResult } from "@tanstack/react-query";
import { useSession } from "next-auth/react";


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
  const { data: session, status } = useSession();

  const result = useQuery<TData, Error, TData, TQueryKey>({
    queryKey: options.queryKey,
    enabled: (options.enabled ?? true) && status === "authenticated",
    queryFn: () => options.queryFn({ accessToken: session?.access_token ?? "" }),
    retry: options.retry,
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    placeholderData: options.placeholderData ?? keepPreviousData,
    staleTime: options.staleTime,
  });

  // While the NextAuth session is still loading, surface loading=true to consumers
  return {
    ...result,
    isLoading: status === "loading" || result.isLoading,
  } as UseQueryResult<TData, Error>;
}


