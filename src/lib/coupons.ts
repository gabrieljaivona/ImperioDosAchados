import "server-only";
import { prisma } from "@/lib/db";
import type { Store } from "@/lib/stores";
import type { Coupon } from "@/types";

export async function getCoupons(store?: Store): Promise<Coupon[]> {
  const rows = await prisma.coupon.findMany({
    where: {
      ...(store && { store }),
      OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
    },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((c) => ({
    id: c.id,
    store: c.store,
    title: c.title,
    discount: c.discount,
    code: c.code,
    link: c.link,
    expiresAt: c.expiresAt ? c.expiresAt.toISOString().slice(0, 10) : null,
  }));
}
