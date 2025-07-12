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

export const tracks = [
  {
    id: 0,
    title: "Like Jennie",
    image:
      "/like-jennie.webp",
    videoOriginal: "/audio/jennie-like-jennie.mp4",
    videoVocalized: "/audio/jennie-like-jennie.mp4",
  },
  {
    id: 1,
    title: "Yung Kai Blue",
    image:
      "yungkai-blue.jpg",
    videoOriginal: "/audio/yung-kai-blue.mp4",
    videoVocalized: "/audio/yung-kai-blue.mp4",
  },
  {
    id: 2,
    title: "WildFlower",
    image:
      "/billie-eilish-wildflower.png",
    videoOriginal: "/audio/billie-eilish-wildflower.mp4",
    videoVocalized: "/audio/billie-eilish-wildflower.mp4",
  },
  {
    id: 3,
    title: "Locked Out of Heaven",
    image: "/bruno-mars-album.svg",
    videoOriginal: "/audio/bruno-mars-locked-out-of-heaven.mp4",
    videoVocalized: "/audio/bruno-mars-locked-out-of-heaven.mp4",
  },
];
