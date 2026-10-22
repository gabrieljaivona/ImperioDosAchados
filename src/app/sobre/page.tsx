import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça o Império Dos Achados.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold text-imperio-gold">Sobre nós</h1>
      <p className="text-imperio-text">
        O Império Dos Achados reúne as melhores ofertas e cupons da internet em
        um só lugar, de lojas como Shopee, Amazon, Mercado Livre e Magalu.
      </p>
      <p className="text-imperio-muted">
        Alguns links são de afiliados: se você comprar por eles, podemos receber
        uma comissão, sem custo extra para você.
      </p>
    </div>
  );
}
