import { TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { about } from "@/data/content";
import { routes } from "@/data/navigation";
import { revealDelay } from "@/lib/utils";

export function AboutSection({ showLink = true }: { showLink?: boolean }) {
  return (
    <section aria-labelledby="about-title" className="surface-ivory py-24 lg:py-36">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div data-reveal="fade" className="relative lg:col-span-5">
          <Photo
            src={about.image.src}
            alt={about.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            frameClassName="aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5]"
          />
          <div aria-hidden="true" className="absolute -bottom-5 -left-5 hidden h-2/3 w-px bg-gold md:block" />
        </div>

        <div className="lg:col-span-7">
          <div data-reveal>
            <Eyebrow>О компании</Eyebrow>
            <h2 id="about-title" className="text-h2 text-balance text-ink">
              {about.title}
            </h2>
          </div>
          <div data-reveal style={revealDelay(100)} className="mt-8 grid max-w-2xl gap-5 text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {about.stats.map((stat, index) => (
              <div key={stat.label} data-reveal style={revealDelay(index * 90)}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-serif text-[2.75rem] leading-none text-ink">{stat.value}</span>
                  <span aria-hidden="true" className="mt-3 block text-[0.9rem] text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {showLink && (
            <p data-reveal className="mt-12">
              <TextLink href={routes.about}>Подробнее о компании</TextLink>
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
