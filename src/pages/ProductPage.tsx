import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Product } from "../types";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Clock,
  Droplets,
  Heart,
  Package,
  ShoppingBag,
  Sparkles,
  Truck,
  Wind,
  Zap,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "../utils/catalog";
import { getReviewsForProduct } from "../data/reviews";
import { ReviewForm } from "../components/common/ReviewForm";
import { formatPrice, formatVolume } from "../utils/format";
import { GENDER_STYLE } from "../utils/genderStyle";
import { DELIVERY } from "../data/site";
import { useStore } from "../store/StoreContext";
import { Badge } from "../components/common/Badge";
import { RatingStars } from "../components/common/RatingStars";
import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { PerfumeArt } from "../components/common/PerfumeArt";
import { ProductGrid } from "../components/product/ProductGrid";
import { QtyStepper } from "../components/cart/QtyStepper";
import { EmptyState } from "../components/common/EmptyState";
import { Reveal, SectionHeading } from "../components/common/Section";
import { FloatingParticles } from "../components/common/FloatingParticles";
import { GlowOrb } from "../components/common/GlowOrb";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { useJsonLd } from "../hooks/useJsonLd";
import { cn } from "../utils/cn";

export function ProductPage() {
  const { slug = "" } = useParams();
  const product = getProductBySlug(slug);
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const gender = product ? GENDER_STYLE[product.gender] : GENDER_STYLE.unisex;

  const [selectedImage, setSelectedImage] = useState(0);
  const [volume, setVolume] = useState(product?.volume[0] ?? 100);
  const [qty, setQty] = useState(1);

  // Сброс локального состояния при переходе к другому товару
  useEffect(() => {
    setSelectedImage(0);
    setQty(1);
    setVolume(getProductBySlug(slug)?.volume[0] ?? 100);
  }, [slug]);

  useDocumentMeta({
    title: product
      ? `${product.name} — Fatima Noor | ${formatPrice(product.price)}`
      : "Аромат не найден — Fatima Noor",
    description: product?.description,
  });

  const jsonLd = useMemo(() => {
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      brand: { "@type": "Brand", name: product.brand },
      image: product.images,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: product.currency,
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    };
  }, [product]);
  useJsonLd(jsonLd, "jsonld-product");

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-40 text-center">
        <EmptyState
          title="Аромат не найден"
          description="Возможно, он был снят с продажи или ссылка устарела."
          action={{ label: "В каталог", to: "/catalog" }}
        />
      </main>
    );
  }

  const favorite = isFavorite(product.id);
  const related = getRelatedProducts(product);
  const productReviews = getReviewsForProduct(product.slug);

  function handleAddToCart() {
    addToCart(product!.id, volume, qty);
  }

  function handleBuyNow() {
    addToCart(product!.id, volume, qty);
    navigate("/cart");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      {/* Хлебные крошки */}
      <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-1.5 text-xs text-graphite-400">
        <Link to="/" className="transition-colors hover:text-gold-700">Главная</Link>
        <ChevronRight size={12} aria-hidden />
        <Link to="/catalog" className="transition-colors hover:text-gold-700">Каталог</Link>
        <ChevronRight size={12} aria-hidden />
        <span aria-current="page" className="text-ink-950">{product.name}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Галерея с 3D-эффектом */}
        <section aria-label={`Изображения аромата ${product.name}`} className="relative">
          <FloatingParticles count={12} color="rgba(191, 161, 95, 0.2)" />
          <GlowOrb size={300} color="rgba(191, 161, 95, 0.08)" className="-right-20 -top-20" />
          
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-ink-800 to-ink-950"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageWithFallback
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={`Флакон аромата ${product.name}, вид ${selectedImage + 1}`}
              className="aspect-square w-full object-cover"
              fallback={
                <PerfumeArt seed={product.name} palette={product.art} className="aspect-square w-full p-10" />
              }
            />
            
            {/* 3D-блик на изображении */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"
              aria-hidden
            />
            
            {/* Свечение вокруг изображения */}
            <motion.div
              className="pointer-events-none absolute -inset-1 rounded-3xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(191, 161, 95, 0.1)",
                  "0 0 40px rgba(191, 161, 95, 0.15)",
                  "0 0 20px rgba(191, 161, 95, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            
            {product.badge && (
              <div className="absolute left-4 top-4 z-10">
                <Badge badge={product.badge} />
              </div>
            )}
            
            {/* 3D-иконка */}
            <motion.div
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 15 }}
              aria-hidden
            >
              <Sparkles size={18} />
            </motion.div>
          </motion.div>
          
          <div className="mt-4 flex gap-3" role="tablist" aria-label="Миниатюры изображений">
            {product.images.map((image, index) => (
              <motion.button
                key={image}
                type="button"
                role="tab"
                aria-selected={selectedImage === index}
                aria-label={`Вид ${index + 1}`}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "h-20 w-20 overflow-hidden rounded-xl border bg-gradient-to-b from-ink-800 to-ink-950 transition-all cursor-pointer",
                  selectedImage === index
                    ? "border-gold-500 shadow-md shadow-gold-500/20"
                    : "border-ink-950/10 opacity-70 hover:opacity-100",
                )}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageWithFallback
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  fallback={
                    <PerfumeArt seed={product.name} palette={product.art} className="h-full w-full p-1" />
                  }
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* Информация о товаре */}
        <section aria-label="Информация о товаре">
          <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
            {product.brand}
            <span
              className="ml-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 align-middle text-[10px]"
              style={{ backgroundColor: gender.soft, color: gender.base }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: gender.base }} aria-hidden />
              {gender.label}
            </span>
          </p>
          <h1 className="mt-2 font-display text-4xl font-medium leading-tight text-ink-950 sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-2">
              <RatingStars rating={product.rating} size={15} />
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            </span>
            <a href="#reviews" className="text-sm text-graphite-400 underline-offset-4 transition-colors hover:text-gold-700 hover:underline">
              {product.reviewCount} отзывов
            </a>
            {!product.inStock && (
              <span className="rounded-full bg-bordeaux-700/10 px-3 py-1 text-xs font-semibold text-bordeaux-600">
                Нет в наличии
              </span>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold text-ink-950">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.oldPrice && (
              <span className="text-xl text-graphite-400 line-through">
                {formatPrice(product.oldPrice, product.currency)}
              </span>
            )}
          </div>

          {/* Цветная линия-акцент пола под ценой */}
          <span
            aria-hidden
            className="mt-5 block h-[2px] w-28 rounded-full"
            style={{ background: `linear-gradient(to right, ${gender.base}, transparent)` }}
          />

          {/* Объём */}
          <fieldset className="mt-8">
            <legend className="mb-3 text-[11px] font-semibold uppercase tracking-luxe text-graphite-400">
              Объём
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.volume.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={volume === option}
                  onClick={() => setVolume(option)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm transition-all duration-300 cursor-pointer",
                    volume === option
                      ? "border-gold-600 bg-gold-500/15 font-semibold text-gold-700"
                      : "border-ink-950/15 text-graphite-400 hover:border-gold-500/60 hover:text-gold-700",
                  )}
                >
                  {formatVolume(option)}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Количество и кнопки */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QtyStepper value={qty} onChange={setQty} />
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
              >
                <ShoppingBag size={15} strokeWidth={1.75} aria-hidden />
                В корзину
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-ink-950/20 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-all hover:border-transparent hover:bg-ink-950 hover:text-cream-50 disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
              >
                Купить сейчас
              </button>
            </div>
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label={favorite ? `Убрать из избранного` : `Добавить в избранное`}
              aria-pressed={favorite}
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border transition-all duration-300 cursor-pointer",
                favorite
                  ? "border-gold-500/60 bg-gold-500/15 text-gold-600"
                  : "border-ink-950/15 text-graphite-400 hover:border-gold-500/60 hover:text-gold-700",
              )}
            >
              <Heart size={18} fill={favorite ? "currentColor" : "none"} strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-graphite-400">
            <Truck size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
            Доставка по России {formatPrice(DELIVERY.cost)}. Бесплатно при заказе от{" "}
            {formatPrice(DELIVERY.freeFrom)}.
          </p>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-800">
            {product.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-ink-950/10 bg-cream-100 p-5 text-sm">
            <Spec icon={Zap} label="Семейство" value={product.fragranceFamily} />
            <Spec icon={Clock} label="Стойкость" value={product.longevity ?? "—"} />
            <Spec icon={Wind} label="Шлейф" value={product.sillage ?? "—"} />
            <Spec icon={Droplets} label="Объём" value={formatVolume(volume)} />
          </dl>
        </section>
      </div>

      {/* Пирамида аромата */}
      <Reveal className="mt-20">
        <SectionHeading
          eyebrow="Композиция"
          title="Пирамида аромата"
          description="Три уровня раскрытия: от первых мгновений до глубокого базового звучания."
        />
        <NotesPyramid notes={product.notes} />
      </Reveal>

      {/* Применение и доставка */}
      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
        <InfoCard title="Рекомендации по применению">
          <ul className="space-y-2.5 text-sm leading-relaxed text-graphite-400">
            <li>Наносите аромат на запястья и за ушами — там кожа теплее всего.</li>
            <li>Не растирайте запястья: так раскрываются верхние ноты дольше.</li>
            <li>Для более плотного шлейфа нанесите один пшик на одежду.</li>
          </ul>
        </InfoCard>
        <InfoCard title="Доставка и гарантия">
          <ul className="space-y-2.5 text-sm leading-relaxed text-graphite-400">
            <li className="flex items-start gap-2">
              <Package size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
              Отправка в день заказа, упаковка защищает флакон при транспортировке.
            </li>
            <li className="flex items-start gap-2">
              <Truck size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
              Доставка от {formatPrice(DELIVERY.cost)}, бесплатно от {formatPrice(DELIVERY.freeFrom)}.
            </li>
            <li className="flex items-start gap-2">
              <Package size={15} className="mt-0.5 shrink-0 text-gold-600" aria-hidden />
              Только оригинальная продукция — проверяем каждую партию.
            </li>
          </ul>
        </InfoCard>
      </div>

      {/* Отзывы */}
      <Reveal className="mt-16" id="reviews">
        <SectionHeading align="left" eyebrow="Отзывы покупателей" title={`Отзывы о «${product.name}»`} />
        {productReviews.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {productReviews.map((review) => (
              <figure key={review.id} className="rounded-2xl border border-ink-950/10 bg-cream-100 p-6">
                <div className="flex items-center justify-between">
                  <RatingStars rating={review.rating} size={13} />
                  {review.date && (
                    <span className="text-[10px] text-graphite-400">
                      {new Date(review.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-graphite-500">
                  {review.text}
                </blockquote>
                <figcaption className="mt-4 text-xs text-graphite-400">
                  {review.authorName}
                  {review.isUserReview && (
                    <span className="ml-2 rounded-full bg-gold-500/10 px-2 py-0.5 text-[10px] text-gold-700">
                      отзыв покупателя
                    </span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-graphite-400">Пока нет отзывов об этом аромате. Будьте первым!</p>
        )}

        {/* Форма добавления отзыва */}
        <div className="mt-10 max-w-xl">
          <h3 className="font-display text-xl font-medium text-ink-950">Оставить отзыв</h3>
          <p className="mt-2 text-sm text-graphite-400">Расскажите о вашем опыте с этим ароматом</p>
          <div className="mt-5">
            <ReviewForm productSlug={product.slug} />
          </div>
        </div>
      </Reveal>

      {/* Похожие товары */}
      {related.length > 0 && (
        <Reveal className="mt-20">
          <SectionHeading align="left" eyebrow="Смотрите также" title="Похожие ароматы" />
          <div className="mt-8">
            <ProductGrid products={related.slice(0, 4)} density="compact" />
          </div>
        </Reveal>
      )}
    </main>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={17} className="mt-0.5 shrink-0 text-gold-600" strokeWidth={1.5} aria-hidden />
      <div>
        <dt className="text-[11px] uppercase tracking-wider text-graphite-400">{label}</dt>
        <dd className="mt-0.5 font-medium text-ink-950">{value}</dd>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-950/10 bg-cream-100 p-7">
      <h2 className="font-display text-xl font-medium text-ink-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Визуальная пирамида нот: три яруса с 3D-эффектом и анимацией. */
function NotesPyramid({ notes }: { notes: Product["notes"] }) {
  const tiers = [
    { title: "Верхние ноты", items: notes.top, caption: "Первые минуты после нанесения", width: "sm:w-2/3", icon: "✨" },
    { title: "Ноты сердца", items: notes.heart, caption: "Ядро композиции, 2–4 часа", width: "sm:w-full sm:max-w-3xl", icon: "🌹" },
    { title: "Базовые ноты", items: notes.base, caption: "Финальное звучание, до конца дня", width: "sm:w-2/3", icon: "🪵" },
  ];

  return (
    <ol className="mx-auto mt-10 flex w-full max-w-4xl flex-col items-center gap-4 px-4">
      {tiers.map((tier, index) => (
        <Reveal key={tier.title} delay={index * 0.15} className={cn("w-full", tier.width)}>
          <motion.li
            className="relative rounded-2xl border border-gold-500/25 bg-gradient-to-b from-cream-100 to-cream-200/60 px-7 py-6 text-center overflow-hidden"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 40px -15px rgba(191, 161, 95, 0.15)",
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Декоративный градиент */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5"
              aria-hidden
            />
            
            {/* Иконка уровня */}
            <motion.span
              className="absolute right-4 top-4 text-2xl opacity-30"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              {tier.icon}
            </motion.span>
            
            <p className="relative text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
              {tier.title}
            </p>
            <p className="relative mt-2 font-display text-xl font-medium text-ink-950 sm:text-2xl">
              {tier.items.join(" · ")}
            </p>
            <p className="relative mt-1.5 text-xs text-graphite-400">{tier.caption}</p>
            
            {/* Нижняя линия-акцент */}
            <motion.div
              className="absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            />
          </motion.li>
        </Reveal>
      ))}
    </ol>
  );
}
