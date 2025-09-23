import { getModeUrl, Version } from "../models/vocalizer";
import { Mode, ResultUrls } from "./use-audio-comparison-preview";
import JSZip from "jszip";
import { saveAs } from "file-saver";

async function fetchAsBlob(url: string) {
  const r = await fetch(url, { credentials: "include" });
  if (!r.ok) throw new Error(`Failed to fetch: ${r.status}`);
  return await r.blob();
}

export function useDownloadTrack(
  uploadedFile: File | null,
  result: ResultUrls,
  tab: Mode,
  activeVersion: Version
) {
  const baseName = uploadedFile?.name?.replace(/\.[^/.]+$/, "") || "my-song";

  const downloadThis = async () => {
    if (uploadedFile && activeVersion === "original") {
      const url = URL.createObjectURL(uploadedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}_Original.wav`;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      return;
    }

    const currentUrl = getModeUrl(tab, result);
    if (!currentUrl) return;

    const blob = await fetchAsBlob(currentUrl);
    saveAs(blob, `${baseName}_${tab}.wav`);
  };

  const downloadAll = async () => {
    const entries = [
      result.standard_url && { url: result.standard_url, label: "Standard" },
      result.dynamic_url && { url: result.dynamic_url, label: "Dynamic" },
      result.smooth_url && { url: result.smooth_url, label: "Smooth" },
    ].filter(Boolean) as { url: string; label: Mode }[];

    if (entries.length === 0) {
      console.warn("No entries to download");
      return;
    }

    const zip = new JSZip();

    for (const { url, label } of entries) {
      try {
        console.log("Fetching:", url);
        const blob = await fetchAsBlob(url);
        zip.file(`${baseName}_${label}.wav`, blob);
      } catch (err) {
        console.error("Failed to fetch", url, err);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    console.log("Generated ZIP size:", content.size);

    saveAs(content, `${baseName}_Vocalized_All.zip`);
  };

  return { downloadThis, downloadAll };
}
