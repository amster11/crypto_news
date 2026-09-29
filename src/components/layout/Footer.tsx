import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { ContactIcons, contactChannels } from "@/components/ContactLinks";
import { companyNav, routes } from "@/data/navigation";
import { services } from "@/data/services";

export function Footer() {
  const servicesNav = {
    title: "Услуги",
    links: services.map((service) => ({ label: service.menuTitle, href: service.href })),
  };
  const contactItems = [
    ...contactChannels.map(({ label, value, href }) => ({ label, value, href })),
    { label: "Адрес", value: siteConfig.contacts.address, href: undefined as string | undefined },
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

        {[servicesNav, companyNav].map((group) => (
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
                    <a
                      href={item.href}
                      className="link-underline hover:text-white"
                      {...(item.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ContactIcons tone="dark" className="mt-8" />
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
