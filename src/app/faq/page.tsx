import { CTASection } from "@/components/CTASection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { faqItems } from "@/data/faq";
import { routes } from "@/data/navigation";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Частые вопросы (FAQ)",
  description:
    "Ответы на частые вопросы о юридическом адресе, регистрации компании и пакете «Бизнес под ключ».",
  path: routes.faq,
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Частые вопросы"
        subtitle="Собрали ответы на вопросы, которые предприниматели задают чаще всего. Если вашего вопроса нет — спросите специалиста."
        breadcrumbs={[{ name: "FAQ", path: routes.faq }]}
      />
      <section aria-label="Вопросы и ответы" className="py-20 lg:py-28">
        <Container size="narrow">
          <FAQAccordion items={faqItems} headingLevel="h2" />
        </Container>
      </section>
      <CTASection
        title="Остались вопросы?"
        subtitle="Специалист ответит на них и поможет выбрать подходящее решение."
      />
      <JsonLd data={faqSchema(faqItems)} />
    </>
  );
}
