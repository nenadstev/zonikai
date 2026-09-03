"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionary";

const STORAGE_KEY = "zonik-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "sr") {
      window.localStorage.setItem(STORAGE_KEY, "en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

  const setLocale = (next: Locale) => {
    if (next !== "en") return;
    setLocaleState("en");
    window.localStorage.setItem(STORAGE_KEY, "en");
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return context;
}
