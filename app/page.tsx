import BgGradient from "@/components/common/bg-gradient";
import CtaSection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import PricingSection from "@/components/home/pricing-section";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <BgGradient />

      <div className="flex flex-col">
        <HeroSection />
        {/* DEMO SECTION */}
        <DemoSection />
        {/* HOW IT WROKS */}
        <HowItWorksSection />
        {/* PRICING SECTION */}
        <PricingSection />
        {/* CTA SECTION */}
        <CtaSection />
      </div>
    </div>
  );
}
