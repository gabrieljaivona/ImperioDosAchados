import Link from "next/link";
import { ArrowRight, Headphones, Sparkles, Tag, Zap } from "lucide-react";
import { CompactProductCard } from "@/components/CompactProductCard";
import { VipCTAButton } from "@/components/VipCTAButton";
import { getFeaturedProducts, getFlashProducts } from "@/lib/products";
import type { Product } from "@/types";

const CATEGORIES = [
  { emoji: "🔥", label: "Em Alta" },
  { emoji: "🍳", label: "Cozinha Prática" },
  { emoji: "🏠", label: "Organização" },
  { emoji: "✨", label: "Cuidado Pessoal" },
  { emoji: "📦", label: "Utilidades" },
];

const GRID =
  "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={GRID}>
      {products.map((p) => (
        <CompactProductCard
          key={p.id}
          imageUrl={p.image}
          title={p.title}
          originalPrice={p.originalPrice}
          discountPercentage={p.discountPercentage}
          discountPrice={p.price}
          store={p.store}
          affiliateLink={p.affiliateLink}
        />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const [flash, featured] = await Promise.all([
    getFlashProducts(4),
    getFeaturedProducts(8),
  ]);

  return (
    <div className="bg-imperio-bg transition-colors">
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

      {/* Categorias rápidas */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap">
          {CATEGORIES.map(({ emoji, label }) => (
            <Link
              key={label}
              href="/produtos"
              className="shrink-0 rounded-full border border-imperio-bronze bg-imperio-surface px-4 py-2 text-sm font-medium text-imperio-text transition-colors hover:border-imperio-gold"
            >
              {emoji} {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Ofertas Relâmpago */}
      <section className="mt-10 bg-imperio-surface py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-extrabold text-imperio-text">
            <Zap className="text-orange-500" />
            Ofertas Relâmpago
          </h2>
          <ProductGrid products={flash} />
        </div>
      </section>

      {/* Destaques da Semana */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="mb-4 text-2xl font-extrabold text-imperio-text">
          Destaques da Semana
        </h2>
        <ProductGrid products={featured} />
      </section>

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
