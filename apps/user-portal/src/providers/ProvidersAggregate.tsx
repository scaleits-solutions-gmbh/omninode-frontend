import CustomQueryClientProvider from "./QueryClientProvider";
import ThemeProvider from "./ThemeProvider";
import SessionInitializer from "./ClientSessionDataInitializer";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner";
export default function ProvidersAggregate({ children }: { children: React.ReactNode }) {
    return (
        <CustomQueryClientProvider>
            <ThemeProvider>
                    <SessionInitializer />
                    <Toaster position="bottom-right" richColors />
                    {children}
            </ThemeProvider>
            <Analytics />
        </CustomQueryClientProvider>
    )
}
