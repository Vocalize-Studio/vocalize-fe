import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VocalizerCarouselNavProps {
  activeVersion: "original" | "vocalized";
  goPrev: () => void;
  goNext: () => void;
}

export default function VocalizerCarouselNav({
  activeVersion,
  goPrev,
  goNext,
}: VocalizerCarouselNavProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={goPrev}
        className="text-gray-400 hover:text-gray-600 w-12 h-12 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <div className="mx-8">
        <span className="text-lg font-medium text-[#252525] font-montserrat ">
          {activeVersion.toUpperCase()}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={goNext}
        className="text-gray-400 hover:text-gray-600 w-12 h-12 rounded-full hover:bg-gray-200 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
