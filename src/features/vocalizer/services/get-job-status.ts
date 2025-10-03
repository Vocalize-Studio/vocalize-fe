"use server";

import { apiClient } from "@/lib/api-client";
import { cookies } from "next/headers";
import { JobResponse } from "../schema/job";

export async function getJobStatus(
  job_id: string | null
): Promise<JobResponse> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const res = await apiClient<JobResponse>(
    `/api/v1/files/outputs/${job_id}`,
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
