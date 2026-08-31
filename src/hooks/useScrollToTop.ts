import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../components/common/SmoothScroll";

/** Прокрутка наверх при смене маршрута + переход к #якорям через Lenis. */
export function useScrollToTop(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(target, { offset: -96 });
        else target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 90);
      return () => window.clearTimeout(timer);
    }

    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}
