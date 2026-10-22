import Image from "next/image";
import { ExternalLink, Tag } from "lucide-react";
import { getStoreConfig, type Store } from "@/lib/stores";

interface CompactProductCardProps {
  imageUrl: string;
  title: string;
  originalPrice?: number | null;
  discountPrice: number;
  discountPercentage: number;
  store: Store;
  affiliateLink: string;
}

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function CompactProductCard({
  imageUrl,
  title,
  originalPrice,
  discountPrice,
  discountPercentage,
  store,
  affiliateLink,
}: CompactProductCardProps) {
  const storeConfig = getStoreConfig(store);

  return (
    <a
      href={affiliateLink}
      target="_blank"
      rel="sponsored noopener"
      className="group flex flex-col overflow-hidden rounded-xl border border-imperio-bronze bg-imperio-surface transition-colors hover:border-imperio-gold"
    >
      <div className="relative aspect-square w-full bg-imperio-bg">
        <span
          className={`absolute left-1.5 top-1.5 z-10 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${storeConfig.className}`}
        >
          {storeConfig.label}
        </span>

        {discountPercentage > 0 && (
          <span className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            <Tag size={10} />
            -{discountPercentage}%
          </span>
        )}

        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm text-imperio-text">
          {title}
        </h3>

        <div className="mt-auto flex flex-col">
          {originalPrice && originalPrice > discountPrice && (
            <span className="text-[11px] text-imperio-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          <div className="flex items-center justify-between gap-1">
            <span className="text-base font-bold text-imperio-gold">
              {formatPrice(discountPrice)}
            </span>
            <ExternalLink
              size={14}
              className="text-orange-500 transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </a>
  );
}
