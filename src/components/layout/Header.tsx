import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { NAV_LINKS } from "../../data/site";
import { useStore } from "../../store/StoreContext";
import { cn } from "../../utils/cn";

/** Активен ли пункт меню: точное совпадение пути и query-параметров. */
function isNavActive(to: string, location: { pathname: string; search: string }): boolean {
  const [path, query] = to.split("?");
  if (path !== location.pathname) return false;
  return query ? location.search === `?${query}` : true;
}

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}

/** Шапка: при прокрутке становится компактной и полупрозрачной (blur). */
export function Header({ onOpenSearch, onOpenMenu }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { favorites, cart } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 24);
  }, [location.pathname]);

  const favoritesCount = favorites.length;
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-gold-500/10 bg-ink-950/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-transparent bg-ink-950",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Открыть меню"
          className="flex h-10 w-10 items-center justify-center rounded-full text-cream-100 transition-colors hover:text-gold-400 lg:hidden cursor-pointer"
        >
          <Menu size={22} strokeWidth={1.5} aria-hidden />
        </button>

        <Link
          to="/"
          className="group flex shrink-0 flex-col items-center lg:items-start"
          aria-label="Fatima Noor — на главную"
        >
          <span className="font-display text-lg font-semibold tracking-[0.22em] text-cream-50 transition-colors group-hover:text-gold-300 sm:text-[1.35rem]">
            FATIMA NOOR
          </span>
          <span className="mt-0.5 hidden text-[9px] uppercase tracking-luxe text-gold-600 sm:block">
            perfumes
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  aria-current={isNavActive(link.to, location) ? "page" : undefined}
                  className={
                    isNavActive(link.to, location)
                      ? "relative py-2 text-[12.5px] tracking-wide text-gold-400 transition-colors duration-300"
                      : "relative py-2 text-[12.5px] tracking-wide text-cream-100/85 transition-colors duration-300 hover:text-gold-300"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Поиск по каталогу"
            className="flex h-10 w-10 items-center justify-center rounded-full text-cream-100 transition-colors hover:text-gold-400 cursor-pointer"
          >
            <Search size={20} strokeWidth={1.5} aria-hidden />
          </button>

          <Link
            to="/favorites"
            aria-label={`Избранное${favoritesCount ? `, товаров: ${favoritesCount}` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream-100 transition-colors hover:text-gold-400"
          >
            <Heart size={20} strokeWidth={1.5} aria-hidden />
            {favoritesCount > 0 && <CounterBadge value={favoritesCount} />}
          </Link>

          <Link
            to="/cart"
            aria-label={`Корзина${cartCount ? `, товаров: ${cartCount}` : ""}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-cream-100 transition-colors hover:text-gold-400"
          >
            <ShoppingBag size={20} strokeWidth={1.5} aria-hidden />
            {cartCount > 0 && <CounterBadge value={cartCount} />}
          </Link>
        </div>
      </div>
    </header>
  );
}

function CounterBadge({ value }: { value: number }) {
  return (
    <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold leading-none text-ink-950">
      {value > 99 ? "99+" : value}
    </span>
  );
}
