export const routes = {
  home: "/",
  services: "/uslugi",
  registration: "/registraciya-biznesa",
  legalAddress: "/yuridicheskiy-adres",
  taxAudits: "/nalogovye-proverki",
  liquidation: "/likvidaciya",
  consulting: "/konsalting",
  pricing: "/ceny",
  about: "/o-kompanii",
  faq: "/faq",
  contacts: "/kontakty",
  privacy: "/politika-konfidencialnosti",
  terms: "/usloviya-ispolzovaniya",
} as const;

/** Anchor of the lead form. Every page with a form uses this id. */
export const FORM_ANCHOR = "zayavka";

export const mainNav = [
  { label: "Услуги", href: routes.services },
  { label: "Цены", href: routes.pricing },
  { label: "О компании", href: routes.about },
  { label: "FAQ", href: routes.faq },
  { label: "Контакты", href: routes.contacts },
];

export const primaryCta = {
  label: "Получить консультацию",
  href: `${routes.contacts}#${FORM_ANCHOR}`,
};

export const secondaryCta = {
  label: "Смотреть услуги",
  href: routes.services,
};

export const companyNav = {
  title: "Компания",
  links: [
    { label: "О компании", href: routes.about },
    { label: "Цены", href: routes.pricing },
    { label: "FAQ", href: routes.faq },
    { label: "Контакты", href: routes.contacts },
  ],
};
