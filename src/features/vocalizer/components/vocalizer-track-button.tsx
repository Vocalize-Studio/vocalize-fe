import React from "react";

type VocalizerTrackButtonProps = {
  activeVersion: "original" | "vocalized";
  setActiveVersion: (version: "original" | "vocalized") => void;
};

export default function VocalizerTrackButton({
  activeVersion,
  setActiveVersion,
}: VocalizerTrackButtonProps) {
  return (
    <div className="relative w-64 h-12 bg-gray-200 rounded-full flex items-center px-1 transition-all">
      <div
        className={`absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 ${
          activeVersion === "original"
            ? "left-1 bg-[linear-gradient(90deg,#3B82F6_0%,#234C90_100%)]"
            : "left-1/2 bg-[linear-gradient(90deg,#3B82F6_0%,#234C90_100%)]"
        }`}
      />
      <div className="relative z-10 flex w-full justify-between text-sm font-semibold text-white">
        <button
          onClick={() => setActiveVersion("original")}
          className={`w-1/2 h-10 rounded-full transition-all cursor-pointer font-montserrat ${
            activeVersion === "original" ? "text-white" : "text-gray-500"
          }`}
        >
          ORIGINAL
        </button>
        <button
          onClick={() => setActiveVersion("vocalized")}
          className={`w-1/2 h-10 rounded-full transition-all cursor-pointer font-montserrat ${
            activeVersion === "vocalized" ? "text-white" : "text-gray-500"
          }`}
        >
          VOCALIZED
        </button>
      </div>
    </div>
  );
}
