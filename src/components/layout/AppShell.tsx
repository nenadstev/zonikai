"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/legal/ConsentBanner";
import { ConsentProvider } from "@/lib/i18n/ConsentProvider";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isPitch = pathname === "/pitch";
  const isSnapPage = pathname === "/features" || isPitch;

  return (
    <LocaleProvider>
      <ConsentProvider>
        {isDashboard ? (
          children
        ) : (
          <>
            {!isPitch && <Navbar />}
            <main className={cn("flex-1", isSnapPage && "min-h-0 overflow-hidden")}>
              {children}
            </main>
            {!isSnapPage && <Footer />}
            <ConsentBanner />
          </>
        )}
      </ConsentProvider>
    </LocaleProvider>
  );
}
