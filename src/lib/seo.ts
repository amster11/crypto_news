import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./utils";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  /** Set false for pages that should not be indexed (e.g. 404). */
  index?: boolean;
  /** Use the title as-is, without the "| Brand" suffix. */
  absoluteTitle?: boolean;
};

/** Per-page metadata: unique title, description, canonical and Open Graph. */
export function buildMetadata({ title, description, path, index = true, absoluteTitle = false }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.logo.wordmark,
      title,
      description,
      url,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.logo.wordmark }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
    robots: index ? undefined : { index: false, follow: true },
  };
}
