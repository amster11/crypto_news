"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, primaryCta } from "@/data/navigation";
import { services } from "@/data/services";
import { siteConfig } from "@/config/site";
import { cn, telHref } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);
  const phone = telHref(siteConfig.contacts.phone);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled || open
          ? "border-b border-line bg-white/92 shadow-[0_10px_30px_-20px_rgb(11_22_40/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-6 transition-[height] duration-500",
          scrolled || open ? "h-[4.5rem]" : "h-20 lg:h-24",
        )}
      >
        <Logo />

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const hasMenu = item.href === "/uslugi";
              const active = isActive(item.href) || (hasMenu && services.some((s) => isActive(s.href)));
              return (
                <li key={item.href} className={hasMenu ? "group relative" : undefined}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-underline inline-flex items-center gap-1 pb-1 text-[0.9rem] font-medium transition-colors",
                      active ? "text-ink [background-size:100%_1px]" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {item.label}
                    {hasMenu && (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 group-focus-within:rotate-180 group-hover:rotate-180"
                        strokeWidth={1.5}
                      />
                    )}
                  </Link>
                  {hasMenu && (
                    <div className="invisible absolute top-full left-1/2 z-10 w-80 -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      <ul className="border border-line bg-white p-2 shadow-[0_30px_60px_-30px_rgb(11_22_40/0.4)]">
                        {services.map((service) => (
                          <li key={service.slug}>
                            <Link
                              href={service.href}
                              aria-current={isActive(service.href) ? "page" : undefined}
                              className="flex items-baseline gap-4 px-4 py-3 text-[0.92rem] text-ink transition-colors hover:bg-ivory focus-visible:bg-ivory"
                            >
                              <span className="font-serif text-gold-deep">{service.number}</span>
                              {service.menuTitle}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-12 place-items-center text-ink lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-6" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu className="size-6" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <Container as="nav" aria-label="Мобильная навигация" className="flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line border-y border-line">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-serif text-[1.6rem] text-ink"
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />
                  )}
                </Link>
                {item.href === "/uslugi" && (
                  <ul className="-mt-1 mb-4 grid gap-2 pl-1">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={service.href}
                          onClick={close}
                          className="text-[0.95rem] text-muted hover:text-ink"
                        >
                          <span className="mr-2 text-gold-deep">{service.number}</span>
                          {service.menuTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <Button href={primaryCta.href} size="lg" arrow onClick={close}>
              {primaryCta.label}
            </Button>
            {phone && (
              <Button href={phone} variant="secondary" size="lg">
                {siteConfig.contacts.phone}
              </Button>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}
