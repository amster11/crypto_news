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
          description="Вы заранее знаете стоимость услуги и понимаете, что в неё входит."
          align="center"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
        {showLink && (
          <p data-reveal className="mt-14 text-center">
            <TextLink href={routes.pricing}>Полный прайс-лист</TextLink>
          </p>
        )}
      </Container>
    </section>
  );
}
