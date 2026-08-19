"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { readSiteConsent, writeSiteConsent } from "@/lib/consent";

type ConsentContextValue = {
  ready: boolean;
  accepted: boolean;
  accept: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(readSiteConsent());
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    writeSiteConsent();
    setAccepted(true);
  }, []);

  return (
    <ConsentContext.Provider value={{ ready, accepted, accept }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useSiteConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useSiteConsent must be used within ConsentProvider");
  }
  return context;
}
