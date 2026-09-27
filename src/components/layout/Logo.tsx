import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const { monogram, wordmark, tagline } = siteConfig.logo;
  return (
    <Link
      href="/"
      aria-label={`${wordmark} — на главную`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-10 place-items-center border font-serif text-[1.05rem] font-semibold tracking-[0.06em] transition-colors duration-500",
          tone === "dark"
            ? "border-navy-950 text-navy-950 group-hover:border-gold-deep"
            : "border-gold/70 text-gold group-hover:border-gold",
        )}
      >
        {monogram}
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[1.35rem] font-semibold tracking-[0.01em]",
            tone === "dark" ? "text-navy-950" : "text-white",
          )}
        >
          {wordmark}
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.28em]",
            tone === "dark" ? "text-muted" : "text-mist",
          )}
        >
          {tagline}
        </span>
      </span>
    </Link>
  );
}
