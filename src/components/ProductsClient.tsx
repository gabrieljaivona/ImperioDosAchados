"use client";

import { useMemo, useState } from "react";
import { PackageSearch, Search, X } from "lucide-react";
import { CompactProductCard } from "@/components/CompactProductCard";
import { getStoreConfig, type Store } from "@/lib/stores";
import type { Product } from "@/types";

type StoreFilter = Store | "todas";

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function ProductsClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [store, setStore] = useState<StoreFilter>("todas");

  const storeFilters = useMemo(
    () => [
      { value: "todas" as StoreFilter, label: "Todas" },
      ...[...new Set(products.map((p) => p.store))].sort().map((s) => ({
        value: s as StoreFilter,
        label: getStoreConfig(s).label,
      })),
    ],
    [products]
  );

  const filtered = useMemo(() => {
    const term = normalize(query.trim());
    return products.filter(
      (p) =>
        (store === "todas" || p.store === store) &&
        (!term || normalize(p.title).includes(term))
    );
  }, [products, query, store]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-imperio-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar produto..."
          aria-label="Buscar produto"
          className="w-full rounded-xl border border-imperio-bronze bg-imperio-surface py-2.5 pl-10 pr-10 text-sm text-imperio-text placeholder:text-imperio-muted focus:border-imperio-gold focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-imperio-muted hover:text-imperio-text"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {storeFilters.map(({ value, label }) => {
          const active = store === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setStore(value)}
              aria-pressed={active}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-imperio-gold bg-imperio-gold text-zinc-950"
                  : "border-imperio-bronze bg-imperio-surface text-imperio-text hover:border-imperio-gold"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-imperio-muted">
        {filtered.length} {filtered.length === 1 ? "oferta" : "ofertas"}{" "}
        encontradas
      </p>

      {filtered.length > 0 ? (
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((p) => (
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
        </section>
      ) : (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-imperio-muted">
          <PackageSearch size={40} />
          <p className="text-sm">Nenhuma oferta encontrada para esses filtros.</p>
        </div>
      )}
    </div>
  );
}
