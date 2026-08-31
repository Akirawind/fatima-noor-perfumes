import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";
import { hydrateCart } from "../utils/catalog";
import { useStore } from "../store/StoreContext";
import { CartItemRow } from "../components/cart/CartItemRow";
import { CartSummary } from "../components/cart/CartSummary";
import { EmptyState } from "../components/common/EmptyState";
import { Reveal } from "../components/common/Section";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { SITE } from "../data/site";

export function CartPage() {
  const { cart, clearCart } = useStore();
  const [orderSent, setOrderSent] = useState(false);

  useDocumentMeta({
    title: orderSent
      ? `Заказ оформлен — Fatima Noor`
      : "Корзина — Fatima Noor",
    description: "Ваша корзина: проверьте состав заказа и оформите доставку.",
  });

  const items = hydrateCart(cart);

  function handleCheckout() {
    setOrderSent(true);
    clearCart();
  }

  if (orderSent) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 pb-24 pt-40 text-center sm:px-6">
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/50 bg-gold-500/10 text-gold-600">
          <CheckCircle2 size={36} strokeWidth={1.4} aria-hidden />
        </span>
        <h1 className="mt-8 font-display text-4xl font-medium text-ink-950">
          Заказ отправлен!
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-graphite-400">
          Ваш заказ открыт в Telegram. Напишите нам, и мы уточним детали доставки и оплаты.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 transition-colors hover:bg-ink-800"
          >
            <MessageCircle size={15} aria-hidden />
            Написать в Telegram
          </a>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center rounded-full border border-ink-950/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-colors hover:bg-ink-950 hover:text-cream-50"
          >
            Продолжить покупки
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
          Корзина
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink-950 sm:text-5xl">
          Ваш выбор
        </h1>
      </header>

      {items.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<ShoppingBag size={30} strokeWidth={1.4} aria-hidden />}
            title="Корзина пуста"
            description="Похоже, вы ещё не выбрали аромат. Загляните в каталог — там ждёт что-то незабываемое."
            action={{ label: "Перейти в каталог", to: "/catalog" }}
          />
        </div>
      ) : (
        <Reveal className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
          <section aria-label="Товары в корзине" className="space-y-4">
            {items.map((item) => (
              <CartItemRow key={`${item.id}-${item.volume}`} item={item} />
            ))}
            <p className="pt-2 text-center text-xs text-graphite-400 lg:text-left">
              Цена и состав заказа пересчитываются автоматически.
            </p>
          </section>
          <CartSummary items={items} onCheckout={handleCheckout} />
        </Reveal>
      )}
    </main>
  );
}
