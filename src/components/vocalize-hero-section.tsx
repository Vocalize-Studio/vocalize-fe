import singer from "../../public/singer.svg";
import Image from "next/image";
import VocalizerForm from "@/features/vocalizer/components/vocalizer-form";
import { vocalizerFeatures } from "@/features/vocalizer/constants/vocalizer";
import FeaturedCard from "./featured-card";
import { getSessionUser } from "@/lib/sessions";

export default async function VocalizeHeroSection() {
  const user = await getSessionUser();
  return (
    <section
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      id="vocalize"
    >
      <Image
        className="absolute inset-0 size-full object-cover object-center z-0"
        src={singer}
        priority
        alt="background-hero"
      />
      <div className="absolute inset-0 z-10 bg-gradient-vocalize" />
      <div className="relative z-10 container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-center mt-24">
          <div className="space-y-6 flex flex-col items-center justify-center text-center mx-auto lg:mx-0 max-w-xl lg:mt-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white flex-col md:items-center md:justify-center md:flex mx-auto">
              <span className="block sm:text-5xl lg:text-[42px] font-montserrat font-semibold text-center">
                Transform your
              </span>
              <span className="block text-[100px] md:text-[160px] lg:text-[150px] font-bold text-gradient-vocalize font-playfair leading-tight">
                Vocals
              </span>
              <span className="block text-4xl lg:text-[42px] font-semibold font-montserrat">
                in 3 minutes
              </span>
            </h1>

            <p className="px-4 sm:px-0 text-2xl max-w-md md:max-w-lg text-center text-white leading-relaxed font-montserrat">
              Get instant AI mixing & mastering for your dream vocals.{" "}
              <span className="font-bold text-white">
                Fast. Easy. Flawless.
              </span>
            </p>
          </div>
          <div className="space-y-6">
            <div className="text-white text-center mb-5">
              <p className="px-1 sm:px-0 text-base md:text-lg lg:text-2xl max-w-lg lg:max-w-xl text-center lg:text-start font-normal font-montserrat mx-auto lg:mx-0">
                Upload your tracks and let our AI create a{" "}
                <span className="text-white/90 font-bold">
                  professional, studio-quality song for you.
                </span>
              </p>
            </div>
            <VocalizerForm userId={user?.id ?? null} />
          </div>
        </div>
        <VocalizerFeatureList />
      </div>
    </section>
  );
}

function VocalizerFeatureList() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16 max-w-full py-4 md:p-8 mx-auto items-stretch h-full">
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
}
