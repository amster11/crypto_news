import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { FORM_ANCHOR } from "@/data/navigation";
import { ContactIcons, contactChannels } from "@/components/ContactLinks";
import { cn } from "@/lib/utils";

/** Form block with contact details. Anchored as #zayavka on every page. */
export function LeadSection({
  title = "Обратный звонок",
  description = "Оставьте контакты — специалист перезвонит, уточнит детали и предложит решение.",
  defaultService,
  headingLevel = "h2",
  surface = "ivory",
  className,
}: {
  title?: string;
  description?: string;
  defaultService?: string;
  headingLevel?: "h1" | "h2";
  surface?: "ivory" | "white";
  className?: string;
}) {
  const rows = [
    ...contactChannels.map(({ label, value, href }) => ({ label, value, href })),
    { label: "Часы работы", value: siteConfig.contacts.workingHours, href: undefined as string | undefined },
  ];
  return (
    <section id={FORM_ANCHOR} aria-labelledby="lead-title" className={cn(surface === "ivory" ? "surface-ivory" : "bg-white", "scroll-mt-20 py-24 lg:py-36", className)}>
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="lead-title" as={headingLevel} eyebrow="Заявка" title={title} description={description} />
          <dl data-reveal className="mt-12 grid gap-5 border-t border-line pt-10">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4">
                <dt className="text-[0.85rem] text-muted">{row.label}</dt>
                <dd className="text-ink">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="link-underline"
                      {...(row.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-8">
            <ContactIcons />
          </div>
        </div>
        <div data-reveal className="lg:col-span-7">
          <ContactForm defaultService={defaultService} />
        </div>
      </Container>
    </section>
  );
}
