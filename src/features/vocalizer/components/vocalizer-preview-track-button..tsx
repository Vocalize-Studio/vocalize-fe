import React from "react";

type VocalizerPreviewTrackButtonProps = {
  activeVersion: "original" | "vocalized";
  setActiveVersion: (version: "original" | "vocalized") => void;
};

export default function VocalizerPreviewTrackButton({
  activeVersion,
  setActiveVersion,
}: VocalizerPreviewTrackButtonProps) {
  return (
    <div className="relative w-64 h-12 bg-[#252525] rounded-full flex items-center px-1 transition-all">
      <div
        className={`absolute inset-y-0 w-1/2 px-[2px] transition-all duration-300 ${
          activeVersion === "original" ? "left-0" : "left-1/2"
        }`}
      >
        <div className="w-full h-full rounded-full bg-[#252525] border-2 border-[#3b82f6]" />
      </div>
      <div className="relative z-10 flex w-full justify-between text-sm font-semibold text-white">
        <button
          onClick={() => setActiveVersion("original")}
          className={`w-1/2 h-12 rounded-full transition-all cursor-pointer font-montserrat ${
            activeVersion === "original" ? "text-white" : "text-gray-500"
          }`}
        >
          ORIGINAL
        </button>
        <button
          onClick={() => setActiveVersion("vocalized")}
          className={`w-1/2 h-12 rounded-full transition-all cursor-pointer font-montserrat ${
            activeVersion === "vocalized" ? "text-white" : "text-gray-500"
          }`}
        >
          VOCALIZED
        </button>
      </div>
    </div>
  );
}
