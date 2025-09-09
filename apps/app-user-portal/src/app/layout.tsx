import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvidersAggregate } from "@/components/providers/app-providers-aggregate";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OmniNode Management Console",
    template: "%s | OmniNode Management Console",
  },
  description: "OmniNode Management Console",
  icons: {
    icon: [
      {
        url: "/user-portal/assets/favicons/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/user-portal/assets/favicons/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      { url: "/user-portal/assets/favicons/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProvidersAggregate>
          {children}
        </AppProvidersAggregate>
      </body>
    </html>
  );
}
