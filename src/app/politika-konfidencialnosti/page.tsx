import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/data/legal";
import { routes } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.intro,
  path: routes.privacy,
});

export default function Page() {
  return <LegalDocument {...privacyPolicy} path={routes.privacy} />;
}
