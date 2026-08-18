"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    {
      title: t.footer.product,
      links: [
        { label: t.nav.howItWorks, href: "/#how-it-works" },
        { label: t.nav.features, href: "/features" },
        { label: t.nav.integrations, href: "/integrations" },
        { label: t.nav.calculator, href: "/calculator" },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.faq, href: "/faq" },
        { label: t.nav.contact, href: "/contact" },
        { label: t.nav.bookDemo, href: "/contact" },
        { label: t.footer.privacy, href: "/privacy" },
        { label: t.footer.terms, href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="full" className="mb-1" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t.footer.blurb}
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted">
              <p>hello@zonikai.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Zonik AI. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {t.footer.terms}
            </Link>
            <p className="text-xs text-muted">{t.footer.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
