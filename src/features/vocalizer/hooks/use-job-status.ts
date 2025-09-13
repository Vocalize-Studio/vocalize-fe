import { useQuery } from "@tanstack/react-query";
import { getJobStatus } from "../services/job-service";

import type { JobResponse } from "../services/job-service";

export function useJobStatus(jobId: string | null) {
  return useQuery<JobResponse>({
    queryKey: ["ml-job", jobId],
    enabled: !!jobId,
    queryFn: () => getJobStatus(jobId!),
    refetchInterval: (query) =>
      query.state.data?.data.status === "completed" ? false : 3000,
  });
}
