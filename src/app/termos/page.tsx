import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do Império Dos Achados.",
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-6">
      <h1 className="text-2xl font-bold text-imperio-gold">Termos de Uso</h1>
      <p className="text-imperio-text">
        O Império Dos Achados é um agregador de ofertas e cupons. Não vendemos
        produtos: ao clicar em uma oferta você é redirecionado à loja parceira,
        onde a compra é realizada.
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Preços e disponibilidade</h2>
      <p className="text-imperio-muted">
        Preços, descontos, estoque e validade de cupons podem mudar a qualquer
        momento e são de responsabilidade das lojas. Confirme sempre os valores
        no site da loja antes de comprar.
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Afiliados</h2>
      <p className="text-imperio-muted">
        Podemos receber comissão por compras feitas pelos nossos links, sem
        custo adicional para você.
      </p>
      <h2 className="text-lg font-semibold text-imperio-text">Responsabilidade</h2>
      <p className="text-imperio-muted">
        O conteúdo é fornecido como está, sem garantia de disponibilidade
        contínua. Não nos responsabilizamos por transações realizadas nas lojas
        parceiras.
      </p>
    </div>
  );
}
