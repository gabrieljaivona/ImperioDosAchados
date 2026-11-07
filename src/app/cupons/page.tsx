import type { Metadata } from "next";
import { Suspense } from "react";
import { Ticket } from "lucide-react";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { CouponCardSkeleton } from "@/components/CouponCardSkeleton";
import { CuponsClient } from "@/components/CuponsClient";
import { JsonLd } from "@/components/JsonLd";
import { getCoupons } from "@/lib/coupons";
import { getStoreConfig } from "@/lib/stores";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

const TITLE = "Cupons de Desconto Ativos";
const DESCRIPTION =
  "Cupons de desconto da Shopee, Amazon, Mercado Livre e mais, testados e prontos para copiar. Aplique no carrinho e economize!";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/cupons" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Império Dos Achados",
    title: `${TITLE} | Império Dos Achados`,
    description: DESCRIPTION,
    url: "/cupons",
    images: [OG_IMAGE],
  },
};

export const dynamic = "force-dynamic";

async function CouponsList() {
  const coupons = await getCoupons();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/cupons`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "OfferCatalog",
      name: TITLE,
      itemListElement: coupons.slice(0, 50).map((c) => ({
        "@type": "Offer",
        name: c.title,
        description: `${c.discount} — código ${c.code}`,
        url: c.link,
        ...(c.expiresAt ? { validThrough: c.expiresAt } : {}),
        seller: { "@type": "Organization", name: getStoreConfig(c.store).label },
      })),
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <CuponsClient coupons={coupons} />
    </>
  );
}

function CouponsListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando cupons"
      className="flex flex-col gap-6"
    >
      <div className="h-11 animate-pulse rounded-xl border border-imperio-bronze bg-imperio-surface" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-imperio-bronze/30"
          />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <CouponCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Cupons() {
  return (
    <div className="mx-auto w-full max-w-7xl bg-imperio-bg p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-imperio-text sm:text-3xl">
          <Ticket className="text-imperio-gold" />
          Cupons de Desconto Ativos
        </h1>
        <p className="mt-1 text-sm text-imperio-muted">
          Copie o código, vá até a loja e aplique no carrinho para economizar
          ainda mais.
        </p>
      </header>

      <AffiliateNotice />
      <Suspense fallback={<CouponsListSkeleton />}>
        <CouponsList />
      </Suspense>
    </div>
  );
}
