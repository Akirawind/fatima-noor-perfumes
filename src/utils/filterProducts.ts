import type { Product } from "../types";

export type SortKey = "popular" | "price-asc" | "price-desc" | "name" | "new";

export type BadgeFilter = "" | "new" | "bestseller" | "exclusive";

export interface CatalogFilters {
  q: string;
  gender: "" | "women" | "men" | "unisex";
  families: string[];
  volumes: number[];
  tag: string;
  badge: BadgeFilter;
  priceMin: number | null;
  priceMax: number | null;
  sort: SortKey;
}

export const EMPTY_FILTERS: CatalogFilters = {
  q: "",
  gender: "",
  families: [],
  volumes: [],
  tag: "",
  badge: "",
  priceMin: null,
  priceMax: null,
  sort: "popular",
};

export const SORT_LABELS: Record<SortKey, string> = {
  popular: "По популярности",
  "price-asc": "Сначала дешёвые",
  "price-desc": "Сначала дорогие",
  name: "По названию",
  new: "Сначала новые",
};

export const VOLUME_OPTIONS = [30, 50, 75, 100];

export function hasActiveFilters(filters: CatalogFilters): boolean {
  return (
    filters.q !== "" ||
    filters.gender !== "" ||
    filters.families.length > 0 ||
    filters.volumes.length > 0 ||
    filters.tag !== "" ||
    filters.badge !== "" ||
    filters.priceMin !== null ||
    filters.priceMax !== null
  );
}

export function countActiveFilters(filters: CatalogFilters): number {
  let count = 0;
  if (filters.q) count += 1;
  if (filters.gender) count += 1;
  if (filters.tag) count += 1;
  if (filters.badge) count += 1;
  if (filters.priceMin !== null || filters.priceMax !== null) count += 1;
  count += filters.families.length;
  count += filters.volumes.length;
  return count;
}

/** Основная функция фильтрации + сортировки каталога. */
export function filterAndSortProducts(
  products: Product[],
  filters: CatalogFilters,
): Product[] {
  const query = filters.q.trim().toLowerCase();

  const filtered = products.filter((product) => {
    if (
      query &&
      !product.name.toLowerCase().includes(query) &&
      !product.description.toLowerCase().includes(query) &&
      !product.fragranceFamily.toLowerCase().includes(query)
    ) {
      return false;
    }
    if (filters.gender && product.gender !== filters.gender) return false;
    if (filters.families.length > 0 && !filters.families.includes(product.fragranceFamily))
      return false;
    if (
      filters.volumes.length > 0 &&
      !product.volume.some((volume) => filters.volumes.includes(volume))
    )
      return false;
    if (filters.tag && !product.tags.includes(filters.tag)) return false;
    if (filters.badge === "new" && !product.isNew) return false;
    if (filters.badge === "bestseller" && !product.isBestseller) return false;
    if (filters.badge === "exclusive" && product.badge !== "exclusive") return false;
    if (filters.priceMin !== null && product.price < filters.priceMin) return false;
    if (filters.priceMax !== null && product.price > filters.priceMax) return false;
    return true;
  });

  return sortProducts(filtered, filters.sort);
}

function sortProducts(products: Product[], sort: SortKey): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
      break;
    case "new":
      sorted.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
      break;
    case "popular":
    default:
      sorted.sort(
        (a, b) =>
          b.reviewCount * b.rating - a.reviewCount * a.rating,
      );
      break;
  }
  return sorted;
}
