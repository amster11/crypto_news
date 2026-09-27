import { revealDelay } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { hero } from "@/data/content";
import { primaryCta, secondaryCta } from "@/data/navigation";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[36%] bg-ivory lg:block" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7 lg:pr-10">
          <div data-reveal>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>
          <h1 id="hero-title" data-reveal style={revealDelay(80)} className="text-display text-balance text-ink">
            {hero.title}
          </h1>
          <p data-reveal style={revealDelay(160)} className="text-lead mt-8 max-w-xl text-muted">
            {hero.subtitle}
          </p>
          <div data-reveal style={revealDelay(240)} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={primaryCta.href} size="lg" arrow>
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} size="lg" variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-5">
          <div data-reveal="fade" className="relative">
            <div aria-hidden="true" className="absolute -top-5 -right-5 hidden size-full border border-gold/50 md:block" />
            <Photo
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, 100vw"
              frameClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </div>
          <div
            aria-hidden="true"
            className="float-soft absolute -bottom-6 left-4 bg-navy-950 px-7 py-6 shadow-[0_30px_60px_-30px_rgb(11_22_40/0.7)] sm:left-8 lg:-left-10 lg:bottom-14 lg:px-9 lg:py-8"
          >
            <span className="mb-4 block h-px w-10 bg-gold" />
            {hero.floatingCard.map((line) => (
              <span key={line} className="block font-serif text-[1.35rem] leading-tight tracking-[0.12em] text-white uppercase lg:text-[1.6rem]">
                {line}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
