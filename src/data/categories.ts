import type { CollectionLink, CategoryLink } from "../types";

/** Карточки категорий на главной странице.
 *  Каждая карточка ведёт в каталог с предустановленным фильтром. */
export const HOME_CATEGORIES: CategoryLink[] = [
  {
    title: "Для неё",
    subtitle: "Нежные и страстные композиции",
    query: { gender: "women" },
    variant: "drop",
  },
  {
    title: "Для него",
    subtitle: "Характер и глубина",
    query: { gender: "men" },
    variant: "arch",
  },
  {
    title: "Унисекс",
    subtitle: "Ароматы без границ",
    query: { gender: "unisex" },
    variant: "crescent",
  },
  {
    title: "Новинки",
    subtitle: "Свежие поступления",
    query: { badge: "new" },
    variant: "star",
  },
  {
    title: "Бестселлеры",
    subtitle: "Выбор покупателей",
    query: { badge: "bestseller" },
    variant: "flame",
  },
  {
    title: "Подарочные наборы",
    subtitle: "Готовые решения для сюрприза",
    query: { tag: "gift" },
    variant: "gift",
  },
];

/** Подборки ароматов — фильтруются по тегу товара. */
export const COLLECTIONS: CollectionLink[] = [
  {
    tag: "oriental",
    title: "Восточная коллекция",
    description: "Уд, амбра и пряности — сердце арабской парфюмерии",
  },
  {
    tag: "fresh",
    title: "Свежие ароматы",
    description: "Цитрусы, морская свежесть и лёгкие аккорды",
  },
  {
    tag: "woody",
    title: "Древесные композиции",
    description: "Сандал, ветивер и кедр для спокойной уверенности",
  },
  {
    tag: "sweet",
    title: "Сладкие ароматы",
    description: "Ваниль, карамель и гурманские аккорды",
  },
  {
    tag: "evening",
    title: "Вечерние ароматы",
    description: "Композиции с сильным шлейфом для особых случаев",
  },
  {
    tag: "daily",
    title: "Ароматы на каждый день",
    description: "Универсальные композиции для офиса и прогулок",
  },
];

/** Человекочитаемые подписи тегов для чипов фильтров. */
export const TAG_LABELS: Record<string, string> = {
  oriental: "Восточная коллекция",
  fresh: "Свежие ароматы",
  woody: "Древесные композиции",
  sweet: "Сладкие ароматы",
  evening: "Вечерние ароматы",
  daily: "На каждый день",
  gift: "Подарочные наборы",
};

export const GENDER_LABELS: Record<string, string> = {
  women: "Для неё",
  men: "Для него",
  unisex: "Унисекс",
};

export const BADGE_LABELS: Record<string, string> = {
  new: "Новинка",
  bestseller: "Бестселлер",
  exclusive: "Эксклюзив",
  sale: "Скидка",
};
