import type { Store } from "@/lib/stores";

export interface Product {
  id: string;
  title: string;
  image: string;
  /** Preço "de", opcional; só exibido. */
  originalPrice?: number | null;
  price: number;
  /** Calculado pelo bot; o front só exibe. */
  discountPercentage: number;
  store: Store;
  affiliateLink: string;
  featured: boolean;
}

export interface Coupon {
  id: string;
  store: Store;
  title: string;
  discount: string;
  code: string;
  link: string;
  /** Data ISO (YYYY-MM-DD) ou null quando sem validade definida. */
  expiresAt: string | null;
}
