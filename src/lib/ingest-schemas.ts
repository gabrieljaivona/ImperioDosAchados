import { z } from "zod";

/** Texto livre, normalizado em slug: "Mercado Livre" / "MercadoLivre" → "mercadolivre". */
const store = z.preprocess(
  (v) =>
    typeof v === "string"
      ? v
          .normalize("NFD")
          .replace(/[̀-ͯ\s_-]/g, "")
          .toLowerCase()
      : v,
  z.string().min(1).max(50)
);

const httpsUrl = z
  .url()
  .max(2048)
  .refine((u) => u.startsWith("https://"), "deve começar com https://");

export const productSchema = z.object({
  store,
  itemId: z.string().min(1).max(128).optional(),
  title: z.string().trim().min(1).max(300),
  image: httpsUrl,
  price: z.number().positive().max(1_000_000),
  originalPrice: z.number().positive().max(1_000_000).nullish(),
  discountPercentage: z.number().int().min(0).max(100),
  rating: z.number().min(0).max(5).nullish(),
  affiliateLink: httpsUrl,
  featured: z.boolean().optional(),
});

export const couponSchema = z.object({
  store,
  title: z.string().trim().min(1).max(300),
  discount: z.string().trim().min(1).max(100),
  code: z.string().trim().min(1).max(100),
  link: httpsUrl,
  expiresAt: z.iso.datetime({ offset: true }).nullish(),
});

export type ProductPayload = z.infer<typeof productSchema>;
export type CouponPayload = z.infer<typeof couponSchema>;
