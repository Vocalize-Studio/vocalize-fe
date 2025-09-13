"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioUrl: string;
  isPlaying: boolean;
  onReady?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
}

export interface WaveformHandle {
  setVolume: (value: number) => void;
  getDuration: () => number;
}

const Waveform = forwardRef<WaveformHandle, Props>(
  ({ audioUrl, isPlaying, onReady, onTimeUpdate }, ref) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
      if (!waveformRef.current) return;

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#1B3A6F",
        progressColor: "#3B82F6",
        url: audioUrl,
        dragToSeek: true,
        hideScrollbar: true,
        normalize: true,
        barGap: 4,
        height: 200,
        barHeight: 50,
        barRadius: 50,
        barWidth: 3,
        backend: "MediaElement",
      });

      const mediaEl = wavesurferRef.current.getMediaElement();
      if (mediaEl) {
        mediaEl.crossOrigin = "anonymous";
      }

      wavesurferRef.current.on("ready", () => {
        const duration = wavesurferRef.current!.getDuration();
        onReady?.(duration);
      });

      wavesurferRef.current.on("audioprocess", () => {
        const time = wavesurferRef.current!.getCurrentTime();
        onTimeUpdate?.(time);
      });

      wavesurferRef.current.on("error", (e) => {
        console.error("WaveSurfer error:", e);
      });

      return () => {
        wavesurferRef.current?.destroy();
      };
    }, [audioUrl]);

    useEffect(() => {
      const wavesurfer = wavesurferRef.current;
      if (!wavesurfer) return;
      isPlaying ? wavesurfer.play() : wavesurfer.pause();
    }, [isPlaying]);

    useImperativeHandle(ref, () => ({
      setVolume: (value: number) => {
        wavesurferRef.current?.setVolume(value);
      },
      getDuration: () => wavesurferRef.current?.getDuration() || 0,
    }));

    return (
      <div
        ref={waveformRef}
        className="w-full h-[200px] overflow-hidden"
        style={{ minHeight: "200px" }}
      />
    );
  }
);

export default Waveform;
