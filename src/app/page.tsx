import { CTASection } from "@/components/CTASection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.logo.wordmark} — юридический адрес, регистрация и сопровождение бизнеса`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <PricingSection />
      <WhyUsSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection items={faqItems} className="surface-ivory" />
      <CTASection />
    </>
  );
}
