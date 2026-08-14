"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Calculator", href: "/calculator" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
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
        <Logo className={cn(overHero && "[&_img]:brightness-0 [&_img]:invert")} />

        <nav className="hidden items-center gap-6 lg:flex">
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

        <div className="hidden lg:block">
          <Button href="/contact" variant={overHero ? "outlineDark" : "primary"} size="sm">
            Book a Demo
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "rounded-lg p-2 transition-colors lg:hidden",
            overHero ? "text-white hover:bg-white/10" : "text-muted hover:bg-surface"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
            <Button href="/contact" className="mt-3 w-full">
              Book a Demo
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
