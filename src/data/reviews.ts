import type { Review } from "../types";

const REVIEWS_KEY = "fatimanoor.reviews.v1";

const defaultReviews: Review[] = [
  {
    id: "r-1",
    productSlug: "khamrah",
    authorName: "Мария К.",
    rating: 5,
    text: "Тёплый, обволакивающий, очень уютный. Финик и корица звучат дорого, шлейф держится весь вечер. Муж в восторге!",
    date: "2025-12-15",
  },
  {
    id: "r-2",
    productSlug: "asad",
    authorName: "Артём В.",
    rating: 5,
    text: "Заказывал Asad — пришёл быстро, упаковка аккуратная. Аромат мощный, на работе сразу спросили, чем пахну. Стойкость огромная, 12+ часов на коже.",
    date: "2026-01-08",
  },
  {
    id: "r-3",
    productSlug: "yara",
    authorName: "Екатерина Л.",
    rating: 4,
    text: "Yara — нежный и комплиментарный. Немного сладковат для офиса, но для прогулок идеален. Подруга тоже заказала себе.",
    date: "2026-02-03",
  },
  {
    id: "r-4",
    productSlug: "badee-al-oud",
    authorName: "Дмитрий С.",
    rating: 5,
    text: "Bade'e Al Oud оправдал ожидания: плотный уд, стойкость больше суток на одежде. Буду брать ещё. Упаковка премиальная, доставка за 2 дня в Москву.",
    date: "2026-01-22",
  },
  {
    id: "r-5",
    productSlug: null,
    authorName: "Софья М.",
    rating: 5,
    text: "Ana Abiyedh — деликатный белый мускус, пахнет чистотой. Подарила сестре, теперь заказываем вместе. Очень довольны качеством!",
    date: "2026-03-10",
  },
  {
    id: "r-6",
    productSlug: "oud-for-gold",
    authorName: "Алексей Н.",
    rating: 5,
    text: "Oud for Gold — шедевр. Насыщенный, благородный аромат. Жена сказала, что пахну как миллион долларов. Рекомендую!",
    date: "2026-02-18",
  },
  {
    id: "r-7",
    productSlug: null,
    authorName: "Анна П.",
    rating: 4,
    text: "Заказываю уже третий раз — всегда всё на высшем уровне. Ароматы настоящие, стойкие. Магазин находит всегда лучшие предложения.",
    date: "2026-03-25",
  },
  {
    id: "r-8",
    productSlug: "sehr",
    authorName: "Игорь Д.",
    rating: 5,
    text: "Sehr — оченьmysłный аромат. Ноты розы и мускуса переплетаются идеально. Подарил маме, она была в восторге. Спасибо за быструю доставку!",
    date: "2026-04-02",
  },
];

function loadUserReviews(): Review[] {
  try {
    const raw = window.localStorage.getItem(REVIEWS_KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveUserReviews(reviews: Review[]) {
  try {
    window.localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  } catch {
    /* localStorage may be unavailable */
  }
}

let cachedUserReviews: Review[] | null = null;

function getUserReviews(): Review[] {
  if (cachedUserReviews === null) {
    cachedUserReviews = loadUserReviews();
  }
  return cachedUserReviews;
}

export function getAllReviews(): Review[] {
  return [...defaultReviews, ...getUserReviews()];
}

export function getReviewsForProduct(slug: string): Review[] {
  return getAllReviews().filter((review) => review.productSlug === slug);
}

export function getHomeReviews(): Review[] {
  return getAllReviews().filter((review) => review.productSlug === null);
}

export function addReview(review: Omit<Review, "id" | "date" | "isUserReview">): Review {
  const newReview: Review = {
    ...review,
    id: `ur-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    date: new Date().toISOString().split("T")[0],
    isUserReview: true,
  };
  cachedUserReviews = [...getUserReviews(), newReview];
  saveUserReviews(cachedUserReviews);
  return newReview;
}

export { defaultReviews };
