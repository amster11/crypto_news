import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";
import { siteConfig } from "@/config/site";

type LegalSection = { title: string; body: string[] };

/**
 * Layout for legal documents. The texts are structural templates only and
 * must be written / approved by a lawyer before publishing.
 */
export function LegalDocument({
  title,
  path,
  intro,
  sections,
}: {
  title: string;
  path: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} subtitle={intro} breadcrumbs={[{ name: title, path }]} />
      <section aria-label={title} className="py-20 lg:py-28">
        <Container size="narrow">
          <p className="mb-12 border-l-2 border-gold bg-ivory px-6 py-4 text-[0.9rem] text-ink">
            Редакция от {siteConfig.legal.policyUpdatedAt}. Шаблон документа: окончательный текст
            должен быть подготовлен или проверен юристом.
          </p>
          <ol className="grid gap-12">
            {sections.map((section, index) => (
              <li key={section.title}>
                <h2 className="text-h3 text-ink">
                  <span className="mr-3 text-gold-deep">{index + 1}.</span>
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-4 text-muted">
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
