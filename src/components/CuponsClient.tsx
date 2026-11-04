"use client";

import { useEffect, useRef, useState } from "react";
import { TicketX } from "lucide-react";
import { CouponCard } from "@/components/CouponCard";
import { VipCTAButton } from "@/components/VipCTAButton";
import { getStoreConfig, type Store } from "@/lib/stores";
import type { Coupon } from "@/types";

type StoreFilter = Store | "todos";

const PAGE_SIZE = 20;

export function CuponsClient({ coupons }: { coupons: Coupon[] }) {
  const [store, setStore] = useState<StoreFilter>("todos");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observerTarget = useRef<HTMLDivElement>(null);

  const storeFilters: { value: StoreFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    ...[...new Set(coupons.map((c) => c.store))].sort().map((s) => ({
      value: s,
      label: getStoreConfig(s).label,
    })),
  ];

  const visible =
    store === "todos" ? coupons : coupons.filter((c) => c.store === store);

  const displayedCoupons = visible.slice(0, visibleCount);
  const hasMore = visibleCount < visible.length;

  // Volta ao início da lista quando o filtro muda (ajuste durante o render).
  const filterKey = store;
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
            Nenhum cupom disponível no momento.
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
