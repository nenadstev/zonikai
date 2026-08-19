"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteConsent } from "@/lib/i18n/ConsentProvider";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function ConsentBanner() {
  const { t } = useI18n();
  const { ready, accepted, accept } = useSiteConsent();

  if (!ready || accepted) return null;

  return (
    <motion.div
      role="dialog"
      aria-live="polite"
      aria-label={t.consent.title}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 bottom-4 z-[60] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[24.5rem]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#111111]/90 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl">
        <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-secondary/40 blur-3xl" />
        <div className="h-0.5 w-full bg-gradient-to-r from-secondary via-[#8b85ff] to-transparent" />

        <div className="relative p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
              <Cookie className="h-4 w-4" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-white">
                {t.consent.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                {t.consent.body}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href="/privacy#cookies"
              className="text-xs font-medium text-white/70 underline-offset-2 hover:text-white hover:underline"
            >
              {t.consent.privacy}
            </Link>
            <Button size="sm" variant="accent" onClick={accept} className="shrink-0 px-5">
              {t.consent.accept}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
