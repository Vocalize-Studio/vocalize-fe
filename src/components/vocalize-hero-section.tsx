import singer from "../../public/singer.svg";
import Image from "next/image";
import VocalizerForm from "@/features/vocalizer/components/vocalizer-form";
import { vocalizerFeatures } from "@/features/vocalizer/constants/vocalizer";
import FeaturedCard from "./featured-card";

export default function VocalizeHeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <Image
        className="absolute inset-0 size-full object-cover object-center z-0"
        src={singer}
        alt="background-hero"
      />
      <div className="absolute inset-0 z-10 bg-gradient-vocalize" />
      <div className="relative z-10 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-24">
          <div className="space-y-6 flex-col items-center justify-center mx-auto md:mx-8 max-w-lg md:w-auto">
            <h1 className="text-4xl lg:text-5xl font-bold leading-snug text-white flex-col md:flex text-center">
              <span className="block text-5xl">Transform your</span>
              <span className="block text-8xl lg:text-9xl font-bold text-gradient-vocalize text-pri">
                Vocals
              </span>
              <span className="block text-5xl lg:text-5xl font-normal">
                in 3 minutes
              </span>
            </h1>

            <p className="text-2xl max-w-md md:max-w-lg text-center text-white leading-relaxed">
              Get instant AI mixing & mastering for your dream vocals.{" "}
              <span className="font-bold text-white">
                Fast. Easy. Flawless.
              </span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="text-white text-center mb-6">
              <p className="text-2xl max-w-lg text-center md:text-start font-light">
                Upload your tracks and let our AI create a{" "}
                <span className="text-white/90 font-bold">
                  professional, studio-quality song for you.
                </span>
              </p>
            </div>
            <VocalizerForm />
          </div>
        </div>
        <VocalizerFeatureList />
      </div>
    </section>
  );
}

export const VocalizerFeatureList = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-[95rem] py-4 md:p-16 mx-auto">
      {vocalizerFeatures.map((feature) => (
        <FeaturedCard
          key={feature.title}
          title={feature.title}
          content={feature.content}
          subcontent={feature.subcontent}
        />
      ))}
    </div>
  );
};
