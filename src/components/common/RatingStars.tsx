import { Star } from "lucide-react";
import { cn } from "../../utils/cn";

/** Звёздный рейтинг с дробным заполнением через наложение слоёв. */
export function RatingStars({
  rating,
  size = 14,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, rating));
  const percent = (clamped / 5) * 100;

  return (
    <span
      className={cn("relative inline-flex", className)}
      role="img"
      aria-label={`Рейтинг ${rating.toFixed(1)} из 5`}
    >
      <span className="flex gap-0.5 text-gold-500/25">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} size={size} strokeWidth={1.5} aria-hidden />
        ))}
      </span>
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-gold-500"
        style={{ width: `${percent}%` }}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={size}
            strokeWidth={1.5}
            fill="currentColor"
            aria-hidden
          />
        ))}
      </span>
    </span>
  );
}
