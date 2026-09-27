import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LeadSection } from "@/components/sections/LeadSection";
import { PageHero } from "@/components/sections/PageHero";
import { siteConfig } from "@/config/site";
import { routes } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Контакты",
  description:
    "Свяжитесь с нами, чтобы получить консультацию по юридическому адресу, регистрации компании или сопровождению бизнеса.",
  path: routes.contacts,
});

export default function ContactsPage() {
  const { contacts } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами"
        subtitle="Оставьте заявку — специалист свяжется с вами, уточнит детали и предложит подходящее решение."
        breadcrumbs={[{ name: "Контакты", path: routes.contacts }]}
      />

      <LeadSection title="Получить консультацию" />

      <section aria-labelledby="office-title" className="py-24 lg:py-32">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-4">
            <h2 id="office-title" className="text-h2 text-ink">
              Офис
            </h2>
            <address className="mt-8 grid gap-2 not-italic text-muted">
              <span className="text-ink">{contacts.address}</span>
              <span>
                {contacts.city}, {contacts.country}
              </span>
              <span>{contacts.workingHours}</span>
            </address>
          </div>
          {/* Map placeholder — replace with an embedded map when the address is confirmed */}
          <div
            data-reveal
            role="img"
            aria-label="Место для карты с адресом офиса"
            className="relative grid min-h-72 place-items-center overflow-hidden border border-line bg-ivory lg:col-span-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <span className="relative flex flex-col items-center gap-3 text-muted">
              <span className="grid size-12 place-items-center rounded-full bg-navy-950">
                <MapPin aria-hidden="true" className="size-5 text-gold" strokeWidth={1.5} />
              </span>
              [Карта]
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}
