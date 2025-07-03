import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export function useCarouselAnimation(
  ref: RefObject<HTMLElement | null>,
  direction: "left" | "right",
  dependencies: any[] = []
) {
  useGSAP(
    () => {
      if (!ref.current) return;
      const fromX = direction === "right" ? 100 : -100;
      gsap.fromTo(
        ref.current,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    },
    { dependencies, scope: ref }
  );
}
