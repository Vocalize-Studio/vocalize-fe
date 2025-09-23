"use client";
import { useState, useMemo } from "react";
import { useAudioCore } from "./use-audio-core";

export type Mode = "Standard" | "Dynamic" | "Smooth";

export type ResultUrls = {
  standard_url?: string | null;
  dynamic_url?: string | null;
  smooth_url?: string | null;
};

export function useAudioComparisonPreview(
  uploadedFile: File | null,
  result: ResultUrls
) {
  const core = useAudioCore();
  const [tab, setTab] = useState<Mode>("Standard");
  const [activeVersion, setActiveVersion] = useState<"original" | "vocalized">(
    "original"
  );

  const vocalizedUrl = useMemo(() => {
    if (tab === "Standard") return result.standard_url ?? undefined;
    if (tab === "Dynamic") return result.dynamic_url ?? undefined;
    return result.smooth_url ?? undefined;
  }, [tab, result]);

  const switchTab = (m: Mode) => {
    setTab(m);
  };

  const switchVersion = (v: "original" | "vocalized") => {
    setActiveVersion(v);
  };

  const currentUrl = activeVersion === "original" ? undefined : vocalizedUrl;

  return {
    ...core,
    tab,
    onChangeTab: switchTab,
    activeVersion,
    setActiveVersion: switchVersion,
    currentUrl,
  };
}
