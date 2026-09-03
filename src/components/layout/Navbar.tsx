"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

const LOGIN_URL = "https://app.zonikai.com/";

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled && !mobileOpen;

  const navLinks = [
    { label: t.nav.howItWorks, href: "/#how-it-works" },
    { label: t.nav.features, href: "/features" },
    { label: t.nav.integrations, href: "/integrations" },
    { label: t.nav.calculator, href: "/calculator" },
    { label: t.nav.faq, href: "/faq" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        overHero
          ? "bg-gradient-to-b from-black/50 to-transparent"
          : "border-b border-border bg-white/80 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo
          className={cn(
            overHero && "rounded-md bg-white/95 px-1.5 py-0.5 shadow-sm"
          )}
        />

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium transition-colors",
                overHero
                  ? "text-white/85 hover:text-white"
                  : "text-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <Button href={LOGIN_URL} variant={overHero ? "outlineDark" : "secondary"} size="sm">
              {t.nav.login}
            </Button>
            <Button href="/contact" variant={overHero ? "outlineDark" : "primary"} size="sm">
              {t.nav.bookDemo}
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              "rounded-lg p-2 transition-colors lg:hidden",
              overHero ? "text-white hover:bg-white/10" : "text-muted hover:bg-surface"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t.nav.toggleMenu}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href={LOGIN_URL} variant="secondary" className="mt-3 w-full">
              {t.nav.login}
            </Button>
            <Button href="/contact" className="w-full">
              {t.nav.bookDemo}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
