import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "../../types";
import { formatPrice, formatVolume } from "../../utils/format";
import { GENDER_STYLE, genderCssVars } from "../../utils/genderStyle";
import { useStore } from "../../store/StoreContext";
import { Badge } from "../common/Badge";
import { RatingStars } from "../common/RatingStars";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { PerfumeArt } from "../common/PerfumeArt";

/** Улучшенная карточка аромата с 3D-эффектами и свечением. */
export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);
  const volume = product.volume[0];
  const gender = GENDER_STYLE[product.gender];

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);

  const glareX = useTransform(springX, [-0.5, 0.5], [-100, 100]);
  const glareOpacity = useTransform(springX, [-0.5, 0, 0.5], [0, 0.05, 0.15]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={`will-change-transform ${className ?? "h-full"}`}
    >
      <article
        style={{ ...genderCssVars(product.gender), backgroundColor: "var(--gender-wash)" }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--gender-border)] transition-all duration-700 hover:shadow-[0_32px_64px_-20px_var(--gender-glow)]"
      >
        {/* Многослойное свечение за изображением */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-48 w-[140%] -translate-x-1/2 rounded-full blur-3xl"
          animate={{
            opacity: [0, 0.7],
          }}
          transition={{ duration: 0.8 }}
          style={{ background: "var(--gender-glow)" }}
        />

        {/* Второй слой свечения */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-8 left-1/2 h-24 w-[80%] -translate-x-1/2 rounded-full blur-xl"
          animate={{
            opacity: [0, 0.4],
          }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ background: "var(--gender-glow)" }}
        />

        {/* Блик-свип при наведении */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)`,
            x: glareX,
            opacity: glareOpacity,
          }}
          aria-hidden
        />

        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-b from-ink-800 to-ink-950"
          aria-label={`${product.name} — перейти к описанию`}
        >
          <ImageWithFallback
            src={product.thumbnail}
            alt={`Флакон аромата ${product.name}`}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            fallback={
              <PerfumeArt seed={product.name} palette={product.art} className="h-full w-full p-6 transition-transform duration-700 group-hover:scale-[1.08]" />
            }
          />

          {/* 3D-блик на изображении */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"
            aria-hidden
          />

          {product.badge && (
            <div className="absolute left-3 top-3 z-20">
              <Badge badge={product.badge} />
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-x-0 bottom-0 z-20 bg-ink-950/80 py-2 text-center text-[11px] uppercase tracking-luxe text-cream-200">
              Нет в наличии
            </div>
          )}

          {/* Иконка 3D при наведении */}
          <motion.div
            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            aria-hidden
          >
            <Sparkles size={14} />
          </motion.div>
        </Link>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorite ? `Убрать ${product.name} из избранного` : `Добавить ${product.name} в избранное`}
          aria-pressed={favorite}
          className={
            "absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur transition-all duration-300 cursor-pointer " +
            (favorite
              ? "border-gold-500/60 bg-gold-500/20 text-gold-400"
              : "border-cream-100/20 bg-ink-950/40 text-cream-100/80 hover:border-gold-400/50 hover:text-gold-300")
          }
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} strokeWidth={1.75} aria-hidden />
        </button>

        <div className="relative flex flex-1 flex-col p-5">
          <p className="text-[10px] font-semibold uppercase tracking-luxe text-graphite-400">
            {product.brand}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-medium leading-snug text-ink-950">
            <Link to={`/product/${product.slug}`} className="transition-colors hover:text-[var(--gender)]">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-graphite-400">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full ring-2 ring-transparent transition-all duration-500 group-hover:ring-current"
              style={{ backgroundColor: gender.base, color: gender.soft }}
              aria-hidden
            />
            {gender.label} · {product.fragranceFamily} · {formatVolume(volume)}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <RatingStars rating={product.rating} size={13} />
            <span className="text-xs text-graphite-400">{product.rating.toFixed(1)}</span>
          </div>

          {/* Блок цены */}
          <div className="mt-auto pt-4">
            <motion.div
              className="flex items-center justify-between gap-3 rounded-xl border border-[var(--gender-border)] px-4 py-3 transition-all duration-500"
              style={{
                backgroundColor: "var(--gender-panel)",
                boxShadow: `inset 3px 0 0 0 ${"var(--gender)"}`,
              }}
              whileHover={{
                y: -2,
                boxShadow: `0 10px 24px -12px var(--gender-glow)`,
              }}
            >
              <div>
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--gender)" }}
                >
                  {gender.label}
                </p>
                <div className="mt-0.5 flex items-baseline gap-2">
                  <span
                    className="text-lg font-bold tracking-tight tabular-nums"
                    style={{ color: "var(--gender)" }}
                  >
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-graphite-500 line-through">
                      {formatPrice(product.oldPrice, product.currency)}
                    </span>
                  )}
                </div>
              </div>
              {product.inStock ? (
                <span className="relative flex h-2.5 w-2.5 shrink-0" title="В наличии">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                    style={{ backgroundColor: "var(--gender)" }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: "var(--gender)" }}
                  />
                </span>
              ) : (
                <span className="shrink-0 text-[10px] uppercase tracking-wider text-graphite-500">
                  нет
                </span>
              )}
            </motion.div>
            <motion.button
              type="button"
              disabled={!product.inStock}
              onClick={() => addToCart(product.id, volume)}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 cursor-pointer disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40"
              style={{ backgroundColor: "var(--gender)" }}
              whileHover={{
                y: -3,
                boxShadow: `0 12px 26px -10px var(--gender-glow)`,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={14} strokeWidth={1.75} aria-hidden />
              В корзину
            </motion.button>
          </div>
        </div>

        {/* Цветная линия-подпись пола внизу карточки */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-[var(--gender)] to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        />
      </article>
    </motion.div>
  );
}
