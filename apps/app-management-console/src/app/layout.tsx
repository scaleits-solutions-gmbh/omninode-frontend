import ProvidersAggregate from "@/providers/providers-aggregate";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        url: "/assets/favicons/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/assets/favicons/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      { url: "/assets/favicons/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersAggregate>{children}</ProvidersAggregate>
      </body>
    </html>
  );
}
