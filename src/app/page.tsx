import AudioComparisonSection from "@/components/audio-comparison-section";
import ProfessionalSongSection from "@/components/professional-song-section";
import { TestimonialSection } from "@/components/testimonial-section";
import VocalizeHeroSection from "@/components/vocalize-hero-section";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <VocalizeHeroSection />
      <AudioComparisonSection />
      <ProfessionalSongSection />
      <TestimonialSection />
    </main>
  );
}
