import { FeatureItem } from "@/components/FeatureItem";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyUs } from "@/data/content";

export function WhyUsSection() {
  return (
    <section aria-labelledby="why-title" className="surface-dark relative overflow-hidden bg-navy-950 py-24 lg:py-36">
      <div aria-hidden="true" className="absolute top-0 left-1/2 hidden h-24 w-px bg-gradient-to-b from-gold/60 to-transparent lg:block" />
      <Container>
        <SectionHeading id="why-title" eyebrow="Преимущества" title={whyUs.title} tone="dark" />
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {whyUs.items.map((item, index) => (
            <FeatureItem
              key={item.title}
              number={String(index + 1).padStart(2, "0")}
              title={item.title}
              text={item.text}
              index={index}
              tone="dark"
              size="lg"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
