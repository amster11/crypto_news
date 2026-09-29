import { FORM_ANCHOR } from "./navigation";
import { services } from "./services";
import type { Price } from "@/lib/price";

export type PricingPlan = {
  id: string;
  name: string;
  subtitle: string;
  price: Price;
  priceNote?: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

/** Pricing preview cards, built from data/services.ts. */
export const pricingPlans: PricingPlan[] = services
  .filter((service) => service.highlight)
  .map((service) => ({
    id: service.slug,
    name: `Услуга ${service.number}`,
    subtitle: service.menuTitle,
    price: service.price,
    priceNote: service.priceNote,
    features: (service.benefits?.items.map((item) => item.title) ?? service.offers.map((o) => o.title)).slice(0, 4),
    cta: { label: "Заказать", href: `${service.href}#${FORM_ANCHOR}` },
    featured: service.slug === "legal-address",
    badge: service.slug === "legal-address" ? "От собственников" : undefined,
  }));

export const pricingNotes = [
  "Стоимость фиксируется до начала работы.",
  "Нотариальные расходы и расходы на публикации оплачиваются отдельно — они указаны у каждой услуги.",
  "Цены на покупку готовой компании, консалтинг и сопровождение проверок — по запросу.",
];
