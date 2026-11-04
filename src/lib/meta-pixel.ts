export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbqSafe(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

export function trackLead() {
  fbqSafe("track", "Lead");
}

export function trackOfferClick(params: {
  store: string;
  title: string;
  discount: number;
  id: string;
}) {
  fbqSafe("trackCustom", "OfferClick", params);
}

export function trackCouponClick(params: {
  store: string;
  title: string;
  code: string;
  action: "copy" | "go_to_store";
}) {
  fbqSafe("trackCustom", "CouponClick", params);
}
