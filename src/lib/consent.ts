const KEY = "cookie-consent";

export type Consent = "granted" | "denied" | null;

const listeners = new Set<() => void>();

export function getConsent(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // armazenamento indisponível: vale só para esta sessão
  }
  listeners.forEach((fn) => fn());
}

export function subscribeConsent(fn: () => void) {
  listeners.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", fn);
  };
}
