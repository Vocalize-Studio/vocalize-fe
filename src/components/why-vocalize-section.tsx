import React from "react";
import Image from "next/image";

type Feature = {
  image: string;
  headline: string;
  description: string;
};

const features: Feature[] = [
  {
    image: "/ai-powered-production.svg",
    headline: "AI-Powered Production",
    description:
      "Our deep-learning engine automatically mixes, masters, and polishes your song to perfection.",
  },
  {
    image: "/designed-for-artist.svg",
    headline: "Designed for Artists",
    description:
      "We remove the technical barriers of audio engineering so you can effortlessly elevate your music.",
  },
  {
    image: "/multiple-styles1.svg",
    headline: "Multiple Styles, One Click",
    description:
      "Instantly generate and choose between three unique, professional mastering styles.",
  },
];

export default function WhyVocalizeSection() {
  return (
    <section className="relative w-full py-20 bg-[#252525]">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        <span className="text-professional-song">Why Vocalize?</span>
        <span className="text-3xl inline-block align-middle ml-2 absolute [background:unset] [-webkit-background-clip:unset] [-webkit-text-fill-color:white] text-white">
          {"\u2728\uFE0E"}
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto my-12 px-6 md:px-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="relative group rounded-2xl overflow-hidden shadow-lg border-2 border-[rgba(146,146,146,0.15)]"
          >
            <Image
              src={feature.image}
              alt={feature.headline}
              width={500}
              height={500}
              className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/20 backdrop-blur-[4px] transition-all duration-500 group-hover:bg-black/50 group-hover:backdrop-blur-[1px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-transform duration-500">
              <h3 className="text-white text-xl font-bold mb-3">
                {feature.headline}
              </h3>
              <p className="text-[#D1D5DB] text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
