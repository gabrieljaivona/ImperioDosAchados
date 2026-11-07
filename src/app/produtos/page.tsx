import type { Metadata } from "next";
import { Suspense } from "react";
import { Flame } from "lucide-react";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { ProductsClient } from "@/components/ProductsClient";
import { getProducts } from "@/lib/products";
import { OG_IMAGE } from "@/lib/site";

const TITLE = "Todas as Promoções e Achadinhos";
const DESCRIPTION =
  "Busque e filtre as melhores promoções de Shopee, Amazon, Mercado Livre e Magalu. Preços baixos atualizados todo dia!";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/produtos" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Império Dos Achados",
    title: `${TITLE} | Império Dos Achados`,
    description: DESCRIPTION,
    url: "/produtos",
    images: [OG_IMAGE],
  },
};

export const dynamic = "force-dynamic";

async function ProductsList() {
  const products = await getProducts();
  return <ProductsClient products={products} />;
}

function ProductsListSkeleton() {
  return (
    <div
      role="status"
      aria-label="Carregando ofertas"
      className="flex flex-col gap-4"
    >
      <div className="h-11 animate-pulse rounded-xl border border-imperio-bronze bg-imperio-surface" />
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-imperio-bronze/30"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <div className="mx-auto w-full max-w-7xl bg-imperio-bg p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-imperio-text sm:text-3xl">
          <Flame className="text-orange-500" />
          Todas as Ofertas e Achadinhos
        </h1>
        <p className="mt-1 text-sm text-imperio-muted">
          Pesquise pelo nome ou filtre pela sua loja favorita.
        </p>
      </header>

      <AffiliateNotice />
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
