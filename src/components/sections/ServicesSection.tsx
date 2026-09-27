import { ServiceCard } from "@/components/ServiceCard";
import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { primaryCta } from "@/data/navigation";
import { services } from "@/data/services";

export function ServicesSection({
  title = "Решения для вашего бизнеса",
  description = "От регистрации компании до полного административного сопровождения.",
  showCta = true,
}: {
  title?: string;
  description?: string;
  showCta?: boolean;
}) {
  return (
    <section aria-labelledby="services-title" className="py-24 lg:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="services-title" eyebrow="Услуги" title={title} description={description} />
          {showCta && (
            <div data-reveal className="shrink-0 lg:pb-2">
              <TextLink href={primaryCta.href}>Обсудить задачу</TextLink>
            </div>
          )}
        </div>
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
