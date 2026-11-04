"use client";

import { useEffect, useRef, useState } from "react";
import { Search, TicketX, X } from "lucide-react";
import { CouponCard } from "@/components/CouponCard";
import { VipCTAButton } from "@/components/VipCTAButton";
import { getStoreConfig, type Store } from "@/lib/stores";
import type { Coupon } from "@/types";

type StoreFilter = Store | "todos";

const PAGE_SIZE = 20;

export function CuponsClient({ coupons }: { coupons: Coupon[] }) {
  const [store, setStore] = useState<StoreFilter>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observerTarget = useRef<HTMLDivElement>(null);

  const storeFilters: { value: StoreFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    ...[...new Set(coupons.map((c) => c.store))].sort().map((s) => ({
      value: s,
      label: getStoreConfig(s).label,
    })),
  ];

  // Cupom não tem "description": busca em título, desconto e código.
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visible = coupons.filter((c) => {
    if (store !== "todos" && c.store !== store) return false;
    if (!normalizedQuery) return true;
    return [c.title, c.discount, c.code].some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    );
  });

  const displayedCoupons = visible.slice(0, visibleCount);
  const hasMore = visibleCount < visible.length;

  // Volta ao início da lista quando o filtro muda (ajuste durante o render).
  const filterKey = `${store}|${searchQuery}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (filterKey !== lastFilterKey) {
    setLastFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  // Scroll infinito: revela mais cupons quando o alvo entra na tela.
  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + PAGE_SIZE);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-imperio-muted"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar cupom..."
          aria-label="Buscar cupom"
          className="w-full rounded-xl border border-imperio-bronze bg-imperio-surface py-2.5 pl-10 pr-10 text-sm text-imperio-text placeholder:text-imperio-muted focus:border-imperio-gold focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            aria-label="Limpar busca"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-imperio-muted hover:text-imperio-text"
          >
            <X size={18} />
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

      {visible.length > 0 ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {displayedCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </section>
          <div ref={observerTarget} className="flex justify-center p-4">
            {hasMore && (
              <span className="text-xs text-imperio-muted" role="status">
                Carregando mais...
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-imperio-bronze py-14 text-center">
          <TicketX size={40} className="text-imperio-muted" />
          <p className="text-imperio-text">
            {searchQuery || store !== "todos"
              ? "Nenhum cupom encontrado para essa busca."
              : "Nenhum cupom disponível no momento."}
          </p>
          <p className="max-w-sm px-4 text-sm text-imperio-muted">
            Entre no grupo VIP e peça o cupom da sua loja favorita.
          </p>
          <VipCTAButton label="Pedir cupom no Grupo VIP" />
        </div>
      )}
    </div>
  );
}
