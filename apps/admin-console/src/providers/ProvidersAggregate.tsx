import { Toaster } from "@/components/ui/sonner";
import CustomQueryClientProvider from "./QueryClientProvider";
import ThemeProvider from "./ThemeProvider";   

export default function ProvidersAggregate({ children }: { children: React.ReactNode }) {
    return (
        <CustomQueryClientProvider>
            <ThemeProvider>
                <Toaster position="top-right" richColors />
                {children}
            </ThemeProvider>
        </CustomQueryClientProvider>
    )
}
