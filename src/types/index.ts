export type Gender = "women" | "men" | "unisex";

export type ProductBadge = "new" | "bestseller" | "exclusive" | "sale";

/** Декоративная палитра для векторного placeholder-арта,
 *  пока не подключены реальные фотографии товара. */
export interface ProductArt {
  base: string;
  liquid: string;
  glow: string;
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  gender: Gender;
  category: string;
  fragranceFamily: string;
  volume: number[];
  price: number;
  oldPrice?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  badge?: ProductBadge;
  rating: number;
  reviewCount: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevity?: string;
  sillage?: string;
  tags: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  art?: ProductArt;
};

export interface CartItem {
  productId: string;
  volume: number;
  qty: number;
}

export interface Review {
  id: string;
  productSlug: string | null;
  authorName: string;
  rating: number;
  text: string;
  date?: string;
  isUserReview?: boolean;
}

export interface CategoryLink {
  title: string;
  subtitle: string;
  /** Параметры запроса каталога: /catalog?gender=men */
  query: Record<string, string>;
  variant: "arch" | "crescent" | "star" | "drop" | "flame" | "gift";
}

export interface CollectionLink {
  tag: string;
  title: string;
  description: string;
}
