import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "outline-light";
type Size = "md" | "lg";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] font-sans text-[0.92rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-950 text-white hover:bg-navy-800 shadow-[inset_0_-2px_0_0_var(--color-gold)] hover:shadow-[inset_0_-3px_0_0_var(--color-gold)]",
  secondary:
    "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
  gold: "bg-gold text-navy-950 hover:bg-[#c9ad78]",
  "outline-light":
    "border border-white/30 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy-950",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  lg: "px-8 py-4 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", arrow = false, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </>
  );

  if (props.href !== undefined) {
    const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
    void [_v, _s, _a, _c, _ch];
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
  void [_v, _s, _a, _c, _ch];
  return (
    <button type="button" {...rest} className={classes}>
      {content}
    </button>
  );
}

/** Text link with animated underline and arrow. */
export function TextLink({
  href,
  children,
  className,
  ...rest
}: { href: string; children: ReactNode; className?: string } & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "children" | "className"
>) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-ink",
        className,
      )}
      {...rest}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 text-gold-deep transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}
