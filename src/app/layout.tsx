import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MetaPixel } from "@/components/MetaPixel";
import { CookieBanner } from "@/components/CookieBanner";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Império Dos Achados",
    template: "%s | Império Dos Achados",
  },
  description: "As melhores ofertas da internet em um só lugar.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Império Dos Achados",
    title: "Império Dos Achados",
    description: "As melhores ofertas da internet em um só lugar.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Império Dos Achados",
    description: "As melhores ofertas da internet em um só lugar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MetaPixel />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
