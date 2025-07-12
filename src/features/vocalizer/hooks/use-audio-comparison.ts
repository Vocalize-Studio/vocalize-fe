import { useEffect, useRef, useState } from "react";
import { CarouselApi } from "@/components/ui/carousel";
import { tracks } from "@/features/vocalizer/constants/vocalizer";

export function useAudioComparison() {
  const [activeVersion, setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastCurrentTime = useRef<number>(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentTrack(api.selectedScrollSnap());
      setIsPlaying(true);
    };

    setCurrentTrack(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack, activeVersion]);

  const togglePlayback = () => {
    setIsPlaying((prev) => {
      const newPlayState = !prev;

      if (audioRef.current) {
        if (newPlayState) {
          audioRef.current.play().catch(console.error);
        } else {
          audioRef.current.pause();
        }
      }

      return newPlayState;
    });
  };
  const goPrev = () => api?.scrollPrev();
  const goNext = () => api?.scrollNext();

  const audioSrc =
    activeVersion === "original"
      ? tracks[currentTrack].videoOriginal
      : tracks[currentTrack].videoVocalized;

  return {
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
  };
}
