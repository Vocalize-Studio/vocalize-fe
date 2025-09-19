import { getModeUrl, Version } from "../models/vocalizer";
import { Mode, ResultUrls } from "./use-audio-comparison-preview";

export function useDownloadTrack(
  uploadedFile: File | null,
  result: ResultUrls,
  tab: Mode,
  activeVersion: Version
) {
  const downloadThis = () => {
    if (uploadedFile && activeVersion === "original") {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFile.name || "original.wav";
      a.rel = "noopener";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      return;
    }

    const currentUrl = getModeUrl(tab, result);
    if (!currentUrl) return;
    const a = document.createElement("a");
    a.href = currentUrl;
    a.download = `my-song_Vocalized_${tab}.wav`;
    a.rel = "noopener";
    a.click();
  };

  const downloadAll = () => {
    const urls = [
      result.standard_url && { url: result.standard_url, name: "Standard" },
      result.dynamic_url && { url: result.dynamic_url, name: "Dynamic" },
      result.smooth_url && { url: result.smooth_url, name: "Smooth" },
    ].filter(Boolean) as { url: string; name: string }[];

    urls.forEach(({ url, name }) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = `my-song_Vocalized_${name}.wav`;
      a.rel = "noopener";
      a.click();
    });
  };

  return { downloadThis, downloadAll };
}
