import { z } from "zod";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_MIME_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "video/quicktime",
  "video/mp4",
  "audio/mp4",
];

const fileSchema = z
  .custom<File>((v) => v instanceof File, { message: "Please upload a file" })
  .refine((f) => ACCEPTED_MIME_TYPES.includes(f.type), {
    message: "File must be WAV, MP3, MOV, MP4, or MP4A",
  })
  .refine((f) => f.size <= MAX_FILE_SIZE, {
    message: "File size must be 100MB or less",
  });

const youtubeUrlSchema = z
  .string()
  .url({ message: "Must be a valid URL" })
  .refine(
    (url) => {
      try {
        const u = new URL(url);
        return (
          u.hostname === "www.youtube.com" ||
          u.hostname === "youtube.com" ||
          u.hostname === "youtu.be"
        );
      } catch {
        return false;
      }
    },
    { message: "Must be a valid YouTube URL" }
  );

const trackSourceSchema = z.union([fileSchema, youtubeUrlSchema]);

export const vocalizerSchema = z.object({
  vocal_audio: fileSchema,
  instrumental_audio: trackSourceSchema,
  reference_audio: trackSourceSchema,
});

export type VocalizerRequest = z.infer<typeof vocalizerSchema>;

export type UploadPayload = VocalizerRequest & { user_id: string | number };
