import { revealDelay } from "@/lib/utils";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ testimonial, index = 0 }: { testimonial: Testimonial; index?: number }) {
  const initials = testimonial.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
  return (
    <figure
      data-reveal
      style={revealDelay(index * 100)}
      className="flex h-full flex-col border border-line bg-white p-8 sm:p-10"
    >
      <span aria-hidden="true" className="font-serif text-[4rem] leading-[0.6] text-gold">
        “
      </span>
      <blockquote className="mt-6 flex-1 font-serif text-[1.45rem] leading-snug text-ink">
        <p>{testimonial.quote}</p>
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4 border-t border-line pt-6">
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-full bg-ivory font-serif text-[1rem] text-gold-deep"
        >
          {initials}
        </span>
        <span>
          <span className="block text-[0.95rem] font-semibold text-ink">{testimonial.name}</span>
          <span className="block text-[0.85rem] text-muted">{testimonial.company}</span>
        </span>
      </figcaption>
    </figure>
  );
}
