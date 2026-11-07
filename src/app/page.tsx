import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Headphones, PackageOpen, Sparkles, Tag, Zap } from "lucide-react";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { CompactProductCard } from "@/components/CompactProductCard";
import { JsonLd } from "@/components/JsonLd";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { VipCTAButton } from "@/components/VipCTAButton";
import { getFeaturedProducts, getFlashProducts } from "@/lib/products";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import type { Product } from "@/types";

const GRID =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function ProductGrid({
  products,
  preloadFirst = 0,
}: {
  products: Product[];
  preloadFirst?: number;
}) {
  return (
    <div className={GRID}>
      {products.map((p, i) => (
        <CompactProductCard
          key={p.id}
          id={p.id}
          imageUrl={p.image}
          title={p.title}
          originalPrice={p.originalPrice}
          discountPercentage={p.discountPercentage}
          discountPrice={p.price}
          store={p.store}
          affiliateLink={p.affiliateLink}
          preload={i < preloadFirst}
        />
      ))}
    </div>
  );
}

function SkeletonGrid({ count }: { count: number }) {
  return (
    <div className={GRID} role="status" aria-label="Carregando ofertas">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

function FlashTitle() {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-2xl font-extrabold text-imperio-text">
      <Zap className="text-orange-500" />
      Ofertas Relâmpago
    </h2>
  );
}

function FeaturedTitle() {
  return (
    <h2 className="mb-4 text-2xl font-extrabold text-imperio-text">
      Destaques da Semana
    </h2>
  );
}

function HomeProductsSkeleton() {
  return (
    <>
      <section className="mt-10 bg-imperio-surface py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FlashTitle />
          <SkeletonGrid count={4} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <FeaturedTitle />
        <SkeletonGrid count={8} />
      </section>
    </>
  );
}

/** Parte que depende do banco: vem por streaming dentro do <Suspense>. */
async function HomeProducts() {
  const [flash, featured] = await Promise.all([
    getFlashProducts(4),
    getFeaturedProducts(8),
  ]);

  if (flash.length === 0 && featured.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-imperio-bronze bg-imperio-surface px-6 py-14 text-center">
          <PackageOpen size={44} className="text-imperio-gold" />
          <h2 className="text-xl font-bold text-imperio-text">
            Novas ofertas chegando
          </h2>
          <p className="max-w-md text-sm text-imperio-muted">
            Ainda não temos achadinhos por aqui. Entre no grupo VIP para
            receber as ofertas assim que elas saírem.
          </p>
          <VipCTAButton />
        </div>
      </section>
    );
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ofertas em destaque",
    itemListElement: [...flash, ...featured].map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.title,
        image: p.image,
        offers: {
          "@type": "Offer",
          url: p.affiliateLink,
          price: p.price,
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      {/* Ofertas Relâmpago */}
      <section className="mt-10 bg-imperio-surface py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FlashTitle />
          <AffiliateNotice />
          <ProductGrid products={flash} preloadFirst={4} />
        </div>
      </section>

      {/* Destaques da Semana */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <FeaturedTitle />
        <ProductGrid products={featured} />
      </section>
    </>
  );
}

const HOME_TITLE = "Império Dos Achados | Promoções, Cupons e Achadinhos";
const HOME_DESCRIPTION =
  "Promoções relâmpago e cupons de Shopee, Amazon, Mercado Livre e Magalu, atualizados todo dia. Entre no grupo VIP e economize antes que acabe!";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Império Dos Achados",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
    images: [OG_IMAGE],
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Império Dos Achados",
    url: SITE_URL,
    inLanguage: "pt-BR",
    description: HOME_DESCRIPTION,
  };

  return (
    <div className="bg-imperio-bg transition-colors">
      <JsonLd data={websiteJsonLd} />
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-imperio-bronze bg-imperio-surface px-3 py-1 text-xs font-medium text-imperio-gold">
            <Sparkles size={14} />
            Achadinhos atualizados todo dia
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-imperio-text sm:text-5xl">
            Encontre os produtos mais{" "}
            <span className="text-imperio-gold">virais</span> com os menores
            preços
          </h1>
          <p className="max-w-xl text-base text-imperio-muted sm:text-lg">
            Garimpamos as melhores ofertas de Shopee, Amazon, Mercado Livre e
            mais. Entre no grupo VIP e receba os achados antes de acabarem.
          </p>
          <VipCTAButton size="lg" />
        </div>

        {/* Mockup flutuante */}
        <div
          aria-hidden
          className="relative mx-auto h-72 w-full max-w-md sm:h-80"
        >
          <div className="absolute inset-0 rounded-full bg-imperio-gold/10 blur-3xl" />
          <div className="absolute left-4 top-6 flex h-40 w-36 -rotate-6 flex-col justify-between rounded-2xl border border-imperio-bronze bg-imperio-surface p-3 shadow-xl">
            <Headphones size={40} className="text-imperio-gold" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-imperio-bronze" />
              <div className="h-2 w-2/3 rounded bg-imperio-bronze" />
              <div className="h-3 w-1/2 rounded bg-imperio-gold" />
            </div>
          </div>
          <div className="absolute right-4 top-0 flex h-44 w-40 rotate-6 flex-col justify-between rounded-2xl border border-imperio-bronze bg-imperio-surface p-3 shadow-xl">
            <span className="self-start rounded-md bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
              -45%
            </span>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-imperio-bronze" />
              <div className="h-2 w-3/4 rounded bg-imperio-bronze" />
              <div className="h-3 w-1/2 rounded bg-imperio-gold" />
            </div>
          </div>
          <div className="absolute bottom-2 left-1/2 flex h-36 w-44 -translate-x-1/2 items-center justify-center rounded-2xl border border-imperio-gold bg-imperio-surface shadow-2xl">
            <Tag size={48} className="text-imperio-action" />
          </div>
        </div>
      </section>

      <Suspense fallback={<HomeProductsSkeleton />}>
        <HomeProducts />
      </Suspense>

      {/* CTA final */}
      <section className="px-4 pb-16 text-center">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 rounded-full bg-imperio-gold px-8 py-4 text-base font-bold text-zinc-950 transition hover:scale-105 active:scale-95"
        >
          Explorar todas as ofertas
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
