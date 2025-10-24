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
  limitSec?: number | null;
}

export interface WaveformHandle {
  setVolume: (value: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  isPlaying: () => boolean;
  setTime: (time: number) => void;
  play: () => void;
  pause: () => void;
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

    const onReadyRef = useRef(onReady);
    const onTimeUpdateRef = useRef(onTimeUpdate);
    const onFinishRef = useRef(onFinish);

    onReadyRef.current = onReady;
    onTimeUpdateRef.current = onTimeUpdate;
    onFinishRef.current = onFinish;

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
        backend: "WebAudio",
      });

      wsRef.current.on("ready", () => {
        const dur = wsRef.current!.getDuration();
        onReadyRef.current?.(dur);
      });

      wsRef.current.on("audioprocess", () => {
        const t = wsRef.current!.getCurrentTime();
        onTimeUpdateRef.current?.(t);
      });

      wsRef.current.on("finish", () => {
        onFinishRef.current?.();
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
      setTime: (t) => wsRef.current?.setTime(t),
      play: () => wsRef.current?.play(),
      pause: () => wsRef.current?.pause(),
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
          onReadyRef.current?.(ws.getDuration());
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
          onReadyRef.current?.(ws.getDuration());
        });
        ws.loadBlob(blob);
      },
    }));

    return <div ref={containerRef} className="w-full h-[200px]" />;
  }
);

export default Waveform;
