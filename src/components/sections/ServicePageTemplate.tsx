import { Check } from "lucide-react";
import { FeatureItem } from "@/components/FeatureItem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "./FAQSection";
import { LeadSection } from "./LeadSection";
import { PageHero } from "./PageHero";
import { ProcessSection } from "./ProcessSection";
import { getFaqItems } from "@/data/faq";
import { FORM_ANCHOR, routes } from "@/data/navigation";
import type { Service } from "@/data/services";
import { serviceSchema } from "@/lib/schema";
import { revealDelay } from "@/lib/utils";

export function PriceTag({ price }: { price: Service["price"] }) {
  return (
    <p className="flex items-baseline gap-2">
      {price.prefix && <span className="text-[0.95rem] text-muted">{price.prefix}</span>}
      <span className="font-serif text-[2.6rem] leading-none text-ink">{price.value}</span>
      {price.period && <span className="text-[0.95rem] text-muted">/ {price.period}</span>}
    </p>
  );
}

export function ServiceHeroActions({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
      <PriceTag price={service.price} />
      <Button href={`#${FORM_ANCHOR}`} size="lg" arrow>
        Получить консультацию
      </Button>
    </div>
  );
}

export function AudienceSection({ items }: { items: string[] }) {
  return (
      <section aria-labelledby="audience-title" className="surface-ivory py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="audience-title" eyebrow="Для кого" title="Кому подходит услуга" />
          </div>
          <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {items.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={revealDelay(index * 80)}
                className="flex min-h-32 flex-col justify-between gap-6 bg-white p-7"
              >
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                <span className="font-serif text-[1.35rem] leading-snug text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

  );
}

export function OutcomesSection({ items }: { items: string[] }) {
  return (
      <section aria-labelledby="outcomes-title" className="surface-dark bg-navy-950 py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="outcomes-title" eyebrow="Результат" title="Что вы получаете" tone="dark" />
            <div data-reveal className="mt-10">
              <Button href={`#${FORM_ANCHOR}`} variant="gold" size="lg" arrow>
                Получить консультацию
              </Button>
            </div>
          </div>
          <ul className="grid gap-0 lg:col-span-7">
            {items.map((item, index) => (
              <li
                key={item}
                data-reveal
                style={revealDelay(index * 80)}
                className="flex items-center gap-5 border-b border-white/15 py-6 first:border-t"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/60">
                  <Check aria-hidden="true" className="size-4 text-gold" strokeWidth={1.5} />
                </span>
                <span className="font-serif text-[1.45rem] leading-snug text-white">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

  );
}

/** Shared SEO landing layout for a single service. */
export function ServicePageTemplate({ service }: { service: Service }) {
  const faq = getFaqItems(service.faqIds);

  return (
    <>
      <PageHero
        eyebrow={`Услуга ${service.number}`}
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

      {/* Что входит */}
      <section aria-labelledby="includes-title" className="py-24 lg:py-36">
        <Container>
          <SectionHeading id="includes-title" eyebrow="Состав услуги" title="Что входит" />
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {service.includes.map((item, index) => (
              <FeatureItem
                key={item.title}
                number={String(index + 1).padStart(2, "0")}
                title={item.title}
                text={item.text}
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>

      <AudienceSection items={service.audience} />

      <ProcessSection title="Как проходит оформление" eyebrow="Этапы" steps={service.steps} showCta={false} />

      <OutcomesSection items={service.outcomes} />

      {faq.length > 0 && <FAQSection items={faq} title="Вопросы об услуге" />}

      <LeadSection
        title="Обсудим вашу задачу"
        description={`Оставьте заявку на услугу «${service.title}» — специалист свяжется с вами и ответит на вопросы.`}
        defaultService={service.formLabel}
      />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
