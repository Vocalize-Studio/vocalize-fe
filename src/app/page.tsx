import AudioComparisonSection from "@/components/audio-comparison-section";
import ContactInformationSection from "@/components/contact-information";
import CtaSection from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/pricing-section";
import ProfessionalSongSection from "@/components/professional-song-section";
import { TestimonialSection } from "@/components/testimonial-section";
import VocalizeHeroSection from "@/components/vocalize-hero-section";
import WhyVocalizeSection from "@/components/why-vocalize-section";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <VocalizeHeroSection />
      <AudioComparisonSection />
      <ProfessionalSongSection />
      <TestimonialSection />
      <CtaSection />
      <WhyVocalizeSection />
      <PricingSection />
      <ContactInformationSection />
      <Footer />
    </main>
  );
}
