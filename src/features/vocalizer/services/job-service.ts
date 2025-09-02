import { apiClient } from "@/lib/api-client";

export type JobStatus = "queued" | "completed" | "failed";

export type JobResponse = {
  success: boolean;
  data: {
    job_id: string;
    status: JobStatus;
    progress?: number;
    result_uri?: string;
    metadata?: {
      standard_url?: string;
      smooth_url?: string;
      dynamic_url?: string;
    };
    error_message?: string;
    updated_at?: number;
  };
};

export async function getJobStatus(
  job_id: string | null
): Promise<JobResponse> {
  const res = await apiClient<JobResponse>(
    `/api/v1/jobs/${job_id}/status`,
    "GET"
  );
  console.log(res);
  if (!res) {
    throw new Error("Failed to fetch job status");
  }
  return res;
}
