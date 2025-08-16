import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "video/quicktime",
  "video/mp4",
  "audio/mp4",
];

const isYouTubeUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "youtu.be"
    );
  } catch {
    return false;
  }
};

const fileOrUrlSchema = z.union([
  z
    .instanceof(File)
    .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: "File must be WAV, MP3, MOV, MP4, or MP4A",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be 100MB or less",
    }),

  z
    .string()
    .url({ message: "Must be a valid URL" })
    .refine((url) => isYouTubeUrl(url), {
      message: "Must be a valid YouTube URL",
    }),
]);

export const vocalizerSchema = z.object({
  vocal: fileOrUrlSchema,
  instrumental: fileOrUrlSchema,
  reference: fileOrUrlSchema,
});

export type VocalizerRequest = z.infer<typeof vocalizerSchema>;
