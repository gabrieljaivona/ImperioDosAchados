/** Placeholder animado com a mesma estrutura do CouponCard. */
export function CouponCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex animate-pulse flex-col overflow-hidden rounded-2xl border-2 border-dashed border-imperio-bronze bg-imperio-surface"
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="h-5 w-16 rounded-md bg-imperio-bronze/30" />
        <div className="h-9 w-1/2 rounded bg-imperio-bronze/40" />
        <div className="h-4 w-3/4 rounded bg-imperio-bronze/30" />
        <div className="h-3 w-1/3 rounded bg-imperio-bronze/20" />
      </div>
      <div className="border-t-2 border-dashed border-imperio-bronze" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-11 rounded-lg bg-imperio-bronze/30" />
        <div className="flex gap-2">
          <div className="h-9 flex-1 rounded-lg bg-imperio-bronze/30" />
          <div className="h-9 flex-1 rounded-lg bg-imperio-bronze/40" />
        </div>
      </div>
    </div>
  );
}
