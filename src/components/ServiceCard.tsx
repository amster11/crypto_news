import { revealDelay } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { formatPrice } from "@/lib/price";

/** Editorial service tile — used inside a bordered grid. */
export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <article
      data-reveal
      style={revealDelay(index * 90)}
      className="group relative flex h-full flex-col bg-white p-8 transition-colors duration-500 hover:bg-ivory sm:p-10 lg:p-12"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between gap-6">
        <span className="font-serif text-[1.1rem] text-gold-deep">{service.number}</span>
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.25}
          className="size-6 text-ink/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
        />
      </div>
      <h3 className="text-h3 mt-10 text-ink lg:mt-16">{service.title}</h3>
      <p className="mt-4 max-w-md text-muted">{service.summary}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-10">
        <p>
        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ink after:absolute after:inset-0 after:content-['']"
          aria-label={`Подробнее: ${service.title}`}
        >
          <span className="link-underline pb-0.5 group-hover:[background-size:100%_1px]">
            Подробнее
          </span>
        </Link>
        </p>
        <p className="text-right text-[0.9rem] text-muted">{formatPrice(service.price)}</p>
      </div>
    </article>
  );
}
