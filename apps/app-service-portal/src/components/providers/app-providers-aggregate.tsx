"use client";
import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";
import { SessionProvider } from "next-auth/react";

type AppProvidersAggregateProps = {
  children: React.ReactNode;
};

export function AppProvidersAggregate({
  children,
}: AppProvidersAggregateProps) {
  return (
    <SessionProvider>
      <BaseProvidersAggregate>{children}</BaseProvidersAggregate>
    </SessionProvider>
  );
}
