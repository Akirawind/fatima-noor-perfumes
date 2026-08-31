import type { ProductBadge } from "../../types";
import { BADGE_LABELS } from "../../data/categories";
import { cn } from "../../utils/cn";

const badgeStyles: Record<ProductBadge, string> = {
  new: "bg-gold-500/15 text-gold-400 border-gold-500/40",
  bestseller: "bg-bordeaux-700/25 text-[#e8b8b8] border-bordeaux-600/60",
  exclusive: "bg-ink-800/80 text-gold-300 border-gold-500/30",
  sale: "bg-bordeaux-700 text-cream-100 border-transparent",
};

export function Badge({
  badge,
  className,
}: {
  badge: ProductBadge;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm",
        badgeStyles[badge],
        className,
      )}
    >
      {BADGE_LABELS[badge]}
    </span>
  );
}
