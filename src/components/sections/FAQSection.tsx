import { FAQAccordion } from "@/components/FAQAccordion";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FaqItem } from "@/data/faq";
import { routes } from "@/data/navigation";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

export function FAQSection({
  items,
  title = "Частые вопросы",
  description = "Не нашли ответ? Задайте вопрос специалисту — мы поможем разобраться.",
  showLink = true,
  className,
}: {
  items: FaqItem[];
  title?: string;
  description?: string;
  showLink?: boolean;
  className?: string;
}) {
  return (
    <section aria-labelledby="faq-title" className={cn("py-24 lg:py-36", className)}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={title} description={description} />
          {showLink && (
            <p data-reveal className="mt-10">
              <TextLink href={routes.faq}>Все вопросы и ответы</TextLink>
            </p>
          )}
        </div>
        <div className="lg:col-span-8">
          <FAQAccordion items={items} />
        </div>
      </Container>
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}
