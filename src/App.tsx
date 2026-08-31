import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { MobileMenu } from "./components/layout/MobileMenu";
import { SearchOverlay } from "./components/common/SearchOverlay";
import { SmoothScroll } from "./components/common/SmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { HomePage } from "./pages/HomePage";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductPage } from "./pages/ProductPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CartPage } from "./pages/CartPage";
import { AboutPage } from "./pages/AboutPage";
import { DeliveryPage } from "./pages/DeliveryPage";
import { NotFoundPage } from "./pages/NotFoundPage";

/** Плавный кросс-фейд страниц при смене маршрута. */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="flex-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Прокрутка наверх при смене маршрута
  useScrollToTop();

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      {/* Инерционный скролл + прогресс-линия + киноплёнка */}
      <SmoothScroll />
      <ScrollProgress />
      <div className="grain-overlay" aria-hidden />

      <Header onOpenSearch={() => setSearchOpen(true)} onOpenMenu={() => setMenuOpen(true)} />

      <AnimatedRoutes />

      <Footer />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
