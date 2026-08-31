import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";
import {
  EMPTY_FILTERS,
  SORT_LABELS,
  VOLUME_OPTIONS,
  filterAndSortProducts,
  hasActiveFilters,
  countActiveFilters,
  type CatalogFilters,
  type SortKey,
} from "../utils/filterProducts";
import { products } from "../data/products";
import { TAG_LABELS, BADGE_LABELS, GENDER_LABELS } from "../data/categories";
import { GENDER_STYLE } from "../utils/genderStyle";
import { ProductGrid } from "../components/product/ProductGrid";
import { ActiveFiltersBar, FiltersPanel } from "../components/filters/FiltersPanel";
import { MobileFilters } from "../components/filters/MobileFilters";
import { EmptyState } from "../components/common/EmptyState";
import { Reveal } from "../components/common/Section";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cn } from "../utils/cn";

const PAGE_SIZE = 8;

/** Разбирает параметры URL в состояние фильтров. */
function parseFilters(search: string): CatalogFilters {
  const params = new URLSearchParams(search);
  const badgeParam = params.get("badge");
  const genderParam = params.get("gender");
  return {
    ...EMPTY_FILTERS,
    q: params.get("q") ?? "",
    gender:
      genderParam === "women" || genderParam === "men" || genderParam === "unisex"
        ? genderParam
        : "",
    badge:
      badgeParam === "new" || badgeParam === "bestseller" || badgeParam === "exclusive"
        ? badgeParam
        : "",
    tag: params.get("tag") ?? "",
    sort: (params.get("sort") as SortKey) ?? "popular",
  };
}

export function CatalogPage() {
  useDocumentMeta({
    title: "Каталог ароматов — Fatima Noor",
    description:
      "Полный каталог арабской парфюмерии Fatima Noor: фильтры по полу, типу аромата, объёму и цене.",
  });

  const [filters, setFilters] = useState<CatalogFilters>(() =>
    parseFilters(window.location.search),
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();

  // Синхронизация фильтров при переходах по ссылкам меню (?gender=, ?badge= и т.д.)
  useEffect(() => {
    setFilters(parseFilters(location.search));
    setVisibleCount(PAGE_SIZE);
  }, [location.search]);

  const families = useMemo(
    () => [...new Set(products.map((product) => product.fragranceFamily))].sort((a, b) => a.localeCompare(b, "ru")),
    [],
  );
  const priceBounds = useMemo(() => {
    const prices = products.map((product) => product.price);
    return { min: Math.floor(Math.min(...prices) / 100) * 100, max: Math.ceil(Math.max(...prices) / 100) * 100 };
  }, []);

  const filtered = useMemo(
    () => filterAndSortProducts(products, filters),
    [filters],
  );
  const visibleProducts = filtered.slice(0, visibleCount);

  function update(patch: Partial<CatalogFilters>) {
    setFilters((current) => ({ ...current, ...patch }));
    setVisibleCount(PAGE_SIZE);
  }

  function reset() {
    setFilters(EMPTY_FILTERS);
    setVisibleCount(PAGE_SIZE);
    window.history.replaceState(null, "", "/catalog");
  }

  /** Человекочитаемое описание текущего среза каталога для заголовка. */
  const contextLabel = filters.badge
    ? BADGE_LABELS[filters.badge]
    : filters.tag
      ? TAG_LABELS[filters.tag]
      : filters.gender
        ? GENDER_LABELS[filters.gender]
        : null;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-luxe text-gold-600">
          Каталог
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink-950 sm:text-5xl">
          {contextLabel ?? "Все ароматы"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-graphite-400">
          Восточная парфюмерия ручной работы чувств — выберите фильтры или
          доверьтесь интуиции.
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        {/* Сайдбар фильтров (desktop) */}
        <aside className="hidden lg:block" aria-label="Фильтры каталога">
          <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-4">
            <FiltersPanel
              filters={filters}
              onChange={update}
              families={families}
              priceBounds={priceBounds}
            />
          </div>
        </aside>

        <section aria-label="Товары">
          {/* Панель управления */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/10 pb-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                aria-label={`Открыть фильтры${countActiveFilters(filters) > 0 ? ` (${countActiveFilters(filters)} активных)` : ""}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink-950/15 px-4 py-2 text-xs font-medium transition-colors hover:border-gold-500 hover:text-gold-700 lg:hidden cursor-pointer"
              >
                <SlidersHorizontal size={14} aria-hidden />
                Фильтры
                {countActiveFilters(filters) > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                    {countActiveFilters(filters)}
                  </span>
                )}
              </button>
              <p className="text-sm text-graphite-400">
                Найдено: <span className="font-semibold text-ink-950">{filtered.length}</span>
              </p>
              {/* Легенда цветового кодирования по полу */}
              <p className="hidden items-center gap-3 text-[11px] text-graphite-400 xl:flex" aria-label="Цвета карточек по полу аромата">
                {(["women", "men", "unisex"] as const).map((g) => (
                  <span key={g} className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: GENDER_STYLE[g].base }} aria-hidden />
                    {GENDER_STYLE[g].label}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1 rounded-full border border-ink-950/10 p-1 sm:flex" role="group" aria-label="Вид сетки">
                <ViewToggleButton active={density === "compact"} onClick={() => setDensity("compact")} label="Компактная сетка">
                  <LayoutGrid size={15} aria-hidden />
                </ViewToggleButton>
                <ViewToggleButton active={density === "comfortable"} onClick={() => setDensity("comfortable")} label="Крупная сетка">
                  <LayoutList size={15} aria-hidden />
                </ViewToggleButton>
              </div>

              <label className="flex items-center gap-2 text-xs text-graphite-400">
                <span className="hidden sm:inline">Сортировка</span>
                <select
                  value={filters.sort}
                  onChange={(event) => update({ sort: event.target.value as SortKey })}
                  className="rounded-full border border-ink-950/15 bg-transparent px-4 py-2 text-xs text-ink-950 focus:border-gold-500 focus:outline-none cursor-pointer"
                >
                  {Object.entries(SORT_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {hasActiveFilters(filters) && (
            <div className="mt-5">
              <ActiveFiltersBar filters={filters} onChange={update} onReset={reset} />
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              title="Ничего не найдено"
              description="По заданным фильтрам ароматов нет. Попробуйте смягчить условия или сбросить фильтры."
              action={{ label: "Сбросить фильтры", to: "/catalog" }}
            />
          ) : (
            <>
              <Reveal className="mt-8" key={`${filters.sort}-${filtered.length}`}>
                <ProductGrid products={visibleProducts} density={density} />
              </Reveal>

              {visibleCount < filtered.length && (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <p className="text-xs text-graphite-400">
                    Показано {visibleProducts.length} из {filtered.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="rounded-full border border-ink-950/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-950 transition-all hover:border-gold-500 hover:bg-gold-500/10 hover:text-gold-700 cursor-pointer"
                  >
                    Показать ещё
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <MobileFilters
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={update}
        onReset={reset}
        families={families}
        priceBounds={priceBounds}
      />

      {/* Список всех объёмов для SEO/доступности */}
      <p className="sr-only">
        Доступные объёмы: {VOLUME_OPTIONS.map((volume) => `${volume} мл`).join(", ")}.
      </p>
    </main>
  );
}

function ViewToggleButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex h-8 w-9 items-center justify-center rounded-full transition-colors cursor-pointer",
        active ? "bg-ink-950 text-cream-50" : "text-graphite-400 hover:text-gold-700",
      )}
    >
      {children}
    </button>
  );
}
