"use client";

import { useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { useAudioCore } from "./use-audio-core";
import { tracks } from "@/features/vocalizer/constants/vocalizer";

export function useAudioComparisonCarousel() {
  const core = useAudioCore();
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [activeVersion, _setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );
  const prevTrackRef = useRef(currentTrack);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      core.snapshotTime();
      const idx = api.selectedScrollSnap();
      setCurrentTrack(idx);
      const nextSrc =
        activeVersion === "original"
          ? tracks[idx].videoOriginal
          : tracks[idx].videoVocalized;
      core.load(nextSrc);
      core.play();
    };
    setCurrentTrack(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, activeVersion]);

  const setActiveVersion = (v: "original" | "vocalized") => {
    core.snapshotTime();
    _setActiveVersion(v);
    const nextSrc =
      v === "original"
        ? tracks[currentTrack].videoOriginal
        : tracks[currentTrack].videoVocalized;
    core.load(nextSrc);
  };

  useEffect(() => {
    const first =
      activeVersion === "original"
        ? tracks[currentTrack].videoOriginal
        : tracks[currentTrack].videoVocalized;
    core.load(first);
  }, []);

  useEffect(() => {
    prevTrackRef.current = currentTrack;
  }, [currentTrack]);

  return {
    ...core,
    setApi,
    currentTrack,
    activeVersion,
    setActiveVersion,
    goPrev: () => api?.scrollPrev(),
    goNext: () => api?.scrollNext(),
    audioSrc:
      activeVersion === "original"
        ? tracks[currentTrack].videoOriginal
        : tracks[currentTrack].videoVocalized,
  };
}
