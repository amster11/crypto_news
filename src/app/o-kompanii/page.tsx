import { CTASection } from "@/components/CTASection";
import { FeatureItem } from "@/components/FeatureItem";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AboutSection } from "@/components/sections/AboutSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { siteConfig } from "@/config/site";
import { values } from "@/data/content";
import { images } from "@/data/images";
import { routes } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "О компании",
  description: `${siteConfig.name} помогает предпринимателям запускать и развивать бизнес: юридический адрес, регистрация компании и сопровождение.`,
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Надёжный партнёр для вашего бизнеса"
        subtitle="Берём на себя юридические и административные задачи, чтобы вы могли сосредоточиться на развитии компании."
        image={images.officeLounge}
        breadcrumbs={[{ name: "О компании", path: routes.about }]}
      />

      <AboutSection showLink={false} />

      <section aria-labelledby="values-title" className="py-24 lg:py-36">
        <Container>
          <SectionHeading id="values-title" eyebrow="Принципы" title="Ценности, на которых строится работа" />
          <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <FeatureItem key={value.title} title={value.title} text={value.text} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <WhyUsSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
