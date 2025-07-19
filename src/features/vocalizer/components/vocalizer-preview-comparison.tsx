"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaPlay, FaPause } from "react-icons/fa";
import VocalizerPreviewTrackButton from "./vocalizer-preview-track-button.";
import { FaVolumeUp } from "react-icons/fa";
import Waveform, { WaveformHandle } from "./wave-from";
import { formatTime } from "@/lib/format-tiime";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  uploadedFile: File | null;
}

export function VocalizedPreviewComparison({
  isVisible,
  onClose,
  uploadedFile,
}: Props) {
  const [tab, setTab] = useState("Standard");
  const [playing, setPlaying] = useState(false);
  const [activeVersion, setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );
  const [volume, setVolume] = useState(1);
  const waveformRef = useRef<WaveformHandle | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    waveformRef.current?.setVolume(vol);
  };

  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDownloadDialogOpen, setDownloadDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile);
      setAudioUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [uploadedFile]);

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl w-full p-0 overflow-hidden border-none rounded-lg bg-[#1A1A1A] text-white font-montserrat">
        <DialogHeader>
          <DialogTitle className="sr-only">Preview Vocalized Track</DialogTitle>{" "}
        </DialogHeader>
        {uploadedFile ? (
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium">
            <span>{uploadedFile.name}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-red-500">
            <span>Tidak ada file</span>
          </div>
        )}

        <div className="flex w-full">
          <div className="flex flex-col w-[250px] border-r border-[#333]">
            {["Standard", "Dynamic", "Smooth"].map((label) => (
              <button
                key={label}
                onClick={() => setTab(label)}
                className={`relative flex items-center gap-5 px-5 py-4 text-left transition-colors ${
                  tab === label
                    ? "bg-[#262626] text-white font-semibold"
                    : "text-[#888]"
                } hover:bg-[#333]`}
              >
                {tab === label && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#3B82F6] rounded-r-md" />
                )}
                <div className="w-10 text-center">
                  {label === "Standard" && (
                    <span className="text-lg font-bold text-[#f4f4f4]">SD</span>
                  )}
                  {label === "Dynamic" && (
                    <svg
                      width="44"
                      height="40"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.375 28.875H15.125C14.3674 28.875 13.75 28.2563 13.75 27.5C13.75 26.7437 14.3674 26.125 15.125 26.125H23.375C24.1313 26.125 24.75 26.7437 24.75 27.5C24.75 28.2563 24.1313 28.875 23.375 28.875ZM30.25 23.375H19.25C18.4924 23.375 17.875 22.7563 17.875 22C17.875 21.2437 18.4924 20.625 19.25 20.625H30.25C31.0063 20.625 31.625 21.2437 31.625 22C31.625 22.7563 31.0063 23.375 30.25 23.375ZM26.125 17.875H15.125C14.3674 17.875 13.75 17.2563 13.75 16.5C13.75 15.7437 14.3674 15.125 15.125 15.125H26.125C26.8813 15.125 27.5 15.7437 27.5 16.5C27.5 17.2563 26.8813 17.875 26.125 17.875ZM22 5.5C12.8865 5.5 5.5 12.8879 5.5 22C5.5 31.1121 12.8865 38.5 22 38.5C31.1121 38.5 38.5 31.1121 38.5 22C38.5 12.8879 31.1121 5.5 22 5.5Z"
                        fill="#929292"
                      />
                    </svg>
                  )}
                  {label === "Smooth" && (
                    <svg
                      width="40"
                      height="24"
                      viewBox="0 0 40 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M38 0C34.68 0 32 2.68 32 6V14C32 15.1 31.1 16 30 16V8C30 4.68 27.32 2 24 2H16C12.68 2 10 4.68 10 8H14C14 6.9 14.9 6 16 6H24C25.1 6 26 6.9 26 8V10H8C3.58 10 0 13.58 0 18V24H30V20C33.32 20 36 17.32 36 14V6C36 4.9 36.9 4 38 4H40V0H38Z"
                        fill="#929292"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 p-4 space-y-4">
            <div className="bg-[#111] rounded">
              <div className="p-6 flex items-center gap-6 relative h-[300px]">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-20 h-18 rounded-full border-[6px] border-white flex items-center justify-center hover:scale-105 transition"
                >
                  {playing ? (
                    <FaPause className="text-white w-5 h-5" />
                  ) : (
                    <FaPlay className="text-white w-5 h-5" />
                  )}
                </button>
                {audioUrl && (
                  <Waveform
                    ref={waveformRef}
                    audioUrl={audioUrl}
                    isPlaying={playing}
                    onReady={setDuration}
                    onTimeUpdate={setCurrentTime}
                  />
                )}
              </div>
              <div className="flex flex-col items-start p-4 gap-y-6">
                <div className="flex justify-between text-xs text-white px-5 w-full border rounded-3xl bg-[#252525] border-none">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-10 px-2">
                  <VocalizerPreviewTrackButton
                    activeVersion={activeVersion}
                    setActiveVersion={setActiveVersion}
                  />
                  <div className="flex items-center gap-3">
                    <FaVolumeUp className="text-white w-5 h-5" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-32 h-1 bg-gray-600 rounded-full appearance-none custom-slider"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6 pt-4">
              <button className="px-5 py-3 rounded-full bg-[#444] text-white font-semibold hover:bg-[#555] cursor-pointer">
                + Add to Library
              </button>

              <button
                onClick={() => setDownloadDialogOpen(true)}
                className="gradient-border-button"
              >
                <span className="text-professional-song font-medium">
                  Download <span className="font-bold ml-1">This</span>
                </span>
              </button>

              <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#234C90] cursor-pointer text-white font-semibold flex items-center gap-2 hover:from-[#60A5FA] hover:to-[#3B82F6]">
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
