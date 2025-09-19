"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  audioUrl?: string;
  audioBlob?: Blob | File;
  isPlaying: boolean;
  onReady?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
}

export interface WaveformHandle {
  setVolume: (value: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  load: (url: string, seek?: number, autoplay?: boolean) => void;
  loadBlob?: (blob: Blob, seek?: number, autoplay?: boolean) => void;
}

const Waveform = forwardRef<WaveformHandle, Props>(
  ({ audioUrl, audioBlob, isPlaying, onReady, onTimeUpdate }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wsRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
      if (!containerRef.current || wsRef.current) return;

      const ws = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#1B3A6F",
        progressColor: "#3B82F6",
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
      wsRef.current = ws;

      ws.on("ready", () => onReady?.(ws.getDuration()));
      ws.on("audioprocess", () => onTimeUpdate?.(ws.getCurrentTime()));

      if (audioBlob) ws.loadBlob(audioBlob);
      else if (audioUrl) ws.load(audioUrl);

      return () => {
        ws.destroy();
        wsRef.current = null;
      };
    }, []);

    useEffect(() => {
      const ws = wsRef.current;
      if (!ws) return;
      isPlaying ? ws.play() : ws.pause();
    }, [isPlaying]);

    useImperativeHandle(ref, () => ({
      setVolume: (v) => wsRef.current?.setVolume(v),
      getDuration: () => wsRef.current?.getDuration() ?? 0,
      getCurrentTime: () => wsRef.current?.getCurrentTime() ?? 0,
      load: (url, seek = 0, autoplay = false) => {
        const ws = wsRef.current;
        if (!ws || !url) return;
        ws.once("ready", () => {
          ws.setTime(seek);
          if (autoplay) ws.play();
        });
        if (url.startsWith("blob:")) {
          console.warn("Waveform.load tidak mendukung blob:, gunakan loadBlob");
        } else {
          ws.load(url);
        }
      },
      loadBlob: (blob, seek = 0, autoplay = false) => {
        const ws = wsRef.current;
        if (!ws) return;
        ws.once("ready", () => {
          ws.setTime(seek);
          if (autoplay) ws.play();
        });
        ws.loadBlob(blob);
      },
    }));

    return <div ref={containerRef} className="w-full h-[200px]" />;
  }
);

export default Waveform;
