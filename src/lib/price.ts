import { siteConfig } from "@/config/site";

/** A price: either an amount (optionally "от …", "за 11 месяцев") or a text label. */
export type Price = {
  amount?: number;
  prefix?: "от";
  /** Shown after the amount, e.g. "за 11 месяцев". */
  suffix?: string;
  /** Used when there is no amount, e.g. "По запросу". */
  label?: string;
};

const formatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function formatAmount(amount: number) {
  return `${formatter.format(amount)} ₽`;
}

/** "от 23 000 ₽ за 11 месяцев" / "По запросу" */
export function formatPrice(price: Price) {
  if (price.amount === undefined) return price.label ?? "По запросу";
  return [price.prefix, formatAmount(price.amount), price.suffix].filter(Boolean).join(" ");
}

export const currency = siteConfig.currency;
