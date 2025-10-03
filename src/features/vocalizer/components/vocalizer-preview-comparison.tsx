"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlay, FaPause } from "react-icons/fa";
import VocalizerPreviewTrackButton from "./vocalizer-preview-track-button";
import { FaVolumeUp } from "react-icons/fa";
import Waveform, { WaveformHandle } from "./waveform";
import { Icon } from "@iconify/react";
import { useAudioComparisonPreview } from "../hooks/use-audio-comparison-preview";
import {
  ResultUrls,
  Mode,
  VOCALIZER_TABS as TABS,
  getModeUrl,
} from "@/features/vocalizer/models/vocalizer";
import { useDownloadTrack } from "../hooks/use-download-track";
import { formatTime } from "@/lib/format-time";

export function VocalizedPreviewComparison({
  isVisible,
  onClose,
  uploadedFile,
  result,
}: {
  isVisible: boolean;
  onClose: () => void;
  uploadedFile: File | null;
  result: ResultUrls;
}) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const waveformRef = useRef<WaveformHandle | null>(null);

  const {
    isPlaying,
    toggle,
    setVolume,
    currentUrl,
    tab,
    onChangeTab,
    activeVersion,
    setActiveVersion,
    pause,
  } = useAudioComparisonPreview(uploadedFile, result);

  const handleVersionChange = (next: "original" | "vocalized") => {
    const wf = waveformRef.current;
    if (!wf) return setActiveVersion(next);

    const seek = wf.getCurrentTime();
    const autoplay = wf.isPlaying();

    setActiveVersion(next);

    if (next === "original") {
      if (uploadedFile) void wf.loadBlob?.(uploadedFile, seek, autoplay);
      return;
    }
    const url = getModeUrl(tab, result);
    if (url) void wf.load(url, seek, autoplay);
  };

  const handleTabChange = (nextTab: Mode) => {
    const wf = waveformRef.current;
    if (!wf) return onChangeTab(nextTab);

    const seek = wf.getCurrentTime();
    const autoplay = wf.isPlaying();

    onChangeTab(nextTab);

    if (activeVersion === "vocalized") {
      const nextUrl = getModeUrl(nextTab, result);
      if (nextUrl) void wf.load(nextUrl, seek, autoplay);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    waveformRef.current?.setVolume(parseFloat(e.target.value));
  };

  const { downloadThis, downloadAll } = useDownloadTrack(
    uploadedFile,
    result,
    tab,
    activeVersion
  );

  console.log("tab:", tab);
  console.log("result urls:", {
    standard: result?.standard_url,
    dynamic: result?.dynamic_url,
    smooth: result?.smooth_url,
  });
  console.log("resolved url:", getModeUrl(tab, result));

  return (
    <Dialog
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) return onClose();
      }}
    >
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="sm:max-w-5xl w-full p-0 border-none rounded-lg bg-[#1A1A1A] text-white font-montserrat
    max-h-[88vh] overflow-y-auto sm:max-h-none  sm:overflow-visible scrollbar-hide"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">Preview Vocalized Track</DialogTitle>{" "}
        </DialogHeader>
        {uploadedFile ? (
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
            <span>{uploadedFile.name}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-red-500">
            <span>No file</span>
          </div>
        )}
        <div className="flex flex-col md:flex-row w-full">
          <TabsList tab={tab} setTab={handleTabChange} />
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-[#111] rounded">
              <div className="p-6 flex items-center gap-6 relative h-[300px]">
                <PlayingButton
                  playing={isPlaying}
                  onClick={toggle}
                  disabled={!uploadedFile && !currentUrl}
                />
                {isVisible && (
                  <Waveform
                    ref={waveformRef}
                    isPlaying={isPlaying}
                    onReady={setDuration}
                    onTimeUpdate={setCurrentTime}
                    onFinish={() => {
                      pause();
                    }}
                    initialBlob={
                      activeVersion === "original" ? uploadedFile : null
                    }
                    initialUrl={
                      activeVersion === "vocalized"
                        ? getModeUrl(tab, result)
                        : undefined
                    }
                  />
                )}
              </div>
              <div className="flex flex-col items-start px-10 p-4 gap-y-6">
                <TimeBar currentTime={currentTime} duration={duration} />
                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-10 w-full px-2">
                  <VocalizerPreviewTrackButton
                    activeVersion={activeVersion}
                    setActiveVersion={handleVersionChange}
                  />

                  <VolumeSlider
                    onChange={(v) =>
                      handleVolumeChange({
                        target: { value: String(v) },
                      } as any)
                    }
                  />
                </div>
              </div>
            </div>
            <VocalizePreviewActions
              canDownloadThis={
                !(activeVersion === "vocalized" && !getModeUrl(tab, result))
              }
              onDownloadThis={downloadThis}
              onDownloadAll={downloadAll}
              hasAnyResult={Boolean(
                result.standard_url || result.dynamic_url || result.smooth_url
              )}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TabsList({ tab, setTab }: { tab: Mode; setTab: (m: Mode) => void }) {
  return (
    <div className="flex md:flex-col flex-row md:w-[250px] w-full border-b md:border-b-0 md:border-r border-[#333]">
      {TABS.map((label) => {
        const active = tab === label;
        return (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`relative flex items-center justify-center md:justify-start gap-1 px-4 py-3 text-left transition-colors w-full ${
              active ? "bg-[#262626] text-white font-semibold" : "text-[#888]"
            } hover:bg-[#333]`}
          >
            {active && (
              <span className="absolute md:left-0 md:top-0 md:h-full md:w-1 left-0 bottom-0 w-full h-[2px] bg-[#3B82F6] md:rounded-r-md" />
            )}
            <div className="w-10 text-center">
              {label === "Standard" && (
                <Icon icon="mdi:standard-definition" width="44" height="40" />
              )}
              {label === "Dynamic" && (
                <Icon icon="cbi:scene-dynamic" width="44" height="40" />
              )}
              {label === "Smooth" && (
                <Icon icon="mdi:smoothing-iron" width="44" height="40" />
              )}
            </div>
            <span className="text-xs">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PlayingButton({
  playing,
  onClick,
  disabled,
}: {
  playing: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-16 h-16 md:w-20 md:h-18 rounded-full border-[6px] border-white flex items-center justify-center hover:scale-105 transition disabled:opacity-40"
      aria-label={playing ? "Pause" : "Play"}
    >
      {playing ? (
        <FaPause className="text-white w-5 h-5" />
      ) : (
        <FaPlay className="text-white w-5 h-5" />
      )}
    </button>
  );
}

function VolumeSlider({ onChange }: { onChange: (v: number) => void }) {
  const [v, setV] = useState(1);
  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <FaVolumeUp className="text-white w-5 h-5 shrink-0" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={v}
        onChange={(e) => {
          const nv = parseFloat(e.target.value);
          setV(nv);
          onChange(nv);
        }}
        className="flex-1 sm:w-32 h-1 bg-gray-600 rounded-full appearance-none"
      />
    </div>
  );
}

function TimeBar({
  currentTime,
  duration,
}: {
  currentTime: number;
  duration: number;
}) {
  return (
    <div className="flex justify-between text-xs text-white px-5 w-full border rounded-3xl bg-[#252525] border-none">
      <span>{formatTime(currentTime)}</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
}

function VocalizePreviewActions({
  canDownloadThis,
  onDownloadThis,
  onDownloadAll,
  hasAnyResult,
}: {
  canDownloadThis: boolean;
  onDownloadThis: () => void;
  onDownloadAll: () => void;
  hasAnyResult: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4 w-full">
      <button className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#444] text-white font-semibold hover:bg-[#555]">
        + Add to Library
      </button>
      <button
        onClick={onDownloadThis}
        className="w-full sm:w-auto gradient-border-button disabled:opacity-40"
        disabled={!canDownloadThis}
      >
        <span className="text-professional-song font-medium">
          Download <span className="font-bold ml-1">This</span>
        </span>
      </button>
      <button
        onClick={onDownloadAll}
        className="cursor-pointer w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#234C90] text-white font-semibold flex items-center justify-center gap-2 hover:from-[#60A5FA] hover:to-[#3B82F6] disabled:opacity-40"
        disabled={!hasAnyResult}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M5 20h14v-2H5m14-9h-4V3H9v6H5l7 7 7-7z" />
        </svg>
        Download All
      </button>
    </div>
  );
}
