import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BaseProvidersAggregate } from "@repo/pkg-frontend-common-kit/components";
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
    template: "%s | OmniNode",
    default: "OmniNode",
  },
  description:
    "OmniNode is a platform for managing your organization's resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BaseProvidersAggregate>{children}</BaseProvidersAggregate>
      </body>
    </html>
  );
}
