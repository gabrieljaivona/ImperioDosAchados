/** Placeholder animado com a mesma estrutura do CompactProductCard. */
export function ProductCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-imperio-bronze bg-imperio-surface"
    >
      <div className="aspect-square w-full bg-imperio-bronze/30" />
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="h-3.5 w-full rounded bg-imperio-bronze/30" />
        <div className="h-3.5 w-2/3 rounded bg-imperio-bronze/30" />
        <div className="mt-3 h-2.5 w-1/3 rounded bg-imperio-bronze/20" />
        <div className="h-5 w-1/2 rounded bg-imperio-bronze/40" />
      </div>
    </div>
  );
}
