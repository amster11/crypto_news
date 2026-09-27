import { FORM_ANCHOR, routes } from "./navigation";

/**
 * Prices are placeholders. Replace "€XX" with real values once confirmed.
 */
export type PricingPlan = {
  id: "basic" | "business" | "full";
  name: string;
  subtitle: string;
  price: { value: string; prefix?: string; period?: string };
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    subtitle: "Юридический адрес",
    price: { value: "€XX", prefix: "от", period: "год" },
    features: ["Юридический адрес", "Подтверждение адреса", "Получение корреспонденции"],
    cta: { label: "Выбрать", href: `${routes.legalAddress}#${FORM_ANCHOR}` },
  },
  {
    id: "business",
    name: "Business",
    subtitle: "Регистрация компании",
    price: { value: "€XX", prefix: "от" },
    features: [
      "Подготовка документов",
      "Регистрация компании",
      "Юридический адрес",
      "Консультация",
    ],
    cta: { label: "Выбрать", href: `${routes.registration}#${FORM_ANCHOR}` },
    featured: true,
    badge: "Основной пакет",
  },
  {
    id: "full",
    name: "Full Service",
    subtitle: "Бизнес под ключ",
    price: { value: "€XX", prefix: "от" },
    features: [
      "Регистрация компании",
      "Юридический адрес",
      "Контактное лицо",
      "Административное сопровождение",
      "Консультация",
    ],
    cta: { label: "Обсудить проект", href: `${routes.turnkey}#${FORM_ANCHOR}` },
  },
];

/** Individual services listed on the pricing page. */
export const additionalPrices: { name: string; price: string }[] = [
  { name: "Юридический адрес — продление", price: "[Цена]" },
  { name: "Смена юридического адреса", price: "[Цена]" },
  { name: "Пересылка корреспонденции", price: "[Цена]" },
  { name: "Изменения в данных компании", price: "[Цена]" },
  { name: "Подготовка корпоративных документов", price: "[Цена]" },
  { name: "Консультация специалиста", price: "[Цена]" },
];

export const pricingNotes = [
  "Стоимость фиксируется до начала работы.",
  "Государственные пошлины и сборы — [уточнить: включены / оплачиваются отдельно].",
  "Итоговая цена зависит от состава услуг и срочности.",
];
