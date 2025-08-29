"use client";
import ThemeProvider from "./themeProvider";
import ReactQueryProvider from "./reactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <Toaster position="top-right" richColors />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Analytics />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
