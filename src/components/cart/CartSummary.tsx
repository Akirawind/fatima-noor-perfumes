import { useState, type FormEvent } from "react";
import { BadgePercent } from "lucide-react";
import type { CartEntry } from "../../utils/catalog";
import { formatPrice } from "../../utils/format";
import { findPromoCode } from "../../utils/promo";
import { DELIVERY, SITE } from "../../data/site";
import { useStore } from "../../store/StoreContext";

/** Итоги заказа: скидка по промокоду, доставка, сумма. */
export function CartSummary({
  items,
  onCheckout,
}: {
  items: CartEntry[];
  onCheckout: () => void;
}) {
  const { showToast } = useStore();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(
    null,
  );

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const delivery =
    items.length === 0 || afterDiscount >= DELIVERY.freeFrom ? 0 : DELIVERY.cost;
  const total = afterDiscount + delivery;

  function applyPromo(event: FormEvent) {
    event.preventDefault();
    const promo = findPromoCode(promoInput);
    if (!promo) {
      showToast("Промокод не найден", "heart-off");
      return;
    }
    setAppliedPromo(promo);
    showToast(`Промокод ${promo.code} применён: −${promo.percent}%`, "check");
  }

  function buildOrderMessage(): string {
    const lines = items.map((item) => {
      return `• ${item.name} (${item.volume} мл) × ${item.qty} — ${formatPrice(item.price * item.qty)}`;
    });
    const linesText = lines.join("\n");
    return [
      "🛍 *Новый заказ — Fatima Noor*",
      "",
      linesText,
      "",
      `💰 Итого: ${formatPrice(total)}`,
      appliedPromo ? `🏷 Промокод: ${appliedPromo.code} (−${appliedPromo.percent}%)` : "",
      delivery === 0 ? "🚚 Доставка: бесплатно" : `🚚 Доставка: ${formatPrice(delivery)}`,
      "",
      "📞 Телефон: " + SITE.phone,
      "✉️ Почта: " + SITE.email,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function handleCheckout() {
    const message = buildOrderMessage();
    const encoded = encodeURIComponent(message);
    const tgUrl = `https://t.me/perfume_shop_msk?text=${encoded}`;
    window.open(tgUrl, "_blank", "noopener,noreferrer");
    onCheckout();
  }

  return (
    <aside className="rounded-2xl border border-ink-950/10 bg-cream-100 p-6 lg:sticky lg:top-28">
      <h2 className="font-display text-2xl font-medium text-ink-950">Итого</h2>

      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-graphite-400">Товары</dt>
          <dd className="tabular-nums text-ink-950">{formatPrice(subtotal)}</dd>
        </div>
        {appliedPromo && (
          <div className="flex justify-between text-bordeaux-600">
            <dt>Скидка «{appliedPromo.code}»</dt>
            <dd className="tabular-nums">−{formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-graphite-400">Доставка</dt>
          <dd className={delivery === 0 ? "text-gold-700" : "tabular-nums text-ink-950"}>
            {delivery === 0
              ? afterDiscount > 0
                ? "Бесплатно"
                : "—"
              : formatPrice(delivery)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-ink-950/10 pt-4">
          <dt className="font-semibold text-ink-950">К оплате</dt>
          <dd className="text-lg font-bold tabular-nums text-ink-950">{formatPrice(total)}</dd>
        </div>
      </dl>

      <form onSubmit={applyPromo} className="mt-5 flex gap-2" noValidate>
        <label htmlFor="promo" className="sr-only">
          Промокод
        </label>
        <div className="relative flex-1">
          <BadgePercent
            size={15}
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400"
          />
          <input
            id="promo"
            type="text"
            value={promoInput}
            onChange={(event) => setPromoInput(event.target.value)}
            placeholder="Промокод (NOOR10)"
            className="w-full rounded-lg border border-ink-950/15 bg-transparent py-2.5 pl-9 pr-3 text-sm uppercase tracking-wide placeholder:normal-case placeholder:text-graphite-400/60 focus:border-gold-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg border border-ink-950/15 px-4 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-gold-500 hover:text-gold-700 cursor-pointer"
        >
          ОК
        </button>
      </form>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={items.length === 0}
        className="mt-6 w-full rounded-full bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 transition-all hover:bg-ink-800 hover:shadow-lg disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
      >
        Оформить заказ
      </button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-graphite-400">
        Заказ будет отправлен через Telegram. Бесплатная доставка при заказе от {formatPrice(DELIVERY.freeFrom)}.
      </p>
    </aside>
  );
}
