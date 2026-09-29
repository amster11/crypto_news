import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn, isFilled, mailHref, maxHref, telegramHref, telHref } from "@/lib/utils";

const { contacts } = siteConfig;

/** Contact channels from the brief: звонок, Telegram, почта, MAX. */
export const contactChannels = [
  { key: "phone", label: "Телефон", value: contacts.phone, href: telHref(contacts.phone), icon: Phone },
  {
    key: "telegram",
    label: "Telegram",
    value: isFilled(contacts.telegram) ? `@${contacts.telegram.replace(/^@/, "")}` : contacts.telegram,
    href: telegramHref(contacts.telegram),
    icon: Send,
  },
  { key: "email", label: "Почта", value: contacts.email, href: mailHref(contacts.email), icon: Mail },
  { key: "max", label: "MAX", value: contacts.max, href: maxHref(contacts.max), icon: MessageCircle },
];

/** Round icon buttons: call, Telegram, email, MAX. */
export function ContactIcons({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex gap-3", className)}>
      {contactChannels.map(({ key, label, href, icon: Icon }) => {
        const classes = cn(
          "grid size-11 place-items-center rounded-full border transition-colors duration-300",
          tone === "dark"
            ? "border-white/20 text-gold hover:border-gold hover:bg-gold hover:text-navy-950"
            : "border-line text-gold-deep hover:border-navy-950 hover:bg-navy-950 hover:text-gold",
          !href && "pointer-events-none opacity-60",
        );
        const content = <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.5} />;
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                aria-label={label}
                className={classes}
                {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {content}
              </a>
            ) : (
              <span aria-label={`${label}: не указан`} role="img" className={classes}>
                {content}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
