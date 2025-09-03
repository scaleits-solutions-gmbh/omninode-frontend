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
  title: "OmniNode - The Integration Platform",
  description: "Connect and manage all your systems with ease.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: "/og-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <a
          href="#overview"
          className="fixed bottom-5 right-5 rounded-full bg-primary text-white px-4 py-2 shadow hover:opacity-90"
        >
          Back to top
        </a>
      </body>
    </html>
  );
}
