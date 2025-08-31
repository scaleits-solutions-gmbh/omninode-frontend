"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { CustomQueryClientProvider, QueryClientConfig } from "./custom-query-client-provider";
import { ClientSessionDataInitializer } from "./session-initializer";
import { Toaster } from "sonner";

export interface BaseProvidersAggregateConfig {
  queryClient?: QueryClientConfig;
  includeSessionInitializer?: boolean;
  includeToaster?: boolean;
  toasterPosition?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  toasterRichColors?: boolean;
  analytics?: ReactNode;
}

interface BaseProvidersAggregateProps {
  children: ReactNode;
  config?: BaseProvidersAggregateConfig;
}

export function BaseProvidersAggregate({ 
  children, 
  config = {} 
}: BaseProvidersAggregateProps) {
  const {
    queryClient,
    includeSessionInitializer = true,
    includeToaster = true,
    toasterPosition = "bottom-right",
    toasterRichColors = true,
    analytics
  } = config;

  return (
    <CustomQueryClientProvider config={queryClient}>
      {includeSessionInitializer && <ClientSessionDataInitializer />}
      <ThemeProvider>
        {includeToaster && (
          <Toaster 
            position={toasterPosition} 
            richColors={toasterRichColors} 
          />
        )}
        {children}
      </ThemeProvider>
      {analytics}
    </CustomQueryClientProvider>
  );
} 