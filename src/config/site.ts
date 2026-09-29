/**
 * Global site configuration.
 *
 * Values wrapped in square brackets — e.g. "[Телефон]" — are placeholders.
 * They are rendered as-is on the site, but are automatically excluded from
 * links (tel:, mailto:, messengers) and Schema.org markup until real data is provided.
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
    "Регистрация ООО, АО и ИП, юридические адреса от собственников в Москве, сопровождение налоговых проверок и ликвидация компаний.",
  /** Production URL. Set NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, ""),
  locale: "ru_RU",
  language: "ru",
  /** Currency used in prices and Schema.org offers. */
  currency: "RUB",

  contacts: {
    phone: "[Телефон]",
    email: "[Email]",
    address: "[Адрес]",
    city: "Москва",
    country: "Россия",
    /** Country code for Schema.org (ISO 3166-1). */
    countryCode: "RU",
    workingHours: "[Часы работы]",
    /** Telegram username without @, e.g. "company_bot". */
    telegram: "[Telegram]",
    /** Full link to the MAX chat/profile. */
    max: "[MAX]",
  },

  /** Other social profiles (optional). */
  socials: [] as { label: string; href: string }[],

  legal: {
    entityName: "[Юридическое наименование]",
    registrationNumber: "[ОГРН / ИНН]",
    policyUpdatedAt: "[Дата]",
  },

  copyrightYear: 2026,
} as const;

export type SiteConfig = typeof siteConfig;
