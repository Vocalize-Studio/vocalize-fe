import { getModeUrl, Version } from "../models/vocalizer";
import { Mode, ResultUrls } from "./use-audio-comparison-preview";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Capabilities, Role } from "@/lib/role-access";
import { trimToWavBlob } from "../utils/audio-trim";
import { useLoginDialogStore } from "@/store/auth-dialog-store";

export function useDownloadTrack(
  uploadedFile: File | null,
  result: ResultUrls,
  tab: Mode,
  activeVersion: Version,
  caps: Capabilities,
  role: Role,
  openUpgrade: () => void
) {
  const { open: openLogin } = useLoginDialogStore();
  const baseName = uploadedFile?.name?.replace(/\.[^/.]+$/, "") || "my-song";
  const limitForVocalized =
    activeVersion === "vocalized" ? caps.previewLimitSec : null;

  const isPrivileged = role === "premium" || role === "admin";

  const guardAccess = (action: "download this" | "download all"): boolean => {
    if (!caps.allowDownload) {
      if (role === "guest") {
        openLogin("login");
        return false;
      }
      openUpgrade();
      return false;
    }

    if (action === "download all" && !isPrivileged) {
      openUpgrade();
      return false;
    }

    return true;
  };

  const downloadThis = async () => {
    if (!guardAccess("download this")) return;

    if (uploadedFile && activeVersion === "original") {
      saveAs(uploadedFile, `${baseName}_Original.wav`);
      return;
    }

    const currentUrl = getModeUrl(tab, result);
    if (!currentUrl) return;

    if (limitForVocalized) {
      const trimmed = await trimToWavBlob(currentUrl, limitForVocalized);
      saveAs(trimmed, `${baseName}_${tab}_preview.wav`);
    } else {
      const blob = await (await fetch(currentUrl)).blob();
      saveAs(blob, `${baseName}_${tab}.wav`);
    }
  };

  const downloadAll = async () => {
    if (!guardAccess("download all")) return;

    const entries = [
      result.standard_url && { url: result.standard_url, label: "Standard" },
      result.dynamic_url && { url: result.dynamic_url, label: "Dynamic" },
      result.smooth_url && { url: result.smooth_url, label: "Smooth" },
    ].filter(Boolean) as { url: string; label: Mode }[];

    if (!entries.length) return;

    const zip = new JSZip();
    for (const { url, label } of entries) {
      try {
        const fileBlob = caps.previewLimitSec
          ? await trimToWavBlob(url, caps.previewLimitSec)
          : await (await fetch(url)).blob();
        zip.file(
          `${baseName}_${label}${caps.previewLimitSec ? "_preview" : ""}.wav`,
          fileBlob
        );
      } catch (e) {
        console.error("Failed:", label, e);
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(
      content,
      `${baseName}_Vocalized_All${caps.previewLimitSec ? "_preview" : ""}.zip`
    );
  };

  return { downloadThis, downloadAll };
}
