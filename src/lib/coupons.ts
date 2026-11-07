import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { COUPONS_TAG, DATA_REVALIDATE } from "@/lib/cache-tags";
import type { Store } from "@/lib/stores";
import type { Coupon } from "@/types";

/**
 * Cupons não expirados. Com o cache, um cupom recém-expirado pode aparecer
 * por até DATA_REVALIDATE segundos.
 */
export const getCoupons = unstable_cache(
  async (store?: Store): Promise<Coupon[]> => {
    const rows = await prisma.coupon.findMany({
      select: {
        id: true,
        store: true,
        title: true,
        discount: true,
        code: true,
        link: true,
        expiresAt: true,
      },
      where: {
        ...(store && { store }),
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return rows.map((c) => ({
      ...c,
      expiresAt: c.expiresAt ? c.expiresAt.toISOString().slice(0, 10) : null,
    }));
  },
  ["coupons:list"],
  { tags: [COUPONS_TAG], revalidate: DATA_REVALIDATE }
);
