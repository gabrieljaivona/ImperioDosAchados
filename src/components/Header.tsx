"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VipCTAButton } from "@/components/VipCTAButton";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Cupons", href: "/cupons" },
  { label: "Sobre", href: "/sobre" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-imperio-bronze bg-imperio-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-imperio-gold"
        >
          <Crown size={22} className="text-imperio-action" />
          Império Dos Achados
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-imperio-muted md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-imperio-action"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <VipCTAButton className="hidden sm:inline-flex" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-imperio-bronze text-imperio-gold md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-imperio-bronze/50 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-medium text-imperio-text hover:bg-imperio-surface"
            >
              {link.label}
            </Link>
          ))}
          <VipCTAButton className="mt-2 w-full sm:hidden" />
        </nav>
      )}
    </header>
  );
}
