import type { MetadataRoute } from "next";
import { routes } from "@/data/navigation";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const priority: Record<string, number> = {
    [routes.home]: 1,
    [routes.turnkey]: 0.9,
    [routes.legalAddress]: 0.9,
    [routes.registration]: 0.9,
    [routes.services]: 0.8,
    [routes.pricing]: 0.8,
    [routes.privacy]: 0.2,
    [routes.terms]: 0.2,
  };
  const lastModified = new Date();
  return Object.values(routes).map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: priority[path] ?? 0.6,
  }));
}
