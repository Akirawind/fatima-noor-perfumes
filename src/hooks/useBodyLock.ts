import { useEffect } from "react";

/** Блокирует прокрутку body, пока открыты overlay-компоненты. */
export function useBodyLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
