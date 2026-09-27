/**
 * FAQ. Answers in square brackets are placeholders: they are displayed on the
 * site but excluded from FAQPage structured data until replaced.
 */
export type FaqItem = { id: string; question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    id: "registration-time",
    question: "Сколько занимает регистрация компании?",
    answer: "[Ответ на вопрос]",
  },
  {
    id: "address-includes",
    question: "Что входит в услугу юридического адреса?",
    answer: "[Ответ на вопрос]",
  },
  {
    id: "address-owner",
    question: "Можно ли получить адрес от собственника?",
    answer: "[Ответ на вопрос]",
  },
  {
    id: "turnkey-includes",
    question: "Что входит в пакет «Бизнес под ключ»?",
    answer: "[Ответ на вопрос]",
  },
  {
    id: "address-only",
    question: "Можно ли заказать только юридический адрес?",
    answer: "[Ответ на вопрос]",
  },
  {
    id: "consultation",
    question: "Можно ли получить консультацию перед заказом?",
    answer: "[Ответ на вопрос]",
  },
];

export function getFaqItems(ids: string[]): FaqItem[] {
  return ids
    .map((id) => faqItems.find((item) => item.id === id))
    .filter((item): item is FaqItem => Boolean(item));
}
