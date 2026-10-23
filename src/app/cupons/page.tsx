import type { Metadata } from "next";
import { Ticket } from "lucide-react";
import { AffiliateNotice } from "@/components/AffiliateNotice";
import { CuponsClient } from "@/components/CuponsClient";
import { getCoupons } from "@/lib/coupons";

export const metadata: Metadata = {
  title: "Cupons de Desconto Ativos",
  description: "Cupons de desconto das principais lojas, atualizados e prontos para copiar.",
};

export const dynamic = "force-dynamic";

export default async function Cupons() {
  const coupons = await getCoupons();

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
      <CuponsClient coupons={coupons} />
    </div>
  );
}
