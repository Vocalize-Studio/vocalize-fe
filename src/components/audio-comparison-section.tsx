"use client";

import React from "react";
import { useAudioComparison } from "@/features/vocalizer/hooks/use-audio-comparison";
import { tracks } from "@/features/vocalizer/constants/vocalizer";
import VocalizerCarouselNav from "@/features/vocalizer/components/vocalizer-carousel-nav";
import VocalizerTrackCarousel from "@/features/vocalizer/components/vocalizer-track-carousel";
import VocalizerTrackButton from "@/features/vocalizer/components/vocalizer-track-button";

export default function AudioComparisonSection() {
  const {
    activeVersion,
    setActiveVersion,
    isPlaying,
    togglePlayback,
    goPrev,
    goNext,
    currentTrack,
    setApi,
    audioSrc,
    audioRef,
  } = useAudioComparison();

  return (
    <section className="py-20 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-semibold text-black font-montserrat">
            Hear the Difference{" "}
            <span className="text-gradient-vocalize-contrast font-bold">Vocalize</span>{" "}
            Makes
          </h2>
          <p className="text-xl text-black max-w-5xl mx-auto font-montserrat font-normal">
            Listen to the journey from a simple recording to a{" "}
            <span className="text-black font-bold">
              powerful, studio-quality song
            </span>{" "}
            with just one click.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <VocalizerCarouselNav
            activeVersion={activeVersion}
            goPrev={goPrev}
            goNext={goNext}
          />
          <div className="relative">
            <VocalizerTrackCarousel
              tracks={tracks}
              currentTrack={currentTrack}
              togglePlayback={togglePlayback}
              activeVersion={activeVersion}
              setApi={setApi}
              isPlaying={isPlaying}
            />
          </div>

          <div className="text-center my-8">
            <h3 className="text-3xl font-semibold text-[#252525] font-montserrat">
              {tracks[currentTrack].title}
            </h3>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-8">
            <VocalizerTrackButton
              activeVersion={activeVersion}
              setActiveVersion={setActiveVersion}
            />
          </div>

          <div className="hidden">
            <audio
              src={audioSrc}
              controls
              autoPlay={isPlaying}
              ref={audioRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
