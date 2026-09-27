import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsOfUse } from "@/data/legal";
import { routes } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: termsOfUse.title,
  description: termsOfUse.intro,
  path: routes.terms,
});

export default function Page() {
  return <LegalDocument {...termsOfUse} path={routes.terms} />;
}
