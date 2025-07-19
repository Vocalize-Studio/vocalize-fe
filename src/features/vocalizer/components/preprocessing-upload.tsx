import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useEffect, useState } from "react";

type PreprocessingUploadProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompleted: () => void;
  fileName?: string;
};

export default function PreprocessingUpload({
  open,
  onOpenChange,
  onCompleted,
  fileName,
}: PreprocessingUploadProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onCompleted();
          }, 500);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-4xl bg-[#252525] text-white border-none rounded-3xl overflow-visible">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-4">
            <div className="relative w-12 h-12">
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-[#3B82F6]"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="100"
                  strokeDashoffset={`${100 - progress}`}
                  d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                {progress}%
              </div>
            </div>

            <DialogHeader className="text-left leading-tight">
              <DialogTitle className="text-[#f4f4f4] text-lg font-semibold font-montserrat">
                Preprocessing is in progress.
              </DialogTitle>
              <DialogDescription className="text-[#929292] text-lg font-montserrat">
                {fileName}
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6">
          <div className="md:w-1/2 space-y-4">
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
