import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { JobStatus } from "../services/job-service";

type PreprocessingUploadProps = {
  open: boolean;
  fileName?: string;
  progress?: number | null;
  status?: JobStatus;
  onOpenChange?: (open: boolean) => void;
};

const STEPS = [
  "Processing File...",
  "Preprocessing Audio...",
  "Correcting Vocal...",
  "Mixing And Mastering Audio...",
  "Finalizing...",
];

function buildThresholds(stepsLen: number) {
  const each = 100 / stepsLen;
  return Array.from({ length: stepsLen }, (_, i) => Math.round((i + 1) * each));
}

function getStepTitle(progress: number | null | undefined, status?: JobStatus) {
  if (status === "failed") return "Processing failed";
  if (status === "completed") return "completed";

  const thresholds = buildThresholds(STEPS.length);
  const p =
    typeof progress === "number" ? Math.max(0, Math.min(100, progress)) : 0;
  const idx = thresholds.findIndex((t) => p <= t);
  return STEPS[Math.max(0, idx === -1 ? STEPS.length - 1 : idx)];
}

export default function PreprocessingUpload({
  open,
  onOpenChange,
  fileName,
  progress,
  status,
}: PreprocessingUploadProps) {
  const pct = useMemo(() => {
    if (status === "completed") return 100;

    const p = Number(progress);
    if (!Number.isFinite(p)) return null;

    return Math.max(0, Math.min(100, Math.round(p)));
  }, [progress, status]);
  const title = getStepTitle(pct ?? 0, status);
  console.log("ini progress : ", progress);
  console.log("ini status : ", status);
  console.log("ini filename : ", fileName);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-4xl bg-[#252525] text-white border-none rounded-3xl overflow-visible">
        <div className="flex items-center justify-start">
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <div className="relative w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)]">
              <ProgressRing value={pct} />
              {/* <div className="absolute inset-0 flex items-center justify-center font-semibold text-white text-[clamp(0.6rem,1.2vw,1rem)]">
                {progress}%
              </div> */}
            </div>

            <DialogHeader className="text-left leading-px">
              <DialogTitle className="text-[#f4f4f4] text-sm sm:text-base md:text-lg font-semibold font-montserrat">
                {title}
              </DialogTitle>
              <DialogDescription className="text-[#929292] text-sm sm:text-base md:text-lg font-montserrat">
                {fileName}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start md:items-start justify-between gap-6 pb-6">
          <div className="md:w-1/2 space-y-4 max-w-lg">
            <h3 className="text-xl text-[#f4f4f4] max-w-md font-semibold leading-snug mb-4">
              How to make <br /> your voice to professional sound <br />
              instant and unlimited
            </h3>
            <p className="text-[#929292] text-sm mb-6">
              Buy our subscription plan and enjoy your amazing sound <br /> in
              minutes
            </p>
            <button className="cursor-pointer px-6 py-2 border-[3px] bg-[rgba(59,130,246,0.53)] border-[#2563EB] rounded-full text-white font-medium transition duration-300 transform hover:bg-[#2563EB] hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95">
              Check out our plan
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-80 h-56 md:w-[480px] md:h-60 md:block hidden">
          <Image
            src="/download-bg.svg"
            alt="Download background"
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProgressRing({ value }: { value: number | null }) {
  if (value == null) {
    return (
      <div className="relative w-full h-full grid place-items-center">
        <div className="w-full h-full animate-spin">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#3B82F6]"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray="60 200"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
            />
          </svg>
        </div>
      </div>
    );
  }
  const CIRC = 100.53;
  const dashoffset = CIRC - (value / 100) * CIRC;

  return (
    <div className="relative w-[clamp(2.5rem,5vw,3.5rem)] h-[clamp(2.5rem,5vw,3.5rem)]">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-[#1f2937]"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
        />
        <path
          className="text-[#3B82F6]"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray={CIRC}
          strokeDashoffset={dashoffset}
          d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center font-semibold text-white text-[clamp(0.6rem,1.2vw,1rem)]">
        {value}%
      </div>
    </div>
  );
}
