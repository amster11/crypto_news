import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { primaryCta, routes } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden pt-40 pb-28 lg:pt-52 lg:pb-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-[-2rem] font-serif text-[16rem] leading-none text-ivory select-none lg:right-10 lg:text-[26rem]"
      >
        404
      </span>
      <Container className="relative">
        <Eyebrow>Ошибка 404</Eyebrow>
        <h1 id="nf-title" className="text-display max-w-3xl text-balance text-ink">
          Страница не найдена
        </h1>
        <p className="text-lead mt-8 max-w-xl text-muted">
          Возможно, страница была перемещена или адрес введён с ошибкой. Перейдите на главную или
          выберите нужную услугу.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button href={routes.home} size="lg" arrow>
            На главную
          </Button>
          <Button href={routes.services} size="lg" variant="secondary">
            Смотреть услуги
          </Button>
          <Button href={primaryCta.href} size="lg" variant="secondary">
            {primaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
