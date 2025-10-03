import { useQuery } from "@tanstack/react-query";
import { getJobStatus } from "../services/get-job-status";
import { JobResponse } from "../schema/job";

export function useJobStatus(jobId: string | null) {
  return useQuery<JobResponse>({
    queryKey: ["ml-job", jobId],
    enabled: !!jobId,
    queryFn: () => getJobStatus(jobId!),
    refetchInterval: (query) =>
      query.state.data?.data.status === "completed" ? false : 3000,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
