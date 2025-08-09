"use client";

import { Button } from "@/components/ui/button";
import { useAutoplay } from "@/hooks/use-auto-play";
import { useCarouselAnimation } from "@/hooks/use-carousel-animation";
import { useMultiStep } from "@/hooks/use-multi-steps";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Echo",
    role: "User Vocalize",
    quote:
      "I sang a melody, chose a style, and a few minutes later I had a complete, radio-ready song. Vocalize literally creates music from just your voice, it's insane!",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Maya Chen",
    role: "Music Producer",
    quote:
      "This platform revolutionized my creative process. I can now produce professional-quality demos in minutes instead of spending weeks in expensive studios.",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    role: "Content Creator",
    quote:
      "As a content creator, I needed quick background music for my videos. Vocalize gives me unlimited, royalty-free tracks that perfectly match my content style.",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Singer-Songwriter",
    quote:
      "My students love experimenting with AI music creation. It's an incredible tool for teaching music composition and inspiring creativity.",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

export function TestimonialSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentIndex, direction, goToNext, goToPrevious, goToIndex } =
    useMultiStep(testimonials);

  useAutoplay(goToNext, 6000);
  useCarouselAnimation(contentRef, direction, [currentIndex, direction]);

  const current = testimonials[currentIndex];

  return (
    <section className=" bg-gray-50 h-screen w-full flex items-center justify-center">
      <div className="container w-full mx-auto">
        <div className="w-full max-w-7xl mx-auto px-12">
          <div className="flex items-center justify-between">
            <Button
              onClick={goToPrevious}
              size="icon"
              className="cursor-pointer rounded-full w-14 h-14 md:w-20 md:h-20  bg-gradient-to-br from-[#BFD6FF] via-[#71A6FF] to-[#2E7BFF]  hover:scale-105 active:scale-95  transition-transform flex items-center justify-center"
            >
              <span className="text-white font-bold font-mono text-[1.8rem] leading-none inline-block translate-y-[1px] rotate-180">
                &gt;
              </span>
            </Button>

            <div
              ref={contentRef}
              className="flex-1 text-center px-4 sm:px-0 max-w-6xl mx-auto"
            >
              <blockquote className="text-base md:text-2xl lg:text-4xl text-gray-800 mb-8 leading-relaxed text-center font-montserrat">
                "{current.quote}"
              </blockquote>

              <div className="mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={current.image || "/placeholder.svg"}
                    alt={current.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full items-center"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-black text-xl mb-1 font-montserrat">
                  {current.name}
                </h3>
                <p className="text-black text-base font-montserrat">
                  {current.role}
                </p>
              </div>
            </div>

            <Button
              onClick={goToNext}
              size="icon"
              className="cursor-pointer rounded-full w-14 h-14 md:w-20 md:h-20  bg-gradient-to-br from-[#BFD6FF] via-[#71A6FF] to-[#2E7BFF]  hover:scale-105 active:scale-95  transition-transform flex items-center justify-center"
            >
              <span className="text-white font-bold font-mono text-[1.8rem] leading-none inline-block translate-y-[1px]">
                &gt;
              </span>
            </Button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 p-1.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
