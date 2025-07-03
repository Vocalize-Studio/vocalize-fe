import { useRef, useEffect } from "react";

export function useAutoplay(callback: () => void, delay?: number) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    stop();
    intervalRef.current = setInterval(callback, delay);
  };

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    start();
    return stop;
  }, [delay]);

  return { start, stop };
}
