import { revealDelay } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/faq";

/**
 * Native <details>/<summary> accordion: answers are in the HTML for search
 * engines, fully keyboard accessible and work without JavaScript.
 */
export function FAQAccordion({ items, headingLevel = "h3" }: { items: FaqItem[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="border-t border-line">
      {items.map((item, index) => (
        <details
          key={item.id}
          id={`faq-${item.id}`}
          data-reveal
          style={revealDelay(index * 60)}
          className="faq-item group border-b border-line"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left sm:py-7">
            <Heading className="font-serif text-[1.35rem] leading-snug text-ink transition-colors group-hover:text-gold-deep sm:text-[1.55rem]">
              {item.question}
            </Heading>
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,border-color,background-color] duration-500 group-open:rotate-45 group-open:border-gold group-open:bg-gold/10"
            >
              <Plus className="size-4 text-ink" strokeWidth={1.5} />
            </span>
          </summary>
          <div className="max-w-3xl pr-14 pb-8 text-muted">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
