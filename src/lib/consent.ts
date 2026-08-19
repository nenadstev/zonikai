export const SITE_CONSENT_KEY = "zonik-site-consent";
export const SITE_CONSENT_VALUE = "accepted-v3";

export function readSiteConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SITE_CONSENT_KEY) === SITE_CONSENT_VALUE;
}

export function writeSiteConsent() {
  window.localStorage.setItem(SITE_CONSENT_KEY, SITE_CONSENT_VALUE);
}
