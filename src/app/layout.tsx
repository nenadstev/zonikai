import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zonik AI — After-Hours Load Tracking Agent",
  description:
    "Zonik watches your trucks at night. It calls drivers when something looks wrong. Your team sees every load on one screen.",
  icons: {
    icon: [
      { url: "/brand/zonik-favicon.png", type: "image/png" },
      { url: "/brand/zonik-favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brand/zonik-favicon.png",
    apple: "/brand/zonik-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
