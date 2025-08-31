"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useMemo } from "react";

export interface QueryClientConfig {
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  showDevtools?: boolean;
  devtoolsInitialIsOpen?: boolean;
}

interface QueryClientProviderProps {
  children: ReactNode;
  config?: QueryClientConfig;
}

export function CustomQueryClientProvider({ 
  children, 
  config = {} 
}: QueryClientProviderProps) {
  const {
    staleTime = 5 * 60 * 1000, // 5 minutes default
    refetchOnWindowFocus = false,
    showDevtools = process.env.NODE_ENV === 'development',
    devtoolsInitialIsOpen = false
  } = config;

  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime,
        refetchOnWindowFocus,
      },
    },
  }), [staleTime, refetchOnWindowFocus]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {showDevtools && <ReactQueryDevtools initialIsOpen={devtoolsInitialIsOpen} />}
    </QueryClientProvider>
  );
} 