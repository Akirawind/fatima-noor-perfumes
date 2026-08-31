const currencySymbols: Record<string, string> = {
  RUB: "₽",
  USD: "$",
  EUR: "€",
};

/** «8 900 ₽» — формат цены с неразрывными пробелами. */
export function formatPrice(value: number, currency = "RUB"): string {
  const formatted = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted}\u00A0${currencySymbols[currency] ?? currency}`;
}

/** Русская плюрализация: pluralize(3, ['товар', 'товара', 'товаров']). */
export function pluralize(count: number, forms: [string, string, string]): string {
  const abs = Math.abs(count) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

export function formatVolume(volume: number): string {
  return `${volume}\u00A0мл`;
}

export function formatCount(count: number, one: string, many: string): string {
  return `${count} ${pluralize(count, [one, one, many])}`;
}
