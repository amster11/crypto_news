import { OfferList } from "@/components/OfferList";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadSection } from "@/components/sections/LeadSection";
import { PageHero } from "@/components/sections/PageHero";
import { getFaqItems } from "@/data/faq";
import { routes } from "@/data/navigation";
import { pricingNotes } from "@/data/pricing";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Цены на услуги",
  description:
    "Прайс-лист: регистрация ООО и ИП от 5 000 ₽, юридический адрес от 23 000 ₽ за 11 месяцев, ликвидация ИП 10 000 ₽, ликвидация ООО от 45 000 ₽.",
  path: routes.pricing,
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Цены"
        title="Простые и прозрачные цены"
        subtitle="Вы заранее знаете стоимость услуги и понимаете, что в неё входит. Нажмите «Заказать» — и мы перезвоним."
        breadcrumbs={[{ name: "Цены", path: routes.pricing }]}
      >
        <ul className="grid gap-3 text-[0.95rem] text-muted">
          {pricingNotes.map((note) => (
            <li key={note} className="flex gap-4">
              <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold" />
              {note}
            </li>
          ))}
        </ul>
      </PageHero>

      {services.map((service, index) => (
        <section
          key={service.slug}
          aria-labelledby={`price-${service.slug}`}
          className={index % 2 === 1 ? "surface-ivory py-20 lg:py-28" : "py-20 lg:py-28"}
        >
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className="lg:col-span-4">
              <p className="font-serif text-[1.1rem] text-gold-deep">{service.number}</p>
              <h2 id={`price-${service.slug}`} className="text-h2 mt-3 text-ink">
                {service.menuTitle}
              </h2>
              <p className="mt-5 max-w-sm text-muted">{service.summary}</p>
              <p className="mt-8">
                <TextLink href={service.href}>Подробнее об услуге</TextLink>
              </p>
            </div>
            <div className="lg:col-span-8">
              <OfferList service={service} />
            </div>
          </Container>
        </section>
      ))}

      <FAQSection
        items={getFaqItems(["address-price", "notary-costs", "liquidation-price", "tax-price"])}
        title="Вопросы о стоимости"
        className="surface-ivory"
      />
      <LeadSection surface="white" />
    </>
  );
}
