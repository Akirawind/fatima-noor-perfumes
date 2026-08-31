let cached: boolean | null = null;

/** Разрешены ли «тяжёлые» эффекты (tilt, магнит, параллакс мыши).
 *  Только устройства с мышью и без prefers-reduced-motion. */
export function canUseAdvancedMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (cached === null) {
    cached =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return cached;
}
