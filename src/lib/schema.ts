import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/data/faq";
import type { Service } from "@/data/services";
import { absoluteUrl, isFilled } from "./utils";

/**
 * Schema.org builders. Placeholder values ("[...]") are never emitted:
 * a schema is skipped or trimmed until the real data is set in config.
 */

type Json = Record<string, unknown>;

const { contacts } = siteConfig;

function postalAddress(): Json | undefined {
  if (!isFilled(contacts.address)) return undefined;
  return {
    "@type": "PostalAddress",
    streetAddress: contacts.address,
    ...(isFilled(contacts.city) && { addressLocality: contacts.city }),
    ...(isFilled(contacts.country) && { addressCountry: contacts.country }),
  };
}

function contactFields(): Json {
  return {
    ...(isFilled(contacts.phone) && { telephone: contacts.phone }),
    ...(isFilled(contacts.email) && { email: contacts.email }),
    ...(siteConfig.socials.length > 0 && { sameAs: siteConfig.socials.map((s) => s.href) }),
  };
}

export function organizationSchema(): Json | null {
  if (!isFilled(siteConfig.name)) return null;
  const address = postalAddress();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    ...contactFields(),
    ...(address && { address }),
  };
}

/** LocalBusiness requires a real address — emitted only when it is set. */
export function localBusinessSchema(): Json | null {
  const address = postalAddress();
  if (!isFilled(siteConfig.name) || !address) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    address,
    ...contactFields(),
    ...(isFilled(contacts.workingHours) && { openingHours: contacts.workingHours }),
  };
}

export function serviceSchema(service: Service): Json {
  const priceValue = service.price.value.replace(/[^\d.]/g, "");
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.seo.description,
    url: absoluteUrl(service.href),
    ...(isFilled(siteConfig.name) && {
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    }),
    ...(isFilled(contacts.country) && { areaServed: contacts.country }),
    ...(priceValue && {
      offers: {
        "@type": "Offer",
        priceCurrency: siteConfig.currency,
        price: priceValue,
        url: absoluteUrl(service.href),
      },
    }),
  };
}

export function faqSchema(items: FaqItem[]): Json | null {
  const answered = items.filter((item) => isFilled(item.answer));
  if (answered.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
