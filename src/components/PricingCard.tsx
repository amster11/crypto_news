import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { PricingPlan } from "@/data/pricing";
import { formatAmount } from "@/lib/price";
import { cn, revealDelay } from "@/lib/utils";

export function PricingCard({ plan, index = 0 }: { plan: PricingPlan; index?: number }) {
  const featured = plan.featured;
  return (
    <article
      data-reveal
      style={revealDelay(index * 110)}
      className={cn(
        "relative flex h-full flex-col border p-8 transition-[transform,box-shadow] duration-500 ease-[var(--ease-premium)] sm:p-9",
        featured
          ? "surface-dark border-navy-950 bg-navy-950 shadow-[0_40px_80px_-40px_rgb(11_22_40/0.6)]"
          : "border-line bg-white hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgb(11_22_40/0.35)]",
      )}
    >
      {featured && (
        <>
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gold" />
          {plan.badge && (
            <p className="text-eyebrow mb-4 text-gold">{plan.badge}</p>
          )}
        </>
      )}
      <h3 className={cn("text-eyebrow", featured ? "text-gold" : "text-gold-deep")}>{plan.name}</h3>
      <p className={cn("mt-5 font-serif text-[1.6rem] leading-tight", featured ? "text-white" : "text-ink")}>
        {plan.subtitle}
      </p>

      <div className="mt-8 border-b border-line pb-8">
        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {plan.price.amount !== undefined ? (
            <>
              {plan.price.prefix && <span className="text-[0.9rem] text-muted">{plan.price.prefix}</span>}
              <span className={cn("font-serif text-[2.6rem] leading-none whitespace-nowrap", featured ? "text-white" : "text-ink")}>
                {formatAmount(plan.price.amount)}
              </span>
              {plan.price.suffix && <span className="text-[0.9rem] text-muted">{plan.price.suffix}</span>}
            </>
          ) : (
            <span className={cn("font-serif text-[2.1rem] leading-none", featured ? "text-white" : "text-ink")}>
              {plan.price.label ?? "По запросу"}
            </span>
          )}
        </p>
        {plan.priceNote && <p className="mt-3 text-[0.82rem] leading-relaxed text-muted">{plan.priceNote}</p>}
      </div>

      <ul className="mt-8 mb-10 grid gap-4">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[0.95rem]">
            <Check
              aria-hidden="true"
              strokeWidth={1.5}
              className={cn("mt-0.5 size-4 shrink-0", featured ? "text-gold" : "text-gold-deep")}
            />
            <span className={featured ? "text-white/85" : "text-ink/85"}>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={plan.cta.href}
        variant={featured ? "gold" : "secondary"}
        className="mt-auto w-full"
        arrow
        aria-label={`${plan.cta.label}: ${plan.subtitle}`}
      >
        {plan.cta.label}
      </Button>
    </article>
  );
}
