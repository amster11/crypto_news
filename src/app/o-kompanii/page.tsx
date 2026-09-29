import { CTASection } from "@/components/CTASection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { siteConfig } from "@/config/site";
import { images } from "@/data/images";
import { routes } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "О компании",
  description: `${siteConfig.name} помогает предпринимателям в Москве: регистрация ООО и ИП, юридические адреса, налоговые проверки и ликвидация.`,
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Надёжный партнёр для вашего бизнеса"
        subtitle="Берём на себя регистрацию, юридический адрес, налоговые проверки и ликвидацию, чтобы вы могли сосредоточиться на развитии компании."
        image={images.officeLounge}
        breadcrumbs={[{ name: "О компании", path: routes.about }]}
      />

      <AboutSection showLink={false} />

      <WhyUsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
