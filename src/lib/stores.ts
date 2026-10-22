/** Texto livre (slug normalizado); lojas novas podem chegar do bot a qualquer momento. */
export type Store = string;

const KNOWN_STORES: Record<string, { label: string; className: string }> = {
  shopee: {
    label: "Shopee",
    className: "bg-orange-600 text-white",
  },
  amazon: {
    label: "Amazon",
    className: "bg-zinc-800 text-amber-400",
  },
  mercadolivre: {
    label: "Mercado Livre",
    className: "bg-yellow-400 text-zinc-900",
  },
  magalu: {
    label: "Magalu",
    className: "bg-blue-600 text-white",
  },
  aliexpress: {
    label: "AliExpress",
    className: "bg-red-600 text-white",
  },
};

const FALLBACK_CLASS = "bg-zinc-700 text-white";

export function getStoreConfig(store: Store): { label: string; className: string } {
  return (
    KNOWN_STORES[store] ?? {
      label: store.charAt(0).toUpperCase() + store.slice(1),
      className: FALLBACK_CLASS,
    }
  );
}
