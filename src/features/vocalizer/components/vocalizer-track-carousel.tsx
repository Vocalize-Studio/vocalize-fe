import React, { useRef } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

export interface Track {
  id: number;
  image: string;
  title: string;
  videoOriginal: string;
  videoVocalized: string;
}

type VocalizerTrackCarouselProps = {
  tracks: Track[];
  currentTrack: number;
  togglePlayback: () => void;
  activeVersion: "original" | "vocalized";
  setApi: (api: any) => void;
  isPlaying: boolean;
};

export default function VocalizerTrackCarousel({
  tracks,
  currentTrack,
  togglePlayback,
  setApi,
  isPlaying,
}: VocalizerTrackCarouselProps) {
  const apiRef = useRef<CarouselApi | null>(null);

  const handleSetApi = (api: CarouselApi) => {
    apiRef.current = api;
    setApi(api);
  };
  return (
    <>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={handleSetApi}
        className="w-full mx-auto max-w-6xl overflow-hidden"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {tracks.map((track, index) => {
            const isCenter = index === currentTrack;

            return (
              <CarouselItem
                key={track.id}
                className="pl-2 md:pl-6 basis-1/2 md:basis-1/3 w-full"
              >
                <div
                  className={`relative w-full transition-all duration-500 ease-in-out ${
                    isCenter ? "z-20" : "opacity-70 z-10"
                  }`}
                >
                  <Card className="w-full max-w-md aspect-square border-0 bg-transparent p-0">
                    <div
                      className={`bg-center bg-no-repeat bg-cover relative overflow-hidden mx-auto rounded-2xl size-full transform transition-transform duration-500 ease-in-out ${
                        isCenter ? "scale-100 z-20" : "scale-85 z-10"
                      }`}
                      style={{
                        backgroundImage: `url(${track.image})`,
                      }}
                    >
                      <div className="relative z-10 h-full flex flex-col items-center justify-center">
                        {isCenter && (
                          <Button
                            size="icon"
                            onClick={togglePlayback}
                            className="w-16 h-16 rounded-full opacity-80 bg-transparent fill-[#DDD] hover:bg-white/30 border-2 mb-4 cursor-pointer"
                          >
                            {isPlaying ? (
                              <Pause className="w-9 h-9 text-[#DDD] opacity-80 ml-1" />
                            ) : (
                              <Play className="w-9 h-9 text-[#DDD] opacity-80 ml-1" />
                            )}
                          </Button>
                        )}
                        <div className="text-center">
                          <h3
                            className={`font-bold text-white ${
                              isCenter ? "text-xl" : "text-lg"
                            }`}
                          >
                            {track.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <button
        className="hidden md:block absolute left-0 top-0 h-full w-[12%] lg:w-[15%] z-30 cursor-pointer"
        onClick={() => apiRef.current?.scrollPrev()}
      />
      <button
        className="hidden md:block absolute right-0 top-0 h-full w-[12%] lg:w-[15%] z-30 cursor-pointer"
        onClick={() => apiRef.current?.scrollNext()}
      />
    </>
  );
}
