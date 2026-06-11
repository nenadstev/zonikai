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
    "Zonik AI monitors every active load, tracks GPS in real time, calls drivers with AI voice agents, and alerts your team when human attention is actually needed.",
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
