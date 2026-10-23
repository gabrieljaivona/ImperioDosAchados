import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { ProductsClient } from "@/components/ProductsClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Todas as Ofertas e Achadinhos",
  description: "Busque e filtre as melhores ofertas por loja.",
};

export const dynamic = "force-dynamic";

export default async function ProdutosPage() {
  const products = await getProducts();

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

      <ProductsClient products={products} />
    </div>
  );
}
