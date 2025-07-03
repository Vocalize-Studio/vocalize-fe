import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024; 
const ACCEPTED_MIME_TYPES = ["audio/mpeg", "video/mp4"];

export const vocalizerSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: "File must be MP3 or MP4",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File size must be 50MB or less",
    }),
  instrumental: z.string().url({ message: "Must be a valid URL" }),
  reference: z.string().url({ message: "Must be a valid URL" }),
});
