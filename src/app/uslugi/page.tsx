import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { primaryCta, routes } from "@/data/navigation";
import { services } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Услуги для бизнеса",
  description:
    "Юридический адрес, регистрация компании, бизнес под ключ и сопутствующие юридические и административные услуги для предпринимателей.",
  path: routes.services,
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Решения для открытия и развития бизнеса"
        subtitle="От регистрации компании до полного административного сопровождения. Выберите отдельную услугу или комплексное решение."
        breadcrumbs={[{ name: "Услуги", path: routes.services }]}
      >
        <Button href={primaryCta.href} size="lg" arrow>
          {primaryCta.label}
        </Button>
      </PageHero>

      <section aria-label="Список услуг" className="py-16 lg:py-24">
        <Container>
          <ul>
            {services.map((service) => (
              <li key={service.slug} data-reveal className="group relative border-b border-line">
                <div className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                  <span className="font-serif text-[2.5rem] leading-none text-gold-deep lg:col-span-1 lg:text-[3rem]">
                    {service.number}
                  </span>
                  <div className="lg:col-span-5">
                    <h2 className="text-h2 text-ink transition-colors group-hover:text-navy-700">
                      <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                        {service.title}
                      </Link>
                    </h2>
                    <p className="mt-4 max-w-md text-muted">{service.summary}</p>
                  </div>
                  <ul className="grid gap-3 text-[0.95rem] text-ink/85 lg:col-span-4">
                    {service.includes.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-gold" />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between gap-6 lg:col-span-2 lg:flex-col lg:items-end">
                    <p className="text-right">
                      <span className="block text-[0.8rem] text-muted">{service.price.prefix}</span>
                      <span className="font-serif text-[2rem] leading-none text-ink">{service.price.value}</span>
                    </p>
                    <span
                      aria-hidden="true"
                      className="grid size-12 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-gold group-hover:bg-navy-950"
                    >
                      <ArrowUpRight className="size-5 text-ink transition-colors group-hover:text-gold" strokeWidth={1.25} />
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ProcessSection className="surface-ivory" />
      <CTASection />
    </>
  );
}
