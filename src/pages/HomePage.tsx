import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Gift, ShieldCheck, Truck } from "lucide-react";
import { products } from "../data/products";
import { getHomeReviews } from "../data/reviews";
import { COLLECTIONS, HOME_CATEGORIES } from "../data/categories";
import { ProductGrid } from "../components/product/ProductGrid";
import { ActionButton } from "../components/common/ActionButton";
import { Magnetic, TiltCard } from "../components/common/Interactions";
import { CountUp } from "../components/common/CountUp";
import { Marquee } from "../components/common/Marquee";
import { OrnamentDivider, Reveal, SectionHeading } from "../components/common/Section";
import { RatingStars } from "../components/common/RatingStars";
import { Newsletter } from "../components/common/Newsletter";
import { FloatingParticles } from "../components/common/FloatingParticles";
import { GlowOrb } from "../components/common/GlowOrb";
import { AnimatedBackground } from "../components/common/AnimatedBackground";
import { ReviewForm } from "../components/common/ReviewForm";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const MARQUEE_NOTES = [
  "Уд",
  "Амбра",
  "Роза",
  "Шафран",
  "Ваниль",
  "Сандал",
  "Мускус",
  "Бергамот",
  "Финик",
  "Корица",
];

export function HomePage() {
  useDocumentMeta({
    title: "Fatima Noor Perfumes — ароматы, которые оставляют впечатление",
    description:
      "Откройте коллекцию Fatima Noor — восточная глубина, современная эстетика и характер, который невозможно забыть.",
  });

  const bestsellers = products.filter((product) => product.isBestseller);
  const averageRating =
    products.reduce((sum, product) => sum + product.rating, 0) / products.length;

  return (
    <>
      <Hero averageRating={averageRating} />
      <BenefitsStrip />
      <Marquee items={MARQUEE_NOTES} />

      {/* Категории */}
      <section aria-labelledby="categories-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Коллекции"
            title={<span id="categories-title">Выберите своё направление</span>}
            description="Шесть путей в мир восточной парфюмерии — от нежных цветочных аккордов до глубоких удовых композиций."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {HOME_CATEGORIES.map((category, index) => (
            <Reveal key={category.title} delay={index * 0.06}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Бестселлеры */}
      <section aria-labelledby="bestsellers-title" className="bg-cream-100 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Выбор покупателей"
                title={<span id="bestsellers-title">Бестселлеры</span>}
                description="Ароматы, которые чаще всего выбирают и рекомендуют."
              />
              <ActionButton to="/catalog?badge=bestseller" variant="ghost" className="hidden shrink-0 text-ink-950 sm:inline-flex">
                Весь каталог
                <ArrowRight size={15} aria-hidden />
              </ActionButton>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <ProductGrid products={bestsellers.slice(0, 3)} density="compact" />
          </Reveal>
          <div className="mt-8 text-center sm:hidden">
            <ActionButton to="/catalog?badge=bestseller" size="sm">
              Смотреть все
              <ArrowRight size={14} aria-hidden />
            </ActionButton>
        </div>

        {/* Форма добавления отзыва */}
        <Reveal delay={0.2} className="mx-auto mt-12 max-w-xl">
          <div className="rounded-2xl border border-gold-500/20 bg-ink-800/60 p-7 backdrop-blur">
            <h3 className="font-display text-xl font-medium text-cream-50">Оставить отзыв</h3>
            <p className="mt-2 text-sm text-cream-200/60">Поделитесь впечатлением о покупке</p>
            <div className="mt-5">
              <ReviewForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>

      <BrandStory />
      <CollectionsSection />
      <ReviewsSection averageRating={averageRating} />
      <Newsletter />
    </>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

interface HeroWord {
  w: string;
  accent?: boolean;
}

const HERO_WORDS: HeroWord[] = [
  { w: "Ароматы," },
  { w: "созданные" },
  { w: "для" },
  { w: "тех," },
  { w: "кто" },
  { w: "оставляет", accent: true },
  { w: "впечатление", accent: true },
];

function Hero({ averageRating }: { averageRating: number }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Параллакс за курсором
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18 });

  const bottleX = useTransform(springX, (v) => v * 30);
  const bottleY = useTransform(springY, (v) => v * 20);
  const sideX = useTransform(springX, (v) => v * -18);
  const sideY = useTransform(springY, (v) => v * -14);
  const ringX = useTransform(springX, (v) => v * -12);
  const ringY = useTransform(springY, (v) => v * -10);

  // Параллакс при прокрутке
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scrollGlowY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollContentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="texture-noise relative overflow-hidden bg-ink-950 pb-20 pt-32 sm:pb-28 sm:pt-40"
    >
      {/* Анимированный фон */}
      <AnimatedBackground variant="dark" />
      
      {/* Декоративные световые эффекты с параллаксом скролла */}
      <motion.div
        style={{ y: scrollGlowY }}
        className="glow-radial pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem]"
        aria-hidden
      />
      <motion.div
        style={{ y: scrollGlowY }}
        className="glow-radial pointer-events-none absolute -right-52 bottom-0 h-[38rem] w-[38rem]"
        aria-hidden
      />

      <HeroParticles />
      <FloatingParticles count={15} color="rgba(191, 161, 95, 0.4)" />

      {/* Медленно вращающиеся орнаментальные кольца */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        aria-hidden
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="h-[42rem] w-[42rem] rounded-full border border-dashed border-gold-500/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dotted border-gold-500/10"
        />
      </motion.div>

      {/* Декоративные 3D-элементы */}
      <motion.div
        className="pointer-events-none absolute left-[15%] top-[20%] hidden lg:block"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div className="h-16 w-16 rounded-full border border-gold-500/15" />
      </motion.div>
      
      <motion.div
        className="pointer-events-none absolute right-[20%] bottom-[25%] hidden lg:block"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <div className="h-12 w-12 rounded-full border border-gold-500/10" />
      </motion.div>

      <span
        className="pointer-events-none absolute left-1/2 top-24 hidden h-px w-[42rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent lg:block"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <motion.div
          style={{ y: scrollContentY, opacity: contentOpacity }}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className="text-[11px] font-semibold uppercase tracking-luxe text-gold-500"
          >
            Искусство восточной парфюмерии
          </motion.p>

          {/* Заголовок со пословным появлением */}
          <h1 className="mt-5 font-display text-[2.6rem] font-medium leading-[1.08] text-cream-50 sm:text-6xl lg:text-[4.2rem]">
            {HERO_WORDS.map((word, index) => (
              <span key={word.w} className="inline-block overflow-hidden pb-1 align-top">
                <motion.span
                  initial={{ y: "112%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.25 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    "mr-[0.28em] inline-block last:mr-0 " +
                    (word.accent ? "not-italic gold-shimmer-text" : "")
                  }
                >
                  {word.w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-cream-200/70 sm:text-base lg:mx-0"
          >
            Откройте коллекцию Fatima Noor — восточная глубина, современная
            эстетика и характер, который невозможно забыть.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Magnetic className="w-full justify-center sm:w-auto">
              <ActionButton to="/catalog" variant="gold" size="lg" className="w-full sm:w-auto">
                Смотреть коллекцию
                <ArrowRight size={16} aria-hidden />
              </ActionButton>
            </Magnetic>
            <Magnetic className="w-full justify-center sm:w-auto">
              <ActionButton to="/about" variant="outline" size="lg" className="w-full border-cream-100/25 sm:w-auto">
                Узнать о бренде
              </ActionButton>
            </Magnetic>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.15 }}
            className="mx-auto mt-12 flex max-w-md items-start justify-center gap-8 lg:mx-0 lg:justify-start"
          >
            <HeroStat value={<CountUp value={products.length} />} label="ароматов в каталоге" />
            <HeroStat value={<CountUp value={averageRating} decimals={1} />} label="средняя оценка" />
            <HeroStat value={<CountUp value={100} suffix="%" />} label="оригинальная продукция" />
          </motion.dl>
        </motion.div>

        {/* Композиция флаконов: параллакс мыши + скролла + левитация + 3D */}
        <motion.div
          style={{ y: visualY, scale: visualScale }}
          className="relative mx-auto w-full max-w-sm lg:max-w-md"
          aria-hidden
        >
          <motion.div style={{ x: ringX, y: ringY }} className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/15" />
            <div className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10" />
          </motion.div>

          <motion.div style={{ x: bottleX, y: bottleY }}>
            <motion.div
              animate={{ y: [0, -12, 0], rotateY: [0, 5, -5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <BottleSilhouette name="Khamrah" className="relative z-10 mx-auto w-56 drop-shadow-2xl sm:w-64" liquid="#a35f22" glow="#c98a3d" />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: sideX, y: sideY }} className="absolute left-0 top-16 hidden sm:block">
            <motion.div
              animate={{ y: [0, 10, 0], rotateY: [0, -3, 3, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="w-32 opacity-60"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <BottleSilhouette name="Asad" className="w-full" liquid="#5c3a12" glow="#bfa15f" small />
            </motion.div>
          </motion.div>

          <motion.div style={{ x: ringX, y: sideY }} className="absolute right-0 top-28 hidden sm:block">
            <motion.div
              animate={{ y: [0, -8, 0], rotateY: [0, 4, -4, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              className="w-28 opacity-50"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <BottleSilhouette name="Yara" className="w-full" liquid="#b06890" glow="#e8bccd" small />
            </motion.div>
          </motion.div>
          
          {/* Свечение за флаконами */}
          <GlowOrb size={400} color="rgba(191, 161, 95, 0.06)" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>

      <OrnamentDivider className="mt-16 sm:mt-20" />
    </section>
  );
}

/** Медленно всплывающие золотые частицы с 3D-эффектом и свечением. */
const PARTICLES = Array.from({ length: 20 }, (_, index) => ({
  left: `${6 + ((index * 37) % 88)}%`,
  size: 3 + (index % 5),
  duration: 8 + (index % 6) * 2,
  delay: index * 0.7,
  rotation: index * 30,
}));

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            bottom: -12,
            background: index % 3 === 0
              ? "radial-gradient(circle, rgba(230, 215, 174, 0.9), rgba(191, 161, 95, 0.4))"
              : "radial-gradient(circle, rgba(191, 161, 95, 0.8), rgba(191, 161, 95, 0.2))",
            boxShadow: index % 2 === 0
              ? `0 0 ${6 + index % 4}px rgba(191, 161, 95, 0.6)`
              : "none",
          }}
          animate={{ 
            y: [0, -500 - index * 24], 
            opacity: [0, 0.9, 0],
            rotate: [0, particle.rotation],
            scale: [0.3, 1.4, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
            times: [0, 0.4, 1],
          }}
        />
      ))}
    </div>
  );
}

function HeroStat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="text-center lg:text-left">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-2xl font-semibold text-gold-400">{value}</dd>
      <p className="mt-1 max-w-[7.5rem] text-[11px] leading-snug text-cream-200/50">{label}</p>
    </div>
  );
}

/** Упрощённый силуэт флакона для hero-композиции. */
function BottleSilhouette({
  name,
  className,
  liquid,
  glow,
  small = false,
}: {
  name: string;
  className?: string;
  liquid: string;
  glow: string;
  small?: boolean;
}) {
  return (
    <svg viewBox="0 0 300 400" className={className}>
      <defs>
        <radialGradient id={`hero-glow-${name}`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.22" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="400" fill={`url(#hero-glow-${name})`} />
      <rect x="122" y="96" width="56" height="36" fill="#0c0a08" stroke={glow} strokeOpacity="0.4" strokeWidth="1.5" />
      <rect x="112" y="58" width="76" height="40" rx="8" fill={glow} fillOpacity="0.85" />
      <rect x="75" y="130" width="150" height="212" rx="18" fill="#16120c" stroke={glow} strokeOpacity="0.55" strokeWidth="1.8" />
      {!small && (
        <>
          <rect x="83" y="196" width="134" height="138" rx="13" fill={liquid} opacity="0.92" />
          <rect x="89" y="144" width="7" height="186" rx="4" fill="#fff" opacity="0.1" />
          <text x="150" y="176" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" letterSpacing="4" fill="#fff" opacity="0.7">
            {name.toUpperCase()}
          </text>
        </>
      )}
    </svg>
  );
}

/* ------------------------------ Benefits strip ----------------------------- */

function BenefitsStrip() {
  const benefits = [
    { icon: Truck, title: "Быстрая доставка", text: "По всей России, от 5 000 ₽ — бесплатно" },
    { icon: ShieldCheck, title: "Оригинальная продукция", text: "Официальные поставки парфюмерии" },
    { icon: Gift, title: "Подарочная упаковка", text: "Элегантное оформление к любому заказу" },
  ];

  return (
    <section aria-label="Преимущества" className="border-b border-ink-950/8 bg-cream-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <motion.span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-500/40 text-gold-600"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <benefit.icon size={20} strokeWidth={1.5} aria-hidden />
            </motion.span>
            <div>
              <h2 className="text-sm font-semibold text-ink-950">{benefit.title}</h2>
              <p className="mt-0.5 text-xs text-graphite-400">{benefit.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Категории -------------------------------- */

function CategoryCard({ category }: { category: (typeof HOME_CATEGORIES)[number] }) {
  return (
    <TiltCard className="h-full">
      <Link
        to={`/catalog?${new URLSearchParams(category.query).toString()}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-gradient-to-b from-ink-800 to-ink-950 p-6 shadow-lg shadow-black/10 transition-shadow duration-500 hover:shadow-xl hover:shadow-gold-700/15 sm:p-8"
      >
        {/* Блик-свип при наведении */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[120%] skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[120%]"
        />
        <span
          className="absolute -right-6 -top-6 text-gold-500/25 transition-all duration-700 group-hover:scale-110 group-hover:text-gold-400/40"
          aria-hidden
        >
          <CategoryGlyph variant={category.variant} />
        </span>
        <div className="relative flex h-32 flex-col justify-end sm:h-40">
          <h3 className="font-display text-xl font-medium text-cream-50 transition-colors group-hover:text-gold-300 sm:text-2xl">
            {category.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-cream-200/55">{category.subtitle}</p>
          <span className="mt-3 inline-flex translate-y-1 items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-500 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            Смотреть
            <ArrowRight size={13} aria-hidden />
          </span>
        </div>
      </Link>
    </TiltCard>
  );
}

function CategoryGlyph({ variant }: { variant: string }) {
  const paths: Record<string, React.ReactNode> = {
    arch: <path d="M30 96 V52 a30 30 0 0 1 60 0 V96 M24 96 H96" />,
    crescent: <path d="M74 22 a38 38 0 1 0 0 76 a30 30 0 1 1 0 -76 z" />,
    star: <path d="M60 22 l6 26 26 6 -26 6 -6 26 -6 -26 -26 -6 26 -6 z" />,
    drop: <path d="M60 18 c18 26 28 38 28 54 a28 28 0 1 1 -56 0 c0 -16 10 -28 28 -54 z" />,
    flame: <path d="M60 16 c6 14 22 22 22 42 a22 22 0 1 1 -44 0 c0 -12 6 -18 10 -26 3 7 7 9 12 8 -3 -8 -3 -16 0 -24 z" />,
    gift: <path d="M26 50 h68 v46 h-68 z M20 36 h80 v18 h-80 z M60 36 v60 M60 36 c-14 0 -20 -6 -20 -12 0 -5 4 -8 9 -8 7 0 11 8 11 20 z" />,
  };
  return (
    <svg viewBox="0 0 120 120" width={150} height={150} fill="none" stroke="currentColor" strokeWidth={1.4}>
      {paths[variant]}
    </svg>
  );
}

/* ------------------------------ История бренда ---------------------------- */

function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  const frameY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden py-20 sm:py-28">
      <FloatingParticles count={10} color="rgba(191, 161, 95, 0.15)" />
      
      <div ref={sectionRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="relative mx-auto max-w-md">
              <motion.div
                style={{ y: frameY }}
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-gold-500/30"
                aria-hidden
              />
              <motion.div
                style={{ y: artY }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-ink-800 to-ink-950"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <StoryArt className="aspect-square w-full" />
                
                {/* Свечение на изображении */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  animate={{
                    boxShadow: [
                      "inset 0 0 30px rgba(191, 161, 95, 0.1)",
                      "inset 0 0 60px rgba(191, 161, 95, 0.15)",
                      "inset 0 0 30px rgba(191, 161, 95, 0.1)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden
                />
              </motion.div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
              О бренде
            </p>
            <h2 id="story-title" className="mt-3 font-display text-3xl font-medium leading-tight text-ink-950 sm:text-4xl">
              Восточное наследие в современном звучании
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-graphite-400 sm:text-base">
              Fatima Noor вдохновляется многовековыми традициями арабской парфюмерии:
              удом, амброй, розой и пряностями, которые веками составляли основу
              восточных ароматов. Каждый флакон — это диалог между наследием
              региона и современной эстетикой.
            </p>
            <OrnamentDivider className="my-7 !justify-start" />
            <p className="max-w-lg text-sm leading-relaxed text-graphite-400">
              Мы отбираем композиции, в которых чувствуется характер: глубокие,
              тёплые, запоминающиеся. Роскошь, заключённая во флаконе.
            </p>
            <Magnetic>
              <ActionButton to="/about" className="mt-8">
                Подробнее о бренде
                <ArrowRight size={15} aria-hidden />
              </ActionButton>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StoryArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <circle cx="200" cy="170" r="120" fill="none" stroke="#bfa15f" strokeOpacity="0.25" />
      <circle cx="200" cy="170" r="90" fill="none" stroke="#bfa15f" strokeOpacity="0.35" />
      {[...Array(12)].map((_, index) => {
        const angle = (index * Math.PI) / 6;
        const x1 = 200 + Math.cos(angle) * 90;
        const y1 = 170 + Math.sin(angle) * 90;
        const x2 = 200 + Math.cos(angle) * 120;
        const y2 = 170 + Math.sin(angle) * 120;
        return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#bfa15f" strokeOpacity="0.3" />;
      })}
      <path d="M200 90 l14 62 62 14 -62 14 -14 62 -14 -62 -62 -14 62 -14 z" fill="#bfa15f" fillOpacity="0.5" />
      <text x="200" y="330" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" letterSpacing="6" fill="#e6d7ae">
        FATIMA NOOR
      </text>
    </svg>
  );
}

/* -------------------------------- Коллекции ------------------------------- */

function CollectionsSection() {
  return (
    <section aria-labelledby="collections-title" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Подборки"
            title={<span id="collections-title">Ароматы под настроение</span>}
            description="Готовые подборки для любого повода — от утренней свежести до вечернего шлейфа."
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection, index) => (
            <Reveal key={collection.tag} delay={(index % 3) * 0.07}>
              <Link
                to={`/catalog?tag=${collection.tag}`}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-ink-950/10 bg-cream-100 px-6 py-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500/50 hover:bg-cream-50 hover:shadow-lg hover:shadow-gold-700/8"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold-500/10 to-transparent transition-all duration-700 group-hover:w-full"
                />
                <span className="relative">
                  <span className="block font-display text-xl font-medium text-ink-950 transition-colors group-hover:text-gold-700">
                    {collection.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-graphite-400">
                    {collection.description}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="relative ml-4 shrink-0 text-gold-600 transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Отзывы --------------------------------- */

function ReviewsSection({ averageRating }: { averageRating: number }) {
  const homeReviews = getHomeReviews();

  return (
    <section aria-labelledby="reviews-title" className="bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="Отзывы"
            title={<span id="reviews-title">Что говорят покупатели</span>}
            description={
              <>Средняя оценка ароматов каталога — {averageRating.toFixed(1)}. Реальные отзывы наших покупателей.</>
            }
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {homeReviews.slice(-6).reverse().map((review, index) => (
            <Reveal key={review.id} delay={index * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-gold-500/15 bg-ink-800/60 p-7 backdrop-blur transition-colors duration-500 hover:border-gold-500/35">
                <span className="font-display text-5xl leading-none text-gold-500/40" aria-hidden>
                  «
                </span>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-cream-200/85">
                  {review.text}
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-cream-100/10 pt-4">
                  <div>
                    <p className="text-sm font-medium text-cream-50">{review.authorName}</p>
                    <RatingStars rating={review.rating} size={12} className="mt-1.5" />
                  </div>
                  {review.date && (
                    <span className="text-[10px] text-cream-200/40">
                      {new Date(review.date).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
