"use client";

import { useEffect, useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { getStoreConfig } from "@/lib/stores";
import type { Coupon } from "@/types";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);
  const store = getStoreConfig(coupon.store);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro); o código segue visível no card.
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border-2 border-dashed border-imperio-bronze bg-imperio-surface transition-colors hover:border-imperio-gold">
      <div className="flex flex-col gap-2 p-4">
        <span
          className={`self-start rounded-md px-2 py-0.5 text-xs font-bold ${store.className}`}
        >
          {store.label}
        </span>
        <p className="text-3xl font-extrabold leading-tight text-imperio-gold">
          {coupon.discount}
        </p>
        <p className="text-sm text-imperio-text">{coupon.title}</p>
        <p className="text-xs text-imperio-muted">
          {coupon.expiresAt
            ? `Válido até ${formatDate(coupon.expiresAt)}`
            : "Sem data de validade"}
        </p>
      </div>

      {/* Picote: linha tracejada com entalhes laterais */}
      <div className="relative border-t-2 border-dashed border-imperio-bronze">
        <span className="absolute -left-3 -top-3 h-5 w-5 rounded-full bg-imperio-bg" />
        <span className="absolute -right-3 -top-3 h-5 w-5 rounded-full bg-imperio-bg" />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="rounded-lg border border-dashed border-imperio-bronze bg-imperio-bg px-3 py-2 text-center font-mono text-lg font-bold tracking-widest text-imperio-text">
          {coupon.code}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-imperio-bronze px-3 py-2 text-sm font-medium text-imperio-text transition-colors hover:border-imperio-gold"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? "Copiado!" : "Copiar Código"}
          </button>
          <a
            href={coupon.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-imperio-gold px-3 py-2 text-sm font-bold text-zinc-950 transition hover:brightness-110"
          >
            Usar Cupom
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
