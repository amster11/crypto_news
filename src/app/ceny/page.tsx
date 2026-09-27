import { CTASection } from "@/components/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHero } from "@/components/sections/PageHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { getFaqItems } from "@/data/faq";
import { routes } from "@/data/navigation";
import { additionalPrices, pricingNotes } from "@/data/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Цены на услуги",
  description:
    "Прозрачные цены на юридический адрес, регистрацию компании и бизнес под ключ. Состав пакетов и стоимость дополнительных услуг.",
  path: routes.pricing,
});

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Цены"
        title="Стоимость услуг"
        subtitle="Выберите готовый пакет или отдельную услугу. Состав и стоимость фиксируем до начала работы."
        breadcrumbs={[{ name: "Цены", path: routes.pricing }]}
      />

      <PricingSection showLink={false} />

      <section aria-labelledby="extra-prices-title" className="py-24 lg:py-36">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              id="extra-prices-title"
              eyebrow="Отдельные услуги"
              title="Дополнительные услуги"
              description="Можно заказать отдельно или добавить к любому пакету."
            />
          </div>
          <div className="lg:col-span-8">
            <table data-reveal className="w-full border-collapse text-left">
              <caption className="sr-only">Стоимость дополнительных услуг</caption>
              <thead>
                <tr className="border-b border-ink/80">
                  <th scope="col" className="text-eyebrow py-4 font-semibold text-muted">
                    Услуга
                  </th>
                  <th scope="col" className="text-eyebrow py-4 text-right font-semibold text-muted">
                    Стоимость
                  </th>
                </tr>
              </thead>
              <tbody>
                {additionalPrices.map((row) => (
                  <tr key={row.name} className="border-b border-line">
                    <th scope="row" className="py-5 pr-6 font-serif text-[1.3rem] font-normal text-ink sm:text-[1.45rem]">
                      {row.name}
                    </th>
                    <td className="py-5 text-right whitespace-nowrap text-ink">от {row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul data-reveal className="mt-10 grid gap-3 text-[0.95rem] text-muted">
              {pricingNotes.map((note) => (
                <li key={note} className="flex gap-4">
                  <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <FAQSection
        items={getFaqItems(["consultation", "address-only", "turnkey-includes"])}
        title="Вопросы о стоимости"
        className="surface-ivory"
      />
      <CTASection />
    </>
  );
}
