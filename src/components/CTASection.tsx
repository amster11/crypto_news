import { useId } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/data/content";
import { primaryCta, routes } from "@/data/navigation";

type CTASectionProps = {
  title?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Large Deep Navy call-to-action block with a thin gold ornament. */
export function CTASection({
  title = finalCta.title,
  subtitle = finalCta.subtitle,
  primary = primaryCta,
  secondary = { label: "Связаться с нами", href: routes.contacts },
}: CTASectionProps) {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId} className="surface-dark relative overflow-hidden bg-navy-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="float-soft absolute -top-40 -right-40 size-[34rem] rounded-full border border-gold/25" />
        <div className="absolute -top-24 -right-24 size-[26rem] rounded-full border border-gold/10" />
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-gold/60 to-transparent" />
      </div>
      <Container className="relative py-24 text-center lg:py-36">
        <div data-reveal className="mx-auto max-w-3xl">
          <span aria-hidden="true" className="mx-auto mb-10 block h-12 w-px bg-gold" />
          <h2 id={titleId} className="text-h2 text-balance text-white">
            {title}
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-xl text-mist">{subtitle}</p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href={primary.href} variant="gold" size="lg" arrow>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="outline-light" size="lg">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
