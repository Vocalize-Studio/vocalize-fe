import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CarouselApi } from "@/components/ui/carousel";
import { tracks } from "@/features/vocalizer/constants/vocalizer";

export function useAudioComparison() {
  const [activeVersion, _setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastCurrentTime = useRef<number>(0);
  const prevTrackRef = useRef<number>(currentTrack);

  const setActiveVersion = (version: "original" | "vocalized") => {
    if (audioRef.current) {
      lastCurrentTime.current = audioRef.current.currentTime;
    }
    _setActiveVersion(version);
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentTrack(api.selectedScrollSnap());
      setIsPlaying(true);
    };

    setCurrentTrack(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const audioSrc =
    activeVersion === "original"
      ? tracks[currentTrack].videoOriginal
      : tracks[currentTrack].videoVocalized;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekTime =
      prevTrackRef.current === currentTrack ? lastCurrentTime.current : 0;

    audio.src = audioSrc;
    audio.load();

    const onLoadedMetadata = () => {
      audio.currentTime = seekTime;

      if (isPlaying) {
        audio.play().catch(console.error);
      }
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [audioSrc, currentTrack]);

  useEffect(() => {
    prevTrackRef.current = currentTrack;
  }, [currentTrack]);

  const togglePlayback = () => {
    setIsPlaying((prev) => {
      const newState = !prev;

      if (audioRef.current) {
        if (newState) {
          audioRef.current.play().catch(console.error);
        } else {
          audioRef.current.pause();
        }
      }

      return newState;
    });
  };

  const goPrev = () => api?.scrollPrev();
  const goNext = () => api?.scrollNext();

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
