import type { Metadata } from "next";
import { Ticket } from "lucide-react";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { CuponsClient } from "@/components/CuponsClient";
import { JsonLd } from "@/components/JsonLd";
import { getCoupons } from "@/lib/coupons";
import { getStoreConfig } from "@/lib/stores";
import { SITE_URL } from "@/lib/site";

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
  },
};

export const dynamic = "force-dynamic";

export default async function Cupons() {
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
    <div className="mx-auto w-full max-w-7xl bg-imperio-bg p-4 sm:p-6">
      <JsonLd data={jsonLd} />
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
      <CuponsClient coupons={coupons} />
    </div>
  );
}
