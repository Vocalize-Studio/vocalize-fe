"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Card } from "./ui/card";

export default function AudioComparisonSection() {
  const [currentTrack, setCurrentTrack] = useState<number>(1);
  const [activeVersion, setActiveVersion] = useState<"original" | "vocalized">(
    "vocalized"
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const tracks = [
    {
      id: 0,
      title: "BLACKPINK",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-purple-900 to-black",
    },
    {
      id: 1,
      title: "The Greatest Showman",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-blue-900 to-blue-700",
    },
    {
      id: 2,
      title: "Album Cover",
      image: "/placeholder.svg?height=300&width=300",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            Hear the Difference{" "}
            <span className="text-gradient-vocalize-contrast">Vocalize</span>{" "}
            Makes
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Listen to the journey from a simple recording to a{" "}
            <span className="text-black">powerful, studio-quality song</span>
            with just one click.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="mx-8">
              <span className="text-lg font-medium text-gray-500">Normal</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center justify-center mb-8 space-x-4">
            {tracks.map((track, index) => {
              const isCenter = index === currentTrack;
              const isAdjacent =
                Math.abs(index - currentTrack) === 1 ||
                (currentTrack === 0 && index === tracks.length - 1) ||
                (currentTrack === tracks.length - 1 && index === 0);

              return (
                <div
                  key={track.id}
                  className={`relative transition-all duration-500 ${
                    isCenter
                      ? "scale-110 z-20"
                      : isAdjacent
                      ? "scale-90 opacity-70 z-10"
                      : "scale-75 opacity-40 z-0"
                  }`}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div
                      className={`aspect-square w-64 bg-gradient-to-br ${track.color} relative`}
                    >
                      {isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="icon"
                            onClick={togglePlayback}
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/50"
                          >
                            {isPlaying ? (
                              <Pause className="w-8 h-8 text-white" />
                            ) : (
                              <Play className="w-8 h-8 text-white ml-1" />
                            )}
                          </Button>
                        </div>
                      )}

                      <div className="absolute inset-4 bg-white/10 rounded-lg flex items-center justify-center">
                        <div className="text-white/80 text-center">
                          <div className="w-16 h-16 mx-auto mb-2 bg-white/20 rounded-full"></div>
                          <p className="text-sm font-medium">{track.title}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {tracks[currentTrack].title}
            </h3>
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Button
              variant={activeVersion === "original" ? "default" : "outline"}
              onClick={() => setActiveVersion("original")}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeVersion === "original"
                  ? "bg-gray-400 text-white hover:bg-gray-500"
                  : "bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              ORIGINAL
            </Button>
            <Button
              variant={activeVersion === "vocalized" ? "default" : "outline"}
              onClick={() => setActiveVersion("vocalized")}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeVersion === "vocalized"
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-transparent border-primary-300 text-primary-600 hover:bg-primary-50"
              }`}
            >
              VOCALIZED
            </Button>
          </div>

          {isPlaying && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full w-1/3 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0:45</span>
                <span>2:30</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
