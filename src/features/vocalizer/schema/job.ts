import { z } from "zod";

export const JobStatusSchema = z.enum(["queued", "completed", "failed"]);

export const JobResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    job_id: z.string(),
    status: JobStatusSchema,
    progress: z.number(),
    created_at: z.number(),
    updated_at: z.number(),
    completed_at: z.number().optional(),
    result_uri: z.string().url().optional(),
    metadata: z.object({
      detailed_status: z.string(),
      smooth_url: z.string().url().optional(),
      dynamic_url: z.string().url().optional(),
      standard_url: z.string().url().optional(),
    }),
    error_message: z.string().optional(),
  }),
  timestamp: z.number(),
});

export type JobStatus = z.infer<typeof JobStatusSchema>;
export type JobResponse = z.infer<typeof JobResponseSchema>;
