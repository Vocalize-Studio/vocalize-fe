"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import WaveSurfer from "wavesurfer.js";

interface Props {
  isPlaying: boolean;
  onReady?: (duration: number) => void;
  onTimeUpdate?: (time: number) => void;
  onFinish?: () => void;
  initialUrl?: string;
  initialBlob?: Blob | null;
}

export interface WaveformHandle {
  setVolume: (value: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  isPlaying: () => boolean;
  load: (url: string, seek?: number, autoplay?: boolean) => void;
  loadBlob?: (blob: Blob, seek?: number, autoplay?: boolean) => void;
}

const Waveform = forwardRef<WaveformHandle, Props>(
  (
    { isPlaying, onReady, onTimeUpdate, onFinish, initialUrl, initialBlob },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wsRef = useRef<WaveSurfer | null>(null);

    useEffect(() => {
      if (!containerRef.current || wsRef.current) return;

      wsRef.current = WaveSurfer.create({
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

      wsRef.current.on("ready", () => onReady?.(wsRef.current!.getDuration()));
      wsRef.current.on("audioprocess", () =>
        onTimeUpdate?.(wsRef.current!.getCurrentTime())
      );

      wsRef.current.on("finish", () => {
        onFinish?.();
      });

      if (initialBlob) wsRef.current.loadBlob(initialBlob);
      else if (initialUrl) wsRef.current.load(initialUrl);

      return () => {
        wsRef.current?.destroy();
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
      isPlaying: () => wsRef.current?.isPlaying() ?? false,
      load: (url, seek = 0, autoplay = false) => {
        const ws = wsRef.current;
        if (!ws || !url) return;
        const token = Symbol();
        (ws as any)._token = token;
        ws.once("ready", () => {
          if ((ws as any)._token !== token) return;
          const dur = ws.getDuration();
          const s = Math.min(
            Math.max(0, seek),
            Number.isFinite(dur) ? Math.max(0, dur - 0.05) : seek
          );
          ws.setTime(s);
          if (autoplay) ws.play();
          onReady?.(ws.getDuration());
        });
        ws.load(url);
      },
      loadBlob: (blob, seek = 0, autoplay = false) => {
        const ws = wsRef.current;
        if (!ws || !blob) return;
        const token = Symbol();
        (ws as any)._token = token;
        ws.once("ready", () => {
          if ((ws as any)._token !== token) return;
          const dur = ws.getDuration();
          const s = Math.min(
            Math.max(0, seek),
            Number.isFinite(dur) ? Math.max(0, dur - 0.05) : seek
          );
          ws.setTime(s);
          if (autoplay) ws.play();
          onReady?.(ws.getDuration());
        });
        ws.loadBlob(blob);
      },
    }));

    return <div ref={containerRef} className="w-full h-[200px]" />;
  }
);

export default Waveform;
