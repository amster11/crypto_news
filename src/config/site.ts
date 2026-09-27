/**
 * Global site configuration.
 *
 * Values wrapped in square brackets — e.g. "[Телефон]" — are placeholders.
 * They are rendered as-is on the site, but are automatically excluded from
 * links (tel:, mailto:) and Schema.org markup until real data is provided.
 */
export const siteConfig = {
  /** Legal / brand name used in texts, titles and structured data. */
  name: "[Название компании]",
  /** Text logo. Replace with the real brand when available. */
  logo: {
    monogram: "CN",
    wordmark: "Company Name",
    tagline: "Business Services",
  },
  description:
    "Юридический адрес от собственников, регистрация компании и комплексное сопровождение бизнеса — всё в одном месте.",
  /** Production URL. Set NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  locale: "ru_RU",
  language: "ru",
  /** Currency used in prices and Schema.org offers. */
  currency: "EUR",

  contacts: {
    phone: "[Телефон]",
    /** Digits only, international format, e.g. "35799123456". */
    whatsapp: "[WhatsApp]",
    email: "[Email]",
    address: "[Адрес]",
    city: "[Город]",
    country: "[Страна]",
    workingHours: "[Часы работы]",
  },

  /** Leave empty until real profiles exist. */
  socials: [] as { label: string; href: string }[],

  legal: {
    entityName: "[Юридическое наименование]",
    registrationNumber: "[Регистрационный номер]",
    policyUpdatedAt: "[Дата]",
  },

  copyrightYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
