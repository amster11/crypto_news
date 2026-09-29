import { ServiceCard } from "@/components/ServiceCard";
import { Button, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { primaryCta } from "@/data/navigation";
import { services } from "@/data/services";

export function ServicesSection({
  title = "Готовые решения для вашего бизнеса",
  description = "От регистрации компании и юридического адреса до налоговых проверок и ликвидации.",
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
        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
          <div data-reveal className="surface-dark flex flex-col justify-between gap-10 bg-navy-950 p-8 sm:p-10 lg:p-12">
            <div>
              <span aria-hidden="true" className="block h-px w-10 bg-gold" />
              <p className="text-h3 mt-8 text-white">Не нашли нужную услугу?</p>
              <p className="mt-4 text-muted">Расскажите о задаче — предложим решение.</p>
            </div>
            <Button href={primaryCta.href} variant="gold" arrow className="self-start">
              Обратный звонок
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
