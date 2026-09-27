import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Heading level. Pages have one H1 — sections use h2 by default. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone} centered={align === "center"}>{eyebrow}</Eyebrow>}
      <Heading
        id={id}
        className={cn(
          Heading === "h1" ? "text-display" : "text-h2",
          tone === "dark" ? "text-white" : "text-ink",
          "text-balance",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="text-lead mt-6 max-w-2xl text-muted text-pretty [.text-center_&]:mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  centered = false,
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  centered?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow mb-6 flex items-center gap-4",
        tone === "dark" ? "text-gold" : "text-gold-deep",
        centered && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-70" />
      {children}
    </p>
  );
}
