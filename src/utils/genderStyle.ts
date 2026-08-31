import type { Gender } from "../types";

interface GenderAccent {
  label: string;
  /** Основной акцентный цвет (точки, линии, метки, цена). */
  base: string;
  /** Мягкая подложка блока цены. */
  soft: string;
  /** Заливка всей карточки. */
  wash: string;
  /** Панель цены поверх заливки карточки. */
  panel: string;
  /** Граница карточки и панели. */
  border: string;
  /** Цвет свечения карточки при наведении. */
  glow: string;
}

/** Приглушённая люксовая палитра полов: синий — розовый — серый. */
export const GENDER_STYLE: Record<Gender, GenderAccent> = {
  men: {
    label: "Для него",
    base: "#4d7095",
    soft: "rgba(77, 112, 149, 0.11)",
    wash: "rgba(77, 112, 149, 0.13)",
    panel: "rgba(77, 112, 149, 0.20)",
    border: "rgba(77, 112, 149, 0.35)",
    glow: "rgba(77, 112, 149, 0.38)",
  },
  women: {
    label: "Для неё",
    base: "#b0567a",
    soft: "rgba(176, 86, 122, 0.11)",
    wash: "rgba(176, 86, 122, 0.12)",
    panel: "rgba(176, 86, 122, 0.19)",
    border: "rgba(176, 86, 122, 0.36)",
    glow: "rgba(176, 86, 122, 0.38)",
  },
  unisex: {
    label: "Унисекс",
    base: "#847c6d",
    soft: "rgba(132, 124, 109, 0.14)",
    wash: "rgba(132, 124, 109, 0.15)",
    panel: "rgba(132, 124, 109, 0.23)",
    border: "rgba(132, 124, 109, 0.40)",
    glow: "rgba(132, 124, 109, 0.42)",
  },
};

/** CSS-переменные для передачи акцента в Tailwind-классы карточки. */
export function genderCssVars(gender: Gender): React.CSSProperties {
  const g = GENDER_STYLE[gender];
  return {
    ["--gender" as string]: g.base,
    ["--gender-soft" as string]: g.soft,
    ["--gender-wash" as string]: g.wash,
    ["--gender-panel" as string]: g.panel,
    ["--gender-border" as string]: g.border,
    ["--gender-glow" as string]: g.glow,
  };
}
