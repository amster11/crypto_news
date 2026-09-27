/**
 * Image library. Replace `src` with your own photos (local files in /public
 * or any host allowed in next.config.ts → images.remotePatterns).
 * Current images: Unsplash (free license).
 */
export type SiteImage = { src: string; alt: string };

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;

export const images = {
  hero: {
    src: unsplash("photo-1486406146926-c627a92ad1ab"),
    alt: "Фасад современного делового здания из стекла и стали",
  },
  office: {
    src: unsplash("photo-1497366216548-37526070297c"),
    alt: "Светлый интерьер современного офиса",
  },
  officeLounge: {
    src: unsplash("photo-1497366811353-6870744d04b2"),
    alt: "Переговорная зона в минималистичном офисе",
  },
  architecture: {
    src: unsplash("photo-1449157291145-7efd050a4d0e"),
    alt: "Архитектура делового квартала",
  },
  documents: {
    src: unsplash("photo-1554469384-e58fac16e23a"),
    alt: "Деловое здание с геометричным фасадом",
  },
  interior: {
    src: unsplash("photo-1524758631624-e2822e304c36"),
    alt: "Рабочее пространство с дизайнерской мебелью",
  },
} satisfies Record<string, SiteImage>;
