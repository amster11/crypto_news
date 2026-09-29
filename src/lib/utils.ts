import { siteConfig } from "@/config/site";

/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** True when a content value is real data rather than a "[placeholder]". */
export function isFilled(value: string | null | undefined): value is string {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && !/^\[.*\]$/.test(trimmed);
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export function telHref(phone: string) {
  return isFilled(phone) ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;
}

export function mailHref(email: string) {
  return isFilled(email) ? `mailto:${email}` : undefined;
}

export function telegramHref(username: string) {
  return isFilled(username) ? `https://t.me/${username.replace(/^@/, "")}` : undefined;
}

export function maxHref(link: string) {
  return isFilled(link) ? link : undefined;
}

/** Stagger delay (ms) for elements with `data-reveal`. */
export function revealDelay(ms: number) {
  return { "--reveal-delay": ms } as import("react").CSSProperties;
}
