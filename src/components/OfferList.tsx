import { OrderButton } from "@/components/OrderButton";
import type { Service } from "@/data/services";
import { offerLabel } from "@/data/services";
import { formatPrice } from "@/lib/price";
import { cn, revealDelay } from "@/lib/utils";

/** Price list of a service: each offer with its price and a "Заказать" button. */
export function OfferList({ service, headingLevel = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-line">
      {service.offers.map((offer, index) => (
        <li
          key={offer.id}
          data-reveal
          style={revealDelay(index * 70)}
          className="grid gap-6 border-b border-line py-8 md:grid-cols-[1fr_auto] md:items-center md:gap-10 lg:py-10"
        >
          <div>
            <Heading className="font-serif text-[1.55rem] leading-snug text-ink sm:text-[1.75rem]">{offer.title}</Heading>
            <p className="mt-2 max-w-2xl text-muted">{offer.description}</p>
            {offer.note && (
              <p className="mt-3 flex max-w-2xl gap-3 text-[0.88rem] text-muted">
                <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-gold" />
                {offer.note}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-5 md:flex-col md:items-end md:justify-center">
            <p
              className={cn(
                "font-serif leading-none whitespace-nowrap text-ink",
                offer.price.amount === undefined ? "text-[1.6rem]" : "text-[2.1rem]",
              )}
            >
              {formatPrice(offer.price)}
            </p>
            <OrderButton service={offerLabel(service, offer)} className="min-w-40" />
          </div>
        </li>
      ))}
    </ul>
  );
}
