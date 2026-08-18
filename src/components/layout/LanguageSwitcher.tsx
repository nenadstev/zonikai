"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/LocaleProvider";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className="flex items-center gap-1 text-[12px] font-semibold tracking-wide"
    >
      {(["en", "sr"] as const).map((code, i) => (
        <span key={code} className="flex items-center gap-1">
          {i > 0 && (
            <span className={light ? "text-white/35" : "text-border"}>/</span>
          )}
          <button
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={locale === code}
            className={cn(
              "rounded-sm px-0.5 transition-colors",
              locale === code
                ? light
                  ? "text-white"
                  : "text-foreground"
                : light
                  ? "text-white/50 hover:text-white"
                  : "text-muted hover:text-foreground"
            )}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
