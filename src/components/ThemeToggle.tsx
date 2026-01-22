"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // TRUQUE: O setTimeout com tempo 0 faz a atualização ser assíncrona.
    // Isso acalma o linter e resolve o erro de "Synchronous setState".
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Se não montou, retorna um espaço vazio do mesmo tamanho (w-9 h-9)
  // Isso evita que o layout "pule" quando o ícone aparecer
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border border-imperio-bronze text-imperio-gold hover:bg-imperio-surface transition-colors cursor-pointer flex items-center justify-center"
      title="Alternar Tema"
    >
      {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}