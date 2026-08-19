"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useSiteConsent } from "@/lib/i18n/ConsentProvider";
import { useI18n } from "@/lib/i18n/LocaleProvider";

const CAL_LINK = "zonikai-nikola/30min";
const CAL_NAMESPACE = "demo";
const BRAND = "#4e46fc";
const BRAND_DARK = "#3d36d9";

type CalQueue = {
  (...args: unknown[]): void;
  q: unknown[];
  ns?: Record<string, CalQueue>;
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalQueue;
  }
}

function loadCalEmbed() {
  if (window.Cal) return;

  const push = (api: CalQueue, args: unknown[]) => {
    api.q.push(args);
  };

  const Cal = function (...args: unknown[]) {
    const cal = window.Cal as CalQueue;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      document.head.appendChild(document.createElement("script")).src =
        "https://app.cal.com/embed/embed.js";
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const api = function (...inner: unknown[]) {
        push(api, inner);
      } as CalQueue;
      api.q = [];
      const namespace = args[1];
      if (typeof namespace === "string") {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || api;
        push(cal.ns[namespace]!, args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }

    push(cal, args);
  } as CalQueue;

  Cal.q = [];
  Cal.ns = {};
  window.Cal = Cal;
}

export function CalEmbed() {
  const { t } = useI18n();
  const { ready, accepted, accept } = useSiteConsent();

  useEffect(() => {
    if (!accepted) return;

    const host = document.getElementById("zonik-cal-embed");
    if (!host || host.querySelector("iframe")) return;

    loadCalEmbed();
    const Cal = window.Cal!;

    Cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });

    Cal.ns![CAL_NAMESPACE]!("inline", {
      elementOrSelector: "#zonik-cal-embed",
      calLink: CAL_LINK,
      config: {
        layout: "month_view",
        theme: "light",
      },
    });

    Cal.ns![CAL_NAMESPACE]!("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      styles: { branding: { brandColor: BRAND } },
      cssVarsPerTheme: {
        light: {
          "cal-brand": BRAND,
          "cal-brand-emphasis": BRAND_DARK,
          "cal-brand-text": "#ffffff",
          "cal-brand-subtle": "#c7c4fe",
          "cal-text-emphasis": BRAND_DARK,
          "cal-bg": "#ffffff",
          "cal-bg-emphasis": "#eeedff",
        },
      },
    });
  }, [accepted]);

  if (!ready || !accepted) {
    return (
      <div className="flex min-h-[280px] w-full flex-col items-center justify-center gap-4 bg-white px-6 py-16 text-center">
        <p className="max-w-md text-sm leading-relaxed text-muted">{t.consent.calWait}</p>
        <Button size="sm" onClick={accept} disabled={!ready}>
          {t.consent.calAccept}
        </Button>
      </div>
    );
  }

  return (
    <div
      id="zonik-cal-embed"
      className="min-h-[720px] w-full overflow-auto bg-white"
    />
  );
}
