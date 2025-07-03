export interface Feature {
  title: string;
  content: string;
  subcontent?: string;
}

export const vocalizerFeatures: Feature[] = [
  {
    title: "Support",
    content: "WAV, MP3, Youtube Link",
    subcontent: "formats",
  },
  {
    title: "Under",
    content: "100 MB, 5 mins",
    subcontent: "audio file",
  },
  {
    title: "Recommendation",
    content:
      "For best results, please use uncompressed, high-quality audio files.",
  },
];
