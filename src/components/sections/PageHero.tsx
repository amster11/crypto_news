import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { SiteImage } from "@/data/images";
import { revealDelay } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: { name: string; path: string }[];
  image?: SiteImage;
  /** Extra content under the subtitle: price, CTA buttons… */
  children?: ReactNode;
};

/** Hero for inner pages — the only H1 on the page. */
export function PageHero({ eyebrow, title, subtitle, breadcrumbs, image, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line pt-28 pb-16 lg:pt-40 lg:pb-24">
      {image && <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[30%] bg-ivory lg:block" />}
      <Container className={image ? "relative grid items-center gap-12 lg:grid-cols-12 lg:gap-10" : "relative"}>
        <div className={image ? "lg:col-span-7" : "max-w-4xl"}>
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && (
            <div data-reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <h1 id="page-title" data-reveal style={revealDelay(80)} className="text-display text-balance text-ink">
            {title}
          </h1>
          {subtitle && (
            <p data-reveal style={revealDelay(160)} className="text-lead mt-8 max-w-2xl text-muted">
              {subtitle}
            </p>
          )}
          {children && (
            <div data-reveal style={revealDelay(240)} className="mt-10">
              {children}
            </div>
          )}
        </div>
        {image && (
          <div data-reveal="fade" className="relative lg:col-span-5">
            <div aria-hidden="true" className="absolute -top-4 -right-4 hidden size-full border border-gold/50 md:block" />
            <Photo
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, 100vw"
              frameClassName="aspect-[16/10] lg:aspect-[4/5]"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
