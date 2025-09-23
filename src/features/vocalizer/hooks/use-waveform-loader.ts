import { useEffect } from "react";
import { WaveformHandle } from "../components/waveform";

export function useWaveformLoader({
  isVisible,
  waveformRef,
  activeVersion,
  uploadedFile,
  currentUrl,
  setCurrentTime,
}: {
  isVisible: boolean;
  waveformRef: React.RefObject<WaveformHandle | null>;
  activeVersion: "original" | "vocalized";
  uploadedFile: File | null;
  currentUrl?: string;
  setCurrentTime: (t: number) => void;
}) {
  useEffect(() => {
    if (!isVisible) return;
    const wf = waveformRef.current;
    if (!wf) return;

    const seek = wf.getCurrentTime();
    const autoplay = wf.isPlaying();

    if (activeVersion === "original" && uploadedFile) {
      wf.loadBlob?.(uploadedFile, seek, autoplay);
    } else if (currentUrl) {
      wf.load(currentUrl, seek, autoplay);
    }
  }, [isVisible, activeVersion, uploadedFile, currentUrl, setCurrentTime]);
}
