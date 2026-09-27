import { cn, revealDelay } from "@/lib/utils";

type FeatureItemProps = {
  number?: string;
  title: string;
  text?: string;
  index?: number;
  tone?: "light" | "dark";
  size?: "md" | "lg";
  className?: string;
};

/** Numbered feature with a hairline — used for advantages and inclusions. */
export function FeatureItem({
  number,
  title,
  text,
  index = 0,
  tone = "light",
  size = "md",
  className,
}: FeatureItemProps) {
  return (
    <div
      data-reveal
      style={revealDelay(index * 90)}
      className={cn("border-t pt-8", tone === "dark" ? "border-white/15" : "border-line", className)}
    >
      {number && (
        <span
          aria-hidden="true"
          className={cn(
            "block font-serif leading-none",
            size === "lg" ? "text-[4.5rem] lg:text-[5.5rem]" : "text-[2.5rem]",
            tone === "dark" ? "text-gold" : "text-gold-deep",
          )}
        >
          {number}
        </span>
      )}
      <h3
        className={cn(
          "font-serif text-[1.6rem] leading-tight",
          number && "mt-6",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h3>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
}
