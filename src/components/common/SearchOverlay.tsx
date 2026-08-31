import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { products } from "../../data/products";
import { formatPrice } from "../../utils/format";
import { useBodyLock } from "../../hooks/useBodyLock";
import { PerfumeArt } from "../common/PerfumeArt";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/** Полноэкранный поиск с живыми результатами по названию и описанию. */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const results =
    normalizedQuery.length >= 2
      ? products
          .filter(
            (product) =>
              product.name.toLowerCase().includes(normalizedQuery) ||
              product.description.toLowerCase().includes(normalizedQuery) ||
              product.fragranceFamily.toLowerCase().includes(normalizedQuery),
          )
          .slice(0, 6)
      : [];

  function goToCatalog() {
    navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && query.trim()) {
      goToCatalog();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col bg-ink-950/97 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="Поиск по каталогу"
    >
      <div className="mx-auto w-full max-w-3xl px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="flex items-center gap-4 border-b border-gold-500/25 pb-4">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Найти аромат…"
            aria-label="Поисковый запрос"
            className="w-full bg-transparent font-display text-2xl font-medium text-cream-50 placeholder:text-graphite-400 focus:outline-none sm:text-3xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть поиск"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream-100/15 text-cream-100 transition-colors hover:border-gold-400/60 hover:text-gold-300 cursor-pointer"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {normalizedQuery.length >= 2 && results.length === 0 && (
          <p className="mt-10 text-center text-sm text-cream-200/60">
            Ничего не найдено. Попробуйте изменить запрос.
          </p>
        )}

        {results.length > 0 && (
          <>
            <ul className="mt-8 space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                      onClose();
                    }}
                    className="group flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors hover:bg-ink-800/70 cursor-pointer"
                  >
                    <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ink-800">
                      <PerfumeArt seed={product.name} palette={product.art} className="h-full w-full" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-cream-100 group-hover:text-gold-300">
                        {product.name}
                      </span>
                      <span className="block truncate text-xs text-cream-200/50">
                        {product.fragranceFamily}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm text-gold-400">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex justify-center pb-10">
              <button
                type="button"
                onClick={goToCatalog}
                className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-400 transition-all hover:bg-gold-500/10 cursor-pointer"
              >
                Все результаты
                <ArrowUpRight size={15} aria-hidden />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
