import { useState, useRef, useCallback, useEffect } from "react";

export function useRawVoiceUpload() {
  const [progress, setProgress] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback((f: File) => {
    setFile(f);
    setProgress(0);

    if (timerRef.current) clearInterval(timerRef.current);

    const id = setInterval(() => {
      setProgress((prev) => {
        if (prev === null) return 0;
        if (prev < 100) return prev + 5;
        clearInterval(id);
        timerRef.current = null;
        return 100;
      });
    }, 100);

    timerRef.current = id;
  }, []);

  const cancel = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;

    setFile(null);
    setProgress(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { progress, file, isRunning: progress !== null, start, cancel };
}
