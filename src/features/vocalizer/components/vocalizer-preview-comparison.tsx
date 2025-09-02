"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { formatTime } from "@/lib/format-time";
import { Icon } from "@iconify/react";

type ResultUrls = {
  standard_url?: string | null;
  dynamic_url?: string | null;
  smooth_url?: string | null;
  result_uri?: string | null;
};

const TABS = ["Standard", "Dynamic", "Smooth"] as const;
type Mode = (typeof TABS)[number];

interface Props {
  isVisible: boolean;
  onClose: () => void;
  uploadedFile: File | null;
  result: ResultUrls;
}

export function VocalizedPreviewComparison({
  isVisible,
  onClose,
  uploadedFile,
  result,
}: Props) {
  const [tab, setTab] = useState<Mode>("Standard");
  const [playing, setPlaying] = useState<boolean>(false);
  const [activeVersion, setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );
  const [volume, setVolume] = useState(1);
  const waveformRef = useRef<WaveformHandle | null>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    waveformRef.current?.setVolume(vol);
  };

  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDownloadDialogOpen, setDownloadDialogOpen] =
    useState<boolean>(false);

  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadedFile) {
      setBlobUrl(null);
      return;
    }
    const url = URL.createObjectURL(uploadedFile);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [uploadedFile]);

  const currentAudioUrl = useMemo(() => {
    if (activeVersion === "original") return blobUrl ?? undefined;
    return getModeUrl(tab, result);
  }, [activeVersion, blobUrl, tab, result]);

  useEffect(() => {
    setPlaying(false);
    setCurrentTime(0);
  }, [currentAudioUrl]);

  const handleDownloadThis = async () => {
    let url: string | undefined;
    if (activeVersion === "original") {
      if (!uploadedFile) return;
      const name = uploadedFile.name || "original.wav";
      const a = document.createElement("a");
      a.href = blobUrl || URL.createObjectURL(uploadedFile);
      a.download = name;
      a.click();
      return;
    } else {
      url = getModeUrl(tab, result) ?? result.result_uri ?? undefined;
    }
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = `my-song_Vocalized_${tab}.wav`;
    a.rel = "noopener";
    a.click();
  };

  const handleDownloadAll = async () => {
    const urls = [
      result.standard_url
        ? { url: result.standard_url, name: "Standard" }
        : null,
      result.dynamic_url ? { url: result.dynamic_url, name: "Dynamic" } : null,
      result.smooth_url ? { url: result.smooth_url, name: "Smooth" } : null,
    ].filter(Boolean) as { url: string; name: string }[];

    urls.forEach(({ url, name }) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = `my-song_Vocalized_${name}.wav`;
      a.rel = "noopener";
      a.click();
    });
  };

  return (
    <Dialog
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) onClose();
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
          <div className="flex md:flex-col flex-row md:w-[250px] w-full border-b md:border-b-0 md:border-r border-[#333]">
            {TABS.map((label) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`relative flex items-center justify-center md:justify-start gap-1 px-4 py-3 text-left transition-colors w-full ${
                  tab === label
                    ? "bg-[#262626] text-white font-semibold"
                    : "text-[#888]"
                } hover:bg-[#333]`}
              >
                {tab === label && (
                  <span className="absolute md:left-0 md:top-0 md:h-full md:w-1 left-0 bottom-0 w-full h-[2px] bg-[#3B82F6] md:rounded-r-md" />
                )}
                <div className="w-10 text-center">
                  {label === "Standard" && (
                    <Icon
                      icon="mdi:standard-definition"
                      width="44"
                      height="40"
                      color={tab ? "text-[#f4f4f4]" : "text-[#929292]"}
                    />
                  )}
                  {label === "Dynamic" && (
                    <Icon
                      icon="cbi:scene-dynamic"
                      width="44"
                      height="40"
                      color={tab ? "text-[#f4f4f4]" : "text-[#929292]"}
                    />
                  )}
                  {label === "Smooth" && (
                    <Icon
                      icon="mdi:smoothing-iron"
                      width="44"
                      height="40"
                      color={tab ? "text-[#f4f4f4]" : "text-[#929292]"}
                    />
                  )}
                </div>
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 space-y-4">
            <div className="bg-[#111] rounded">
              <div className="p-6 flex items-center gap-6 relative h-[300px]">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-16 h-16 md:w-20 md:h-18 rounded-full border-[6px] border-white flex items-center justify-center hover:scale-105 transition"
                >
                  {playing ? (
                    <FaPause className="text-white w-5 h-5" />
                  ) : (
                    <FaPlay className="text-white w-5 h-5" />
                  )}
                </button>
                {currentAudioUrl && (
                  <Waveform
                    ref={waveformRef}
                    audioUrl={currentAudioUrl}
                    isPlaying={playing}
                    onReady={setDuration}
                    onTimeUpdate={setCurrentTime}
                  />
                )}
              </div>
              <div className="flex flex-col items-start px-10 p-4 gap-y-6">
                <div className="flex justify-between text-xs text-white px-5 w-full border rounded-3xl bg-[#252525] border-none">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-10 w-full px-2">
                  <VocalizerPreviewTrackButton
                    activeVersion={activeVersion}
                    setActiveVersion={setActiveVersion}
                  />

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <FaVolumeUp className="text-white w-5 h-5 shrink-0" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="flex-1 sm:w-32 h-1 bg-gray-600 rounded-full appearance-none custom-slider"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4 w-full">
              <button className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#444] text-white font-semibold hover:bg-[#555] cursor-pointer">
                + Add to Library
              </button>

              <button
                onClick={handleDownloadThis}
                className="w-full sm:w-auto gradient-border-button"
                disabled={
                  activeVersion === "vocalized" && !getModeUrl(tab, result)
                }
              >
                <span className="text-professional-song font-medium">
                  Download <span className="font-bold ml-1">This</span>
                </span>
              </button>
              <button
                onClick={handleDownloadAll}
                className="cursor-pointer w-full sm:w-auto px-5 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#234C90] text-white font-semibold flex items-center justify-center gap-2 hover:from-[#60A5FA] hover:to-[#3B82F6]"
                disabled={
                  !result.standard_url &&
                  !result.dynamic_url &&
                  !result.smooth_url
                }
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getModeUrl(mode: Mode, r: ResultUrls): string | undefined {
  switch (mode) {
    case "Standard":
      return r.standard_url ?? undefined;
    case "Dynamic":
      return r.dynamic_url ?? undefined;
    case "Smooth":
      return r.smooth_url ?? undefined;
  }
}
