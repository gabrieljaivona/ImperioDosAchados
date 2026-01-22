"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Truque de Mestre do TypeScript:
// Em vez de importar "ThemeProviderProps", dizemos:
// "Pegue todos os props que o NextThemesProvider aceita e use aqui"
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}