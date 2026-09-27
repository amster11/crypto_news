import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";

const service = getService("additional");

export const metadata = buildMetadata({
  title: service.seo.title,
  description: service.seo.description,
  path: service.href,
});

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
