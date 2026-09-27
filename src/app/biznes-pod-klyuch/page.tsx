import { PricingCard } from "@/components/PricingCard";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadSection } from "@/components/sections/LeadSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import {
  AudienceSection,
  OutcomesSection,
  ServiceHeroActions,
} from "@/components/sections/ServicePageTemplate";
import { getFaqItems } from "@/data/faq";
import { routes } from "@/data/navigation";
import { pricingNotes, pricingPlans } from "@/data/pricing";
import { getService } from "@/data/services";
import { serviceSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { revealDelay } from "@/lib/utils";

const service = getService("turnkey");
const plan = pricingPlans.find((p) => p.id === "full")!;

export const metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.href,
});

export default function TurnkeyPage() {
  return (
    <>
      <PageHero
        eyebrow="Бизнес под ключ"
        title={service.hero.title}
        subtitle={service.hero.subtitle}
        image={service.hero.image}
        breadcrumbs={[
          { name: "Услуги", path: routes.services },
          { name: service.title, path: service.href },
        ]}
      >
        <ServiceHeroActions service={service} />
      </PageHero>

      {/* Что входит — 01…05 */}
      <section aria-labelledby="includes-title" className="py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="includes-title"
                eyebrow="Состав пакета"
                title="Что входит"
                description="Один пакет закрывает всё, что нужно для запуска компании, — и один специалист отвечает за результат."
              />
            </div>
          </div>
          <ol className="border-t border-line lg:col-span-8">
            {service.includes.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                style={revealDelay(index * 70)}
                className="group grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-8 sm:grid-cols-[6rem_1fr] sm:py-10"
              >
                <span className="font-serif text-[2.25rem] leading-none text-gold-deep transition-colors group-hover:text-gold sm:text-[3rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ProcessSection
        title="Как это работает"
        eyebrow="Этапы"
        steps={service.steps}
        showCta={false}
        className="surface-ivory"
      />

      <OutcomesSection items={service.outcomes} />

      <AudienceSection items={service.audience} />

      {/* Стоимость */}
      <section aria-labelledby="price-title" className="py-24 lg:py-36">
        <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="price-title"
              eyebrow="Стоимость"
              title="Прозрачная стоимость пакета"
              description="Состав работ и цену согласовываем до начала — без скрытых платежей."
            />
            <ul data-reveal className="mt-10 grid gap-4 border-t border-line pt-8">
              {pricingNotes.map((note) => (
                <li key={note} className="flex gap-4 text-muted">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  {note}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-10">
              <TextLink href={routes.pricing}>Сравнить все пакеты</TextLink>
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <PricingCard plan={{ ...plan, featured: true, badge: undefined }} />
          </div>
        </Container>
      </section>

      <FAQSection items={getFaqItems(service.faqIds)} title="Вопросы о пакете" className="surface-ivory" />

      <LeadSection
        title="Обсудим запуск вашего бизнеса"
        description="Расскажите о планах — мы предложим состав пакета, сроки и стоимость."
        defaultService={service.formLabel}
        surface="white"
      />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
