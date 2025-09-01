import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";

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
    default: "OmniNode Feedback",
    template: "%s | OmniNode Feedback",
  },
  description: "OmniNode Feedback",
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
    apple: [{ url: "/assets/favicons/apple-touch-icon.png", sizes: "180x180" }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <BaseProvidersAggregate>{children}</BaseProvidersAggregate>
      </body>
    </html>
  );
}
