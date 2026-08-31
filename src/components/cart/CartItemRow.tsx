import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { CartEntry } from "../../utils/catalog";
import { formatPrice, formatVolume } from "../../utils/format";
import { useStore } from "../../store/StoreContext";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { PerfumeArt } from "../common/PerfumeArt";
import { QtyStepper } from "./QtyStepper";

/** Строка товара в корзине. */
export function CartItemRow({ item }: { item: CartEntry }) {
  const { updateQty, removeFromCart } = useStore();

  return (
    <article className="flex gap-4 rounded-2xl border border-ink-950/8 bg-cream-100 p-4 sm:gap-6 sm:p-5">
      <Link
        to={`/product/${item.slug}`}
        className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-ink-800 to-ink-950 sm:h-28 sm:w-28"
        aria-label={`${item.name} — перейти к описанию`}
      >
        <ImageWithFallback
          src={item.thumbnail}
          alt={`Флакон ${item.name}`}
          className="h-full w-full object-cover"
          fallback={<PerfumeArt seed={item.name} palette={item.art} className="h-full w-full p-1.5" />}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-graphite-400">
            {item.brand} · {formatVolume(item.volume)}
          </p>
          <h3 className="mt-1 font-display text-lg font-medium leading-snug text-ink-950">
            <Link to={`/product/${item.slug}`} className="transition-colors hover:text-gold-700">
              {item.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-graphite-400">{item.fragranceFamily}</p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-center sm:gap-2">
          <QtyStepper
            size="sm"
            value={item.qty}
            onChange={(qty) => updateQty(item.id, item.volume, qty)}
          />
          <div className="text-right">
            <p className="font-semibold tabular-nums text-ink-950">
              {formatPrice(item.price * item.qty, item.currency)}
            </p>
            {item.qty > 1 && (
              <p className="text-xs text-graphite-400">
                {formatPrice(item.price, item.currency)} за шт.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.id, item.volume)}
            aria-label={`Удалить ${item.name} из корзины`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-graphite-400 transition-colors hover:bg-bordeaux-700/10 hover:text-bordeaux-600 cursor-pointer"
          >
            <Trash2 size={16} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
