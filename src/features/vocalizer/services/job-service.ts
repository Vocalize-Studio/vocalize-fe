"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";

export type JobStatus = "completed" | "queued" | "failed";

export type JobResponse = {
  success: boolean;
  message: string;
  data: {
    job_id: string;
    status: JobStatus;
    progress: number;
    created_at: number;
    updated_at: number;
    completed_at?: number;
    result_uri?: string;
    metadata: {
      smooth_url?: string;
      dynamic_url?: string;
      standard_url?: string;
    };
    error_message?: string;
  };
  timestamp: number;
};

export async function getJobStatus(
  job_id: string | null
): Promise<JobResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const res = await apiClient<JobResponse>(
    `/api/v1/ml/jobs/${job_id}/results`,
    "GET",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res) throw new Error("Failed to fetch job status");
  return res;
}
