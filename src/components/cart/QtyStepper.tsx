import { Minus, Plus } from "lucide-react";
import { cn } from "../../utils/cn";

/** Степпер количества: крупный для страницы товара, компактный для корзины. */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  label = "Количество",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}) {
  const buttonClass =
    "flex h-full w-9 items-center justify-center text-graphite-400 transition-colors hover:text-gold-700 disabled:pointer-events-none disabled:opacity-30 cursor-pointer";
  const dimension =
    size === "sm" ? "h-9" : "h-12";
  const iconSize = size === "sm" ? 14 : 17;

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border border-ink-950/15",
        dimension,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${label}: уменьшить`}
        className={buttonClass}
      >
        <Minus size={iconSize} aria-hidden />
      </button>
      <span
        aria-live="polite"
        aria-label={label}
        className={cn(
          "min-w-8 text-center font-medium tabular-nums",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${label}: увеличить`}
        className={buttonClass}
      >
        <Plus size={iconSize} aria-hidden />
      </button>
    </div>
  );
}
