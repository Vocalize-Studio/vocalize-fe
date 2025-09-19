export const VOCALIZER_TABS = ["Standard", "Dynamic", "Smooth"] as const;
export type Mode = (typeof VOCALIZER_TABS)[number];

export type Version = "original" | "vocalized";

export type ResultUrls = {
  standard_url?: string | null;
  dynamic_url?: string | null;
  smooth_url?: string | null;
};

export const modeToKey: Record<Mode, keyof ResultUrls> = {
  Standard: "standard_url",
  Dynamic: "dynamic_url",
  Smooth: "smooth_url",
};

export function getModeUrl(mode: Mode, r: ResultUrls): string | undefined {
  switch (mode) {
    case "Standard":
      return r.standard_url ?? undefined;
    case "Dynamic":
      return r.dynamic_url ?? undefined;
    case "Smooth":
      return r.smooth_url ?? undefined;
  }
}
