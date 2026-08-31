/** Константы сайта: бренд, навигация, контакты, условия доставки.
 *  Тексты и реквизиты вынесены сюда, чтобы их можно было менять без правки компонентов. */

export const SITE = {
  name: "Fatima Noor",
  slogan: "Ароматы, которые оставляют впечатление",
  sloganAlt: "Искусство восточной парфюмерии",
  email: "perfume_shop@list.ru",
  phone: "+7 (999) 573-66-99",
  phoneHref: "tel:+79995736699",
  telegram: "https://t.me/perfume_shop_msk",
  telegramHandle: "@perfume_shop_msk",
  workingHours: "Ежедневно с 10:00 до 21:00",
} as const;

export const DELIVERY = {
  cost: 350,
  freeFrom: 5000,
} as const;

export const NAV_LINKS = [
  { label: "Каталог", to: "/catalog" },
  { label: "Новинки", to: "/catalog?badge=new" },
  { label: "Бестселлеры", to: "/catalog?badge=bestseller" },
  { label: "Для него", to: "/catalog?gender=men" },
  { label: "Для неё", to: "/catalog?gender=women" },
  { label: "Унисекс", to: "/catalog?gender=unisex" },
  { label: "О бренде", to: "/about" },
] as const;

export const FOOTER_SECTIONS = [
  {
    title: "Магазин",
    links: [
      { label: "Каталог", to: "/catalog" },
      { label: "Новинки", to: "/catalog?badge=new" },
      { label: "Бестселлеры", to: "/catalog?badge=bestseller" },
      { label: "Подарочные наборы", to: "/catalog?tag=gift" },
    ],
  },
  {
    title: "Помощь покупателю",
    links: [
      { label: "О бренде", to: "/about" },
      { label: "Доставка и оплата", to: "/delivery" },
      { label: "Контакты", to: "/delivery#contacts" },
      { label: "Возврат", to: "/delivery#faq" },
    ],
  },
] as const;
