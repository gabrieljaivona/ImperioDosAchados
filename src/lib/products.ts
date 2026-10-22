import "server-only";
import { prisma } from "@/lib/db";
import type { Product } from "@/types";

type Row = Awaited<ReturnType<typeof prisma.product.findMany>>[number];

function toProduct(row: Row): Product {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    price: Number(row.price),
    originalPrice: row.originalPrice === null ? null : Number(row.originalPrice),
    discountPercentage: row.discountPercentage,
    store: row.store,
    affiliateLink: row.affiliateLink,
    featured: row.featured,
  };
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toProduct);
}

/** Destaques: os mais recentes. */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  return rows.map(toProduct);
}

/** Ofertas Relâmpago: maior desconto primeiro. */
export async function getFlashProducts(limit = 4): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: [{ discountPercentage: "desc" }, { createdAt: "desc" }],
    take: limit,
  });
  return rows.map(toProduct);
}
