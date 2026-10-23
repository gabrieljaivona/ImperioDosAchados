import Link from "next/link";
import { Crown } from "lucide-react";

const LINKS = [
  { label: "Produtos", href: "/produtos" },
  { label: "Cupons", href: "/cupons" },
  { label: "Sobre", href: "/sobre" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-imperio-bronze bg-imperio-surface">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-imperio-gold"
          >
            <Crown size={22} className="text-imperio-action" />
            Império Dos Achados
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-imperio-muted">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-imperio-action"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-8 border-t border-imperio-bronze/50 pt-6 text-center text-xs leading-relaxed text-imperio-muted">
          Como afiliados, podemos receber comissão por compras realizadas através
          dos links deste site, sem custo adicional para você. Preços e
          disponibilidade podem mudar a qualquer momento nas lojas parceiras.
          <br />© {new Date().getFullYear()} Império Dos Achados.
        </p>
      </div>
    </footer>
  );
}
