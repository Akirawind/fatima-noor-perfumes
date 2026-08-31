import type { Product } from "../types";
import { products } from "../data/products";

/** Позиция корзины: товар с конкретным объёмом и количеством. */
export interface CartEntry extends Omit<Product, "volume"> {
  volume: number;
  qty: number;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Разворачивает позиции корзины в полноценные товары. */
export function hydrateCart(
  items: Array<{ productId: string; volume: number; qty: number }>,
): CartEntry[] {
  return items.flatMap((item) => {
    const product = getProductById(item.productId);
    if (!product || !product.volume.includes(item.volume)) return [];
    return [{ ...product, volume: item.volume, qty: item.qty }];
  });
}

/** Похожие товары: сначала то же семейство и пол, затем — то же семейство. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameFamilyGender = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.fragranceFamily === product.fragranceFamily &&
      candidate.gender === product.gender,
  );
  const sameFamily = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.fragranceFamily === product.fragranceFamily &&
      !sameFamilyGender.includes(candidate),
  );
  const fallback = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      !sameFamilyGender.includes(candidate) &&
      !sameFamily.includes(candidate) &&
      candidate.gender === product.gender,
  );
  return [...sameFamilyGender, ...sameFamily, ...fallback].slice(0, limit);
}
