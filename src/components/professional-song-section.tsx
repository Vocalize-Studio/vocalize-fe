import Image from "next/image";
import React from "react";
import { Upload, Music, Download } from "lucide-react";
import ProfessionalSongImage from "../../public/professional-song-bg.svg";

const FeatureList = [
  {
    icon: <Upload className="w-12 h-12" />,
    title: "1. Upload Your Tracks",
    description: (
      <>
        Upload your three essential audio files: <b>Vocal</b>,{" "}
        <b>Instrumental</b>, and a <b>Reference Song</b>. Simply select your
        files or paste a YouTube link, and our system will prepare them for
        magic.
      </>
    ),
  },
  {
    icon: <Music className="w-12 h-12" />,
    title: "2. Let the AI Work Its Magic",
    description: (
      <>
        Our cutting-edge AI will automatically <b>clean</b>, <b>correct</b>,{" "}
        <b>mix</b>, and <b>master</b> your song. Just sit back and let our
        technology craft your audio into a masterpiece.
      </>
    ),
  },
  {
    icon: <Download className="w-12 h-12" />,
    title: "3. Preview, Compare, & Download",
    description: (
      <>
        Listen to and compare the final result with your original audio in
        real-time. Choose from three mastering styles (<b>Standard</b>,{" "}
        <b>Dynamic</b>, <b>Smooth</b>) and download your favorite version with a
        single click.
      </>
    ),
  },
];

export default function ProfessionalSongSection() {
  return (
    <section className="relative bg-[#252525] text-white w-full py-12 lg:min-h-screen overflow-hidden">
      <div className="hidden lg:flex absolute left-0 top-0 h-full w-1/2 z-0 items-center justify-center">
        <Image
          src={ProfessionalSongImage}
          alt="Singer holding mic"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 items-center lg:h-full">
        <div className="hidden lg:block" />
        <div className="w-full max-w-3xl px-6 py-12 lg:px-16 mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-10 text-center lg:text-left">
            <span className="text-professional-song font-montserrat">
              Professional Song
            </span>
            <br className="hidden lg:block" />
            <span className="text-white font-montserrat"> in One Click</span>
          </h2>

          <div className="space-y-10 text-base md:text-lg">
            {FeatureList.map((feature, index) => (
              <FeatureStep
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 border-[#C2D8FC] text-[#C2D8FC] rounded-full flex items-center justify-center mr-4">
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="font-bold mb-2 text-white font-montserrat">{title}</p>
        <p className="text-white/80 leading-relaxed font-medium font-montserrat">
          {description}
        </p>
      </div>
    </div>
  );
}
