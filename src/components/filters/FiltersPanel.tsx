import { X } from "lucide-react";
import type { CatalogFilters } from "../../utils/filterProducts";
import { VOLUME_OPTIONS } from "../../utils/filterProducts";
import { TAG_LABELS, GENDER_LABELS, BADGE_LABELS } from "../../data/categories";
import { cn } from "../../utils/cn";

interface FiltersPanelProps {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  families: string[];
  priceBounds: { min: number; max: number };
}

/** Панель фильтров каталога. Используется в сайдбаре и в мобильном drawer. */
export function FiltersPanel({
  filters,
  onChange,
  families,
  priceBounds,
}: FiltersPanelProps) {
  const toggleFamily = (family: string) => {
    onChange({
      families: filters.families.includes(family)
        ? filters.families.filter((item) => item !== family)
        : [...filters.families, family],
    });
  };

  const toggleVolume = (volume: number) => {
    onChange({
      volumes: filters.volumes.includes(volume)
        ? filters.volumes.filter((item) => item !== volume)
        : [...filters.volumes, volume],
    });
  };

  return (
    <div className="space-y-8">
      <FilterGroup title="Категория">
        <div className="flex flex-wrap gap-2">
          {Object.entries(BADGE_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              active={filters.badge === key}
              onClick={() => onChange({ badge: filters.badge === key ? "" : (key as CatalogFilters["badge"]) })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Пол">
        <div className="flex flex-wrap gap-2">
          {Object.entries(GENDER_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              active={filters.gender === key}
              onClick={() =>
                onChange({ gender: filters.gender === key ? "" : (key as CatalogFilters["gender"]) })
              }
            >
              {label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Тип аромата">
        <div className="flex flex-wrap gap-2">
          {families.map((family) => (
            <Chip
              key={family}
              active={filters.families.includes(family)}
              onClick={() => toggleFamily(family)}
            >
              {family}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Коллекция">
        <div className="flex flex-wrap gap-2">
          {Object.entries(TAG_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              active={filters.tag === key}
              onClick={() => onChange({ tag: filters.tag === key ? "" : key })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Объём">
        <div className="flex flex-wrap gap-2">
          {VOLUME_OPTIONS.map((volume) => (
            <Chip
              key={volume}
              active={filters.volumes.includes(volume)}
              onClick={() => toggleVolume(volume)}
            >
              {volume} мл
            </Chip>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Цена, ₽">
        <div className="flex items-center gap-3">
          <PriceInput
            label="от"
            value={filters.priceMin ?? ""}
            placeholder={String(priceBounds.min)}
            onChange={(value) =>
              onChange({ priceMin: value === "" ? null : Math.max(0, value) })
            }
          />
          <span className="h-px w-4 bg-graphite-400/50" aria-hidden />
          <PriceInput
            label="до"
            value={filters.priceMax ?? ""}
            placeholder={String(priceBounds.max)}
            onChange={(value) =>
              onChange({ priceMax: value === "" ? null : Math.max(0, value) })
            }
          />
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-luxe text-graphite-400">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs transition-all duration-300 cursor-pointer",
        active
          ? "border-gold-600 bg-gold-500/15 text-gold-700"
          : "border-ink-950/15 text-graphite-400 hover:border-gold-500/60 hover:text-gold-700",
      )}
    >
      {children}
    </button>
  );
}

function PriceInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: number | "";
  placeholder: string;
  onChange: (value: number | "") => void;
}) {
  return (
    <label className="relative flex flex-1 items-center">
      <span className="pointer-events-none absolute left-3 text-xs text-graphite-400">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          const parsed = event.target.value === "" ? "" : Number(event.target.value);
          onChange(Number.isNaN(parsed) ? "" : parsed);
        }}
        className="w-full rounded-lg border border-ink-950/15 bg-transparent py-2 pl-9 pr-2 text-sm text-ink-950 placeholder:text-graphite-400/60 focus:border-gold-500 focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </label>
  );
}

/** Список активных фильтров в виде чипов с крестиками + кнопка сброса. */
export function ActiveFiltersBar({
  filters,
  onChange,
  onReset,
}: {
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
  onReset: () => void;
}) {
  const chips: Array<{ label: string; clear: () => void }> = [];

  if (filters.q) {
    chips.push({
      label: `«${filters.q}»`,
      clear: () => onChange({ q: "" }),
    });
  }
  if (filters.gender) {
    chips.push({
      label: GENDER_LABELS[filters.gender],
      clear: () => onChange({ gender: "" }),
    });
  }
  if (filters.badge) {
    chips.push({
      label: BADGE_LABELS[filters.badge],
      clear: () => onChange({ badge: "" }),
    });
  }
  if (filters.tag) {
    chips.push({
      label: TAG_LABELS[filters.tag] ?? filters.tag,
      clear: () => onChange({ tag: "" }),
    });
  }
  for (const family of filters.families) {
    chips.push({
      label: family,
      clear: () =>
        onChange({ families: filters.families.filter((item) => item !== family) }),
    });
  }
  for (const volume of filters.volumes) {
    chips.push({
      label: `${volume} мл`,
      clear: () => onChange({ volumes: filters.volumes.filter((item) => item !== volume) }),
    });
  }
  if (filters.priceMin !== null || filters.priceMax !== null) {
    chips.push({
      label: `Цена: ${filters.priceMin ?? "…"} – ${filters.priceMax ?? "…"}`,
      clear: () => onChange({ priceMin: null, priceMax: null }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.clear}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink-950/6 py-1.5 pl-3 pr-2 text-xs text-ink-800 transition-colors hover:bg-bordeaux-700/10 cursor-pointer"
        >
          {chip.label}
          <X size={13} className="text-graphite-400" aria-hidden />
          <span className="sr-only">Сбросить фильтр</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="ml-1 text-xs font-semibold uppercase tracking-wider text-bordeaux-600 underline-offset-4 transition-colors hover:text-bordeaux-700 hover:underline cursor-pointer"
      >
        Сбросить всё
      </button>
    </div>
  );
}
