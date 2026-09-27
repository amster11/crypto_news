export const routes = {
  home: "/",
  services: "/uslugi",
  legalAddress: "/yuridicheskiy-adres",
  registration: "/registraciya-biznesa",
  turnkey: "/biznes-pod-klyuch",
  additional: "/dopolnitelnye-uslugi",
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

export const footerNav = {
  services: {
    title: "Услуги",
    links: [
      { label: "Юридический адрес", href: routes.legalAddress },
      { label: "Регистрация бизнеса", href: routes.registration },
      { label: "Бизнес под ключ", href: routes.turnkey },
      { label: "Дополнительные услуги", href: routes.additional },
    ],
  },
  company: {
    title: "Компания",
    links: [
      { label: "О компании", href: routes.about },
      { label: "Цены", href: routes.pricing },
      { label: "FAQ", href: routes.faq },
      { label: "Контакты", href: routes.contacts },
    ],
  },
};
