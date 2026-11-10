import "server-only";
import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DATA_REVALIDATE, PRODUCTS_TAG } from "@/lib/cache-tags";
import type { Product } from "@/types";

/** Só os campos que os cards exibem. */
const productSelect = {
  id: true,
  title: true,
  image: true,
  price: true,
  originalPrice: true,
  discountPercentage: true,
  store: true,
  affiliateLink: true,
  featured: true,
  category: true,
} satisfies Prisma.ProductSelect;

type Row = Prisma.ProductGetPayload<{ select: typeof productSelect }>;

// Decimal -> number aqui dentro: o unstable_cache serializa o resultado em JSON.
function toProduct(row: Row): Product {
  return {
    ...row,
    price: Number(row.price),
    originalPrice: row.originalPrice === null ? null : Number(row.originalPrice),
  };
}

const cacheOpts = { tags: [PRODUCTS_TAG], revalidate: DATA_REVALIDATE };

/** Ofertas que o bot não reenviou nesse período somem do site. */
const OFFER_TTL_MS = 3 * 24 * 60 * 60 * 1000;

/**
 * Só ofertas atualizadas pelo bot nos últimos 3 dias. Calculado dentro da
 * função cacheada, então o corte pode atrasar até DATA_REVALIDATE segundos.
 */
function freshOffers(): Prisma.ProductWhereInput {
  return { updatedAt: { gte: new Date(Date.now() - OFFER_TTL_MS) } };
}

/** Lista para /produtos, limitada para não sobrecarregar o banco. */
export const getProducts = unstable_cache(
  async (limit: number = 100): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      select: productSelect,
      where: freshOffers(),
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return rows.map(toProduct);
  },
  ["products:list"],
  cacheOpts
);

/**
 * Destaques: os mais recentes. `excludeIds` recebe os IDs já exibidos em
 * Ofertas Relâmpago, para o mesmo produto não aparecer duas vezes na home.
 */
export const getFeaturedProducts = unstable_cache(
  async (limit: number = 8, excludeIds: string[] = []): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      select: productSelect,
      where: {
        ...freshOffers(),
        ...(excludeIds.length > 0 && { id: { notIn: excludeIds } }),
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return rows.map(toProduct);
  },
  ["products:featured"],
  cacheOpts
);

/** Ofertas Relâmpago: maior desconto primeiro. */
export const getFlashProducts = unstable_cache(
  async (limit: number = 4): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      select: productSelect,
      where: freshOffers(),
      orderBy: [{ discountPercentage: "desc" }, { updatedAt: "desc" }],
      take: limit,
    });
    return rows.map(toProduct);
  },
  ["products:flash"],
  cacheOpts
);
