import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const footerLinks = {
  Product: [
    { label: "GPS Tracking", href: "/#gps" },
    { label: "Voice Agent", href: "/#voice-agent" },
    { label: "Dashboard", href: "/#product" },
    { label: "Integrations", href: "/#integrations" },
  ],
  Company: [
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
    { label: "Book a Demo", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
        <Logo className="mb-1" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Zonik AI monitors every active load 24/7 — GPS, voice agents,
              and smart alerts — so your team reacts only when it matters.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted">
              <p>hello@zonikai.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
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
            &copy; {new Date().getFullYear()} Zonik AI. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            After-hours load tracking for trucking &amp; freight
          </p>
        </div>
      </div>
    </footer>
  );
}
