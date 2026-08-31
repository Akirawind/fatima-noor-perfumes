import type { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import { cn } from "../../utils/cn";

/** Сетка карточек: размер колонок задаётся пропсом density. */
export function ProductGrid({
  products,
  density = "comfortable",
  className,
}: {
  products: Product[];
  density?: "compact" | "comfortable";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:gap-7",
        density === "compact"
          ? "sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          : "md:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
