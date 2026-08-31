import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, Heart, HeartOff, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { CartItem } from "../types";

interface Toast {
  id: number;
  message: string;
  icon: "cart" | "heart" | "heart-off" | "check";
}

export interface ToastIcon {
  cart: typeof ShoppingBag;
}

interface StoreContextValue {
  cart: CartItem[];
  addToCart: (productId: string, volume: number, qty?: number) => void;
  updateQty: (productId: string, volume: number, qty: number) => void;
  removeFromCart: (productId: string, volume: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toasts: Toast[];
  showToast: (message: string, icon?: Toast["icon"]) => void;
  dismissToast: (id: number) => void;
}

const CART_KEY = "fatimanoor.cart.v1";
const FAVORITES_KEY = "fatimanoor.favorites.v1";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const StoreContext = createContext<StoreContextValue | null>(null);

const TOAST_ICONS = {
  cart: ShoppingBag,
  heart: Heart,
  "heart-off": HeartOff,
  check: Check,
} as const;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(CART_KEY, []),
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    loadFromStorage<string[]>(FAVORITES_KEY, []),
  );
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(0);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* localStorage может быть недоступен — состояние останется в памяти */
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* см. выше */
    }
  }, [favorites]);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, icon: Toast["icon"] = "check") => {
      const id = nextToastId.current;
      nextToastId.current += 1;
      setToasts((current) => [...current.slice(-2), { id, message, icon }]);
      window.setTimeout(() => dismissToast(id), 2800);
    },
    [dismissToast],
  );

  const addToCart = useCallback(
    (productId: string, volume: number, qty = 1) => {
      setCart((current) => {
        const existing = current.find(
          (item) => item.productId === productId && item.volume === volume,
        );
        if (existing) {
          return current.map((item) =>
            item.productId === productId && item.volume === volume
              ? { ...item, qty: Math.min(item.qty + qty, 99) }
              : item,
          );
        }
        return [...current, { productId, volume, qty }];
      });
      showToast("Товар добавлен в корзину", "cart");
    },
    [showToast],
  );

  const updateQty = useCallback((productId: string, volume: number, qty: number) => {
    if (qty < 1) return;
    setCart((current) =>
      current.map((item) =>
        item.productId === productId && item.volume === volume
          ? { ...item, qty: Math.min(qty, 99) }
          : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId: string, volume: number) => {
    setCart((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.volume === volume),
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback(
    (productId: string) => {
      const added = !favorites.includes(productId);
      setFavorites((current) =>
        added
          ? [...current, productId]
          : current.filter((id) => id !== productId),
      );
      showToast(
        added ? "Товар добавлен в избранное" : "Товар удалён из избранного",
        added ? "heart" : "heart-off",
      );
    },
    [favorites, showToast],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      favorites,
      toggleFavorite,
      isFavorite,
      toasts,
      showToast,
      dismissToast,
    }),
    [
      cart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      favorites,
      toggleFavorite,
      isFavorite,
      toasts,
      showToast,
      dismissToast,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} dismissToast={dismissToast} />
    </StoreContext.Provider>
  );
}

function ToastViewport({
  toasts,
  dismissToast,
}: Pick<StoreContextValue, "toasts" | "dismissToast">) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-4 z-[120] flex w-[calc(100%-2rem)] max-w-xs flex-col gap-2 sm:right-6 sm:top-6"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = TOAST_ICONS[toast.icon];
          return (
            <motion.div
              key={toast.id}
              layout
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-gold-500/25 bg-ink-950/95 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-500/30 text-gold-400">
              <Icon size={15} strokeWidth={1.75} aria-hidden />
            </span>
            <p className="text-sm text-cream-100">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Закрыть уведомление"
              className="ml-auto shrink-0 text-graphite-400 transition-colors hover:text-gold-400"
            >
              <X size={14} aria-hidden />
            </button>
          </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore должен использоваться внутри StoreProvider");
  }
  return context;
}
