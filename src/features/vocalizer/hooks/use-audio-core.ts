"use client";

import { useRef, useState, useCallback } from "react";

export type AudioCore = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  getCurrentTime: () => number;
  setCurrentTime: (t: number) => void;
  snapshotTime: () => void;
  load: (src?: string, seek?: number, autoplay?: boolean) => void;
  loadBlob: (blob?: Blob, seek?: number, autoplay?: boolean) => void;
};

export function useAudioCore(): AudioCore {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const lastTimeRef = useRef(0);

  const play = () => {
    setIsPlaying(true);
    audioRef.current?.play().catch(() => {});
  };
  const pause = () => {
    setIsPlaying(false);
    audioRef.current?.pause();
  };
  const toggle = () => (isPlaying ? pause() : play());

  const setVolume = (v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
  };
  const getCurrentTime = () => audioRef.current?.currentTime ?? 0;
  const setCurrentTime = (t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
  };

  const snapshotTime = () => {
    lastTimeRef.current = getCurrentTime();
  };

  const load = useCallback(
    (nextSrc?: string, seek?: number, autoplay = false) => {
      const el = audioRef.current;
      if (!el || !nextSrc) return;

      const targetSeek = typeof seek === "number" ? seek : lastTimeRef.current;

      el.pause();
      el.src = nextSrc;
      el.load();

      const onMeta = () => {
        const dur = Number.isFinite(el.duration) ? el.duration : targetSeek;
        const s = Math.max(0, Math.min(targetSeek, Math.max(0, dur - 0.05)));
        el.currentTime = s;
        if (autoplay || isPlaying) el.play().catch(() => {});
      };
      el.addEventListener("loadedmetadata", onMeta, { once: true });
    },
    [isPlaying]
  );

  const loadBlob = useCallback(
    (blob?: Blob, seek?: number, autoplay = false) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      load(url, seek, autoplay);
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    },
    [load]
  );

  return {
    audioRef,
    isPlaying,
    play,
    pause,
    toggle,
    setVolume,
    getCurrentTime,
    setCurrentTime,
    snapshotTime,
    load,
    loadBlob,
  };
}
