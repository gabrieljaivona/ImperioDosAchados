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

/** Lista para /produtos, limitada para não sobrecarregar o banco. */
export const getProducts = unstable_cache(
  async (limit: number = 100): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      select: productSelect,
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return rows.map(toProduct);
  },
  ["products:list"],
  cacheOpts
);

/** Destaques: os mais recentes. */
export const getFeaturedProducts = unstable_cache(
  async (limit: number = 8): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      select: productSelect,
      orderBy: { createdAt: "desc" },
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
      orderBy: [{ discountPercentage: "desc" }, { createdAt: "desc" }],
      take: limit,
    });
    return rows.map(toProduct);
  },
  ["products:flash"],
  cacheOpts
);
