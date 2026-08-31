import { Heart } from "lucide-react";
import { products } from "../data/products";
import { useStore } from "../store/StoreContext";
import { ProductGrid } from "../components/product/ProductGrid";
import { EmptyState } from "../components/common/EmptyState";
import { Reveal } from "../components/common/Section";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function FavoritesPage() {
  const { favorites } = useStore();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  useDocumentMeta({
    title: "Избранное — Fatima Noor",
    description: "Ароматы, которые вы добавили в избранное. Сохраняются в этом браузере.",
  });

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
          Избранное
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink-950 sm:text-5xl">
          Отложенные ароматы
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite-400">
          Избранное сохраняется в вашем браузере — вернитесь к нему в любой момент.
        </p>
      </header>

      {favoriteProducts.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<Heart size={30} strokeWidth={1.4} aria-hidden />}
            title="Пока пусто"
            description="Нажмите на сердечко у любого аромата, чтобы сохранить его здесь."
            action={{ label: "Найти аромат", to: "/catalog" }}
          />
        </div>
      ) : (
        <Reveal className="mt-10">
          <ProductGrid products={favoriteProducts} density="compact" />
        </Reveal>
      )}
    </main>
  );
}
