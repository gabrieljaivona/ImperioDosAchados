"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, setConsent, subscribeConsent } from "@/lib/consent";

export function CookieBanner() {
  // No servidor assume "granted" para não renderizar o banner no HTML inicial.
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => "granted");

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-imperio-bronze bg-imperio-surface p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-imperio-muted">
          Usamos cookies de medição (Meta Pixel) para entender o uso do site.
          Saiba mais na{" "}
          <Link href="/privacidade" className="text-imperio-gold underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-md border border-imperio-bronze px-4 py-2 text-sm text-imperio-text transition-colors hover:border-imperio-action"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-md bg-imperio-action px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
