export interface PromoCode {
  code: string;
  percent: number;
}

/** Демонстрационные промокоды. При подключении backend — заменить на API-проверку. */
export const PROMO_CODES: PromoCode[] = [
  { code: "NOOR10", percent: 10 },
  { code: "AURA15", percent: 15 },
];

export function findPromoCode(input: string): PromoCode | null {
  const normalized = input.trim().toUpperCase();
  return PROMO_CODES.find((promo) => promo.code === normalized) ?? null;
}
