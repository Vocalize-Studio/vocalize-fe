import { useState } from "react";

export function useAuthStep(maxStep: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    console.log("Going to next step");
    setCurrentIndex((prev) => Math.min(prev + 1, maxStep - 1));
  };

  const goToPrevious = () => {
    console.log("Going to prev step");
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goTo = (step: number) => {
    setCurrentIndex(Math.max(0, Math.min(step, maxStep - 1)));
  };

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goTo,
  };
}
