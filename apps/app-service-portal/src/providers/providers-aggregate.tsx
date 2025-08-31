import ThemeProvider from "./theme-provider";
import ReactQueryProvider from "./react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "../../../../packages/frontend-common-kit/dist/components";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <Toaster position="bottom-right" richColors />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <Analytics />
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
