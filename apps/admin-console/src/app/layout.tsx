import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProvidersAggregate from "@/providers/providers-aggregate";
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
    default: "Admin Console",
    template: "%s | Admin Console",
  },
  description: "Admin Console",
  icons: {
    icon: [
      { url: "/assets/favicons/favicon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/assets/favicons/favicon-dark.svg", media: "(prefers-color-scheme: dark)" },
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
    <html suppressHydrationWarning lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersAggregate>{children}</ProvidersAggregate>
      </body>
    </html>
  );
}
