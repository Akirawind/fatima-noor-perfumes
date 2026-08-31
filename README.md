# Fatima Noor Perfumes — премиальный интернет-магазин арабской парфюмерии

Демонстрационный frontend-магазин парфюмерии под брендом **Fatima Noor**.
Тёмная восточная эстетика, кремовые страницы, приглушённое золото, serif-типографика
и деликатные анимации. Проект полностью работает без backend: каталог, корзина,
избранное и поиск хранятся в localStorage.

> Это неофициальный демонстрационный проект. Тексты и отзывы — художественные,
> оплата и реальные отправки форм не подключены.

## Стек

- **React 19** + **TypeScript** (strict)
- **Vite 7**
- **Tailwind CSS 4** (через плагин `@tailwindcss/vite`, тема в CSS)
- **React Router 7**
- **Framer Motion** — анимации появления и toast-уведомления
- **Lucide React** — иконки

## Запуск

```bash
npm install     # установка зависимостей
npm run dev     # dev-сервер на http://localhost:5173
npm run build   # проверка типов + production-сборка в dist/
npm run preview # локальный просмотр production-сборки
```

## Структура проекта

```
src/
  components/
    layout/      Header, Footer, MobileMenu
    common/      ActionButton, Badge, RatingStars, PerfumeArt, SearchOverlay,
                 EmptyState, ImageWithFallback, ErrorBoundary, Newsletter…
    product/     ProductCard, ProductGrid
    filters/     FiltersPanel, ActiveFiltersBar, MobileFilters
    cart/        CartItemRow, CartSummary, QtyStepper
  pages/         Home, Catalog, Product, Favorites, Cart, About, Delivery, 404
  data/          products.ts, categories.ts, reviews.ts, site.ts
  types/         Product, CartItem, Review и др.
  store/         StoreContext — корзина, избранное, тосты + localStorage
  hooks/         useDocumentMeta, useJsonLd, useBodyLock, useScrollToTop
  utils/         filterProducts, catalog, format, promo, cn
  styles/        index.css — тема Tailwind (цвета, шрифты)
public/images/   hero / products / categories / brand
```

## Страницы

| Маршрут            | Описание                                        |
| ------------------ | ----------------------------------------------- |
| `/`                | Главная: hero, категории, бестселлеры, история, коллекции, отзывы |
| `/catalog`         | Каталог с фильтрами (`?gender=`, `?tag=`, `?badge=`, `?q=`, `?sort=`) |
| `/product/:slug`   | Карточка аромата, пирамида нот, похожие товары, JSON-LD |
| `/favorites`       | Избранное (localStorage)                        |
| `/cart`            | Корзина: количество, промокоды, доставка        |
| `/about`           | О бренде                                        |
| `/delivery`        | Доставка, оплата, FAQ, контакты                 |
| `*`                | 404                                             |

Промокоды для теста: `NOOR10` (−10%), `AURA15` (−15%).

---

## Как добавить новый товар

Откройте `src/data/products.ts` и добавьте объект в массив `products`:

```ts
{
  id: "p-my-perfume",              // уникальный id
  slug: "my-perfume",              // URL: /product/my-perfume
  name: "My Perfume",
  brand: "Fatima Noor",
  description: "Описание аромата…",
  gender: "unisex",                // "women" | "men" | "unisex"
  category: "Имя линейки",
  fragranceFamily: "Восточные пряные", // попадёт в фильтр «Тип аромата»
  volume: [50, 100],               // доступные объёмы, мл
  price: 7500,
  oldPrice: 8900,                  // необязательно
  currency: "RUB",
  images: [
    "/images/products/my-perfume-1.jpg",
    "/images/products/my-perfume-2.jpg",
  ],
  thumbnail: "/images/products/my-perfume-1.jpg",
  badge: "new",                    // "new" | "bestseller" | "exclusive" | "sale"
  rating: 4.8,
  reviewCount: 42,
  notes: {
    top: ["Бергамот"],
    heart: ["Роза"],
    base: ["Уд", "Ваниль"],
  },
  longevity: "8 часов",
  sillage: "Сильный шлейф",
  tags: ["oriental", "evening"],   // см. TAG_LABELS в categories.ts
  isBestseller: true,              // показ в блоке «Бестселлеры»
  isNew: true,                     // фильтр «Новинки»
  inStock: true,
  art: { base: "#1c130c", liquid: "#a35f22", glow: "#c98a3d" }, // placeholder-арт
},
```

Больше ничего менять не нужно: карточки, фильтры, поиск и страница товара
строятся из данных автоматически.

### Теги подборок (`tags`)

Определены в `src/data/categories.ts` → `TAG_LABELS`:
`oriental`, `fresh`, `woody`, `sweet`, `evening`, `daily`, `gift`.
Чтобы добавить новую подборку — дополните `TAG_LABELS` и массив `COLLECTIONS`.

## Куда добавлять изображения

```
public/images/products/   фото товаров: my-perfume-1.jpg, my-perfume-2.jpg …
public/images/hero/       фоны и композиции для hero
public/images/categories/ изображения карточек категорий
public/images/brand/      логотипы, og-cover.svg
```

Пути в данных указываются от корня сайта: `/images/products/file.jpg`.
Если файла нет — компонент `ImageWithFallback` автоматически покажет
векторный арт флакона (`PerfumeArt`), поэтому интерфейс никогда не «ломается».

## Как изменить цвета и тексты

- **Цвета и шрифты**: `src/styles/index.css`, блок `@theme`
  (`--color-gold-500`, `--color-ink-950`, `--font-display`, `--font-sans`).
  Шрифты подключены в `index.html` (Quicksand + Nunito — мягкие округлые, кириллица).
- **Контакты, слоган, навигация, доставка**: `src/data/site.ts`.
- **Категории и подборки**: `src/data/categories.ts`.
- **Отзывы**: `src/data/reviews.ts`.
- **Условия доставки/бесплатный порог**: константа `DELIVERY` в `site.ts`.
- **Промокоды**: `src/utils/promo.ts`.

## SEO

- `useDocumentMeta` задаёт title/description/OG каждой странице;
  базовые метатеги — в `index.html`.
- Человекочитаемые URL через slug: `/product/khamrah`.
- На странице товара внедряется **JSON-LD Product schema** (`useJsonLd`).

## Подключение backend в будущем

Архитектура готова к замене локальных данных на API:

1. Замените статический импорт в `src/utils/catalog.ts` на загрузку с API
   (например, React Query): `getProducts()`, `getProductBySlug()`.
2. Тип `Product` в `src/types/index.ts` уже описывает контракт ответа сервера.
3. Корзина и избранное в `StoreContext.tsx` — синхронизируйте их с API
   вместо `localStorage` (точки записи помечены комментариями).
4. Промокоды: замените клиентскую проверку `findPromoCode()` на запрос к API.

### Подключение оплаты

В `CartPage.tsx` кнопка «Оформить заказ» вызывает демо-обработчик.
Для реальной оплаты: создайте заказ на backend (`POST /orders`),
получите ссылку платёжного провайдера (ЮKassa, CloudPayments и т.п.)
и перенаправьте пользователя на неё, затем обработайте возврат.

### Подключение CMS

Любая headless-CMS (Strapi, Directus, Sanity) должна отдавать объекты,
совместимые с `Product`. Достаточно маппера CMS → `Product` в `data/`,
компоненты менять не придётся.

## Доступность

- aria-label на всех иконках-кнопках, `aria-pressed` у переключателей,
  `role="dialog"` у оверлеев, закрытие по Escape, блокировка прокрутки body.
- Клавиатурная навигация: стандартный focus-visible ring в золотом цвете.
- Семантические заголовки h1/h2/h3, alt-тексты у изображений.
