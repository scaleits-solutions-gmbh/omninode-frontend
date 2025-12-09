"use client";
import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";
import { SessionProvider } from "next-auth/react";

type AppProvidersAggregateProps = {
  children: React.ReactNode;
};

// Refetch session every 4 minutes to keep the token fresh
// This triggers the NextAuth JWT callback which refreshes the Keycloak token if needed
const SESSION_REFETCH_INTERVAL = 4 * 60; // 4 minutes in seconds

export function AppProvidersAggregate({
  children,
}: AppProvidersAggregateProps) {
  return (
    <SessionProvider
      refetchInterval={SESSION_REFETCH_INTERVAL}
      refetchOnWindowFocus
    >
      <BaseProvidersAggregate>{children}</BaseProvidersAggregate>
    </SessionProvider>
  );
}
