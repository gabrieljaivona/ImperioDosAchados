"use client";

import { useState } from "react";
import { TicketX } from "lucide-react";
import { CouponCard } from "@/components/CouponCard";
import { VipCTAButton } from "@/components/VipCTAButton";
import { getStoreConfig, type Store } from "@/lib/stores";
import type { Coupon } from "@/types";

type StoreFilter = Store | "todos";

export function CuponsClient({ coupons }: { coupons: Coupon[] }) {
  const [store, setStore] = useState<StoreFilter>("todos");

  const storeFilters: { value: StoreFilter; label: string }[] = [
    { value: "todos", label: "Todos" },
    ...[...new Set(coupons.map((c) => c.store))].sort().map((s) => ({
      value: s,
      label: getStoreConfig(s).label,
    })),
  ];

  const visible =
    store === "todos" ? coupons : coupons.filter((c) => c.store === store);

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
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </section>
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
