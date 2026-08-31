import { useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { CatalogFilters } from "../../utils/filterProducts";
import { countActiveFilters, hasActiveFilters } from "../../utils/filterProducts";
import { useBodyLock } from "../../hooks/useBodyLock";
import { FiltersPanel, ActiveFiltersBar } from "./FiltersPanel";

interface MobileFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
  families: string[];
  priceBounds: { min: number; max: number };
}

/** Фильтры на мобильных: боковая панель поверх контента. */
export function MobileFilters({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  families,
  priceBounds,
}: MobileFiltersProps) {
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeCount = countActiveFilters(filters);

  return (
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Фильтры">
      <button
        type="button"
        aria-label="Закрыть фильтры"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm cursor-pointer"
      />
      <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-950/10 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-ink-950">
            <SlidersHorizontal size={16} aria-hidden />
            Фильтры
            {activeCount > 0 && (
              <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[11px] font-bold text-ink-950">
                {activeCount}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть панель фильтров"
            className="flex h-10 w-10 items-center justify-center rounded-full text-graphite-400 transition-colors hover:text-gold-700 cursor-pointer"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FiltersPanel
            filters={filters}
            onChange={onChange}
            families={families}
            priceBounds={priceBounds}
          />
        </div>

        <div className="space-y-3 border-t border-ink-950/10 px-5 py-4">
          {hasActiveFilters(filters) && (
            <ActiveFiltersBar filters={filters} onChange={onChange} onReset={onReset} />
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-ink-950 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50 transition-colors hover:bg-ink-800 cursor-pointer"
          >
            Показать результаты
          </button>
        </div>
      </div>
    </div>
  );
}
