import { FeatureItem } from "@/components/FeatureItem";
import { OfferList } from "@/components/OfferList";
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
import { formatAmount, type Price } from "@/lib/price";
import { serviceSchema } from "@/lib/schema";
import { revealDelay } from "@/lib/utils";

export function PriceTag({ price }: { price: Price }) {
  if (price.amount === undefined) {
    return <p className="font-serif text-[2rem] leading-none text-ink">{price.label ?? "По запросу"}</p>;
  }
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {price.prefix && <span className="text-[0.95rem] text-muted">{price.prefix}</span>}
      <span className="font-serif text-[2.6rem] leading-none whitespace-nowrap text-ink">{formatAmount(price.amount)}</span>
      {price.suffix && <span className="text-[0.95rem] text-muted">{price.suffix}</span>}
    </p>
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
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
          <PriceTag price={service.price} />
          <Button href={`#${FORM_ANCHOR}`} size="lg" arrow>
            Обратный звонок
          </Button>
        </div>
        {service.priceNote && <p className="mt-5 max-w-xl text-[0.9rem] text-muted">{service.priceNote}</p>}
      </PageHero>

      {/* Услуги и цены */}
      <section aria-labelledby="offers-title" className="py-24 lg:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="offers-title"
                eyebrow="Стоимость"
                title={service.offers.length > 1 ? "Услуги и цены" : "Стоимость услуги"}
                description="Цена фиксируется до начала работы. Дополнительные расходы указаны заранее."
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <OfferList service={service} />
          </div>
        </Container>
      </section>

      {service.benefits && (
        <section aria-labelledby="benefits-title" className="surface-dark bg-navy-950 py-24 lg:py-32">
          <Container>
            <SectionHeading id="benefits-title" eyebrow="Преимущества" title={service.benefits.title} tone="dark" />
            <div
              className={`mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 ${
                service.benefits.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {service.benefits.items.map((item, index) => (
                <FeatureItem
                  key={item.title}
                  number={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  text={item.text}
                  index={index}
                  tone="dark"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {service.cases && (
        <section aria-labelledby="cases-title" className="surface-ivory py-24 lg:py-32">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading id="cases-title" eyebrow="Для кого" title={service.cases.title} />
            </div>
            <ul className="grid gap-px self-start border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {service.cases.items.map((item, index) => (
                <li
                  key={item}
                  data-reveal
                  style={revealDelay(index * 70)}
                  className="flex min-h-28 flex-col justify-between gap-6 bg-white p-7 last:odd:sm:col-span-2"
                >
                  <span aria-hidden="true" className="h-px w-8 bg-gold" />
                  <span className="font-serif text-[1.4rem] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <ProcessSection title="Как проходит работа" eyebrow="Этапы" steps={service.steps} showCta={false} />

      {faq.length > 0 && <FAQSection items={faq} title="Вопросы об услуге" className="surface-ivory" />}

      <LeadSection
        title={service.lead.title}
        description={service.lead.description}
        surface={faq.length > 0 ? "white" : "ivory"}
      />

      <JsonLd data={serviceSchema(service)} />
    </>
  );
}
