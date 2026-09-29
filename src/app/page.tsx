import { CTASection } from "@/components/CTASection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Hero } from "@/components/sections/Hero";
import { LeadSection } from "@/components/sections/LeadSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { siteConfig } from "@/config/site";
import { getFaqItems } from "@/data/faq";
import { FORM_ANCHOR } from "@/data/navigation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${siteConfig.logo.wordmark} — регистрация бизнеса и юридические адреса в Москве`,
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
      <LeadSection surface="white" className="border-t border-line" />
      <PricingSection />
      <WhyUsSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection
        items={getFaqItems(["address-price", "address-includes", "notary-costs", "liquidation-price", "tax-price", "consultation"])}
        className="surface-ivory"
      />
      <CTASection primary={{ label: "Получить консультацию", href: `#${FORM_ANCHOR}` }} />
    </>
  );
}
