import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { footerNav, routes } from "@/data/navigation";
import { mailHref, telHref, whatsappHref } from "@/lib/utils";

export function Footer() {
  const { contacts } = siteConfig;
  const contactItems = [
    { label: "Телефон", value: contacts.phone, href: telHref(contacts.phone) },
    { label: "WhatsApp", value: contacts.whatsapp, href: whatsappHref(contacts.whatsapp) },
    { label: "Email", value: contacts.email, href: mailHref(contacts.email) },
    { label: "Адрес", value: contacts.address },
  ];

  return (
    <footer className="surface-dark bg-navy-900">
      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mist">
            {siteConfig.description}
          </p>
        </div>

        {[footerNav.services, footerNav.company].map((group) => (
          <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
            <h2 className="text-eyebrow text-gold">{group.title}</h2>
            <ul className="mt-6 grid gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.95rem] text-white/80 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="lg:col-span-4">
          <h2 className="text-eyebrow text-gold">Контакты</h2>
          <dl className="mt-6 grid gap-4">
            {contactItems.map((item) => (
              <div key={item.label} className="grid grid-cols-[6rem_1fr] gap-4 text-[0.95rem]">
                <dt className="text-mist">{item.label}</dt>
                <dd className="text-white/85">
                  {item.href ? (
                    <a href={item.href} className="link-underline hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[6rem_1fr] gap-4 text-[0.95rem]">
              <dt className="text-mist">Соцсети</dt>
              <dd className="flex flex-wrap gap-x-4 gap-y-1 text-white/85">
                {siteConfig.socials.length > 0
                  ? siteConfig.socials.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline hover:text-white"
                      >
                        {social.label}
                      </a>
                    ))
                  : "[Социальные сети]"}
              </dd>
            </div>
          </dl>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-7 text-[0.82rem] text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.logo.wordmark}
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href={routes.privacy} className="link-underline hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href={routes.terms} className="link-underline hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
