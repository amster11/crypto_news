import { PricingCard } from "@/components/PricingCard";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/data/navigation";
import { pricingPlans } from "@/data/pricing";

export function PricingSection({
  headingLevel = "h2",
  showLink = true,
}: {
  headingLevel?: "h1" | "h2";
  showLink?: boolean;
}) {
  return (
    <section aria-labelledby="pricing-title" className="surface-ivory py-24 lg:py-36">
      <Container>
        <SectionHeading
          id="pricing-title"
          as={headingLevel}
          eyebrow="Цены"
          title="Простые и прозрачные цены"
          description="Вы заранее знаете стоимость услуги и понимаете, что входит в выбранный пакет."
          align="center"
        />
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:mt-20 lg:grid-cols-3 lg:items-stretch lg:gap-0">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
        {showLink && (
          <p data-reveal className="mt-14 text-center">
            <TextLink href={routes.pricing}>Все цены и дополнительные услуги</TextLink>
          </p>
        )}
      </Container>
    </section>
  );
}
