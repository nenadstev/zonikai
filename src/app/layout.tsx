import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { GTM_ID } from "@/lib/gtm";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Zonik AI — 24/7 Load Tracking",
  description:
    "Zonik watches your trucks 24/7. It calls drivers when something looks wrong. Your team sees every load on one screen.",
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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
