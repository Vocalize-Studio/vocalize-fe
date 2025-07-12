import { useState } from "react";

export function useMultiStep<T>(items: T[]) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % items.length);
  };

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  const goTo = (i: number) => {
    setDirection(i > index ? "right" : "left");
    setIndex(i);
  };

  return {
    currentIndex: index,
    currentItem: items[index],
    direction,
    goToNext: next,
    goToPrevious: prev,
    goToIndex: goTo,
    isLastStep: index === items.length - 1,
  };
}
