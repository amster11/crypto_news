import { revealDelay } from "@/lib/utils";
/**
 * One step of the process timeline: horizontal on desktop, vertical on mobile.
 * Render inside <ol className="process-timeline"> (see ProcessSection).
 */
export function ProcessStep({
  number,
  title,
  text,
  index = 0,
  tone = "light",
}: {
  number: string;
  title: string;
  text: string;
  index?: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <li
      data-reveal
      style={revealDelay(index * 120)}
      className="relative pb-12 pl-14 last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8"
    >
      {/* Connector line */}
      <span
        aria-hidden="true"
        className={`absolute top-3 bottom-0 left-[11px] w-px lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-6 lg:h-px lg:w-auto ${
          dark ? "bg-white/15" : "bg-line"
        } [li:last-child>&]:hidden`}
      />
      {/* Node */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 grid size-6 place-items-center rounded-full border ${
          dark ? "border-gold bg-navy-950" : "border-gold bg-white"
        }`}
      >
        <span className="size-1.5 rounded-full bg-gold" />
      </span>
      <p className={`font-serif text-[1.1rem] lg:mt-10 ${dark ? "text-gold" : "text-gold-deep"}`}>
        {number}
      </p>
      <h3 className={`mt-2 font-serif text-[1.6rem] leading-tight ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h3>
      <p className="mt-3 max-w-xs text-muted">{text}</p>
    </li>
  );
}
