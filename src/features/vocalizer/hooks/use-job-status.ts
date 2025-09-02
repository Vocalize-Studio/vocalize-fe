import { useQuery } from "@tanstack/react-query";
import { getJobStatus } from "../services/job-service";

export function useJobStatus(jobId: string | null) {
  return useQuery({
    queryKey: ["ml-job", jobId],
    enabled: !!jobId,
    queryFn: () => getJobStatus(jobId),
    refetchInterval: (query) => {
      const status = query.state.data?.data.status;
      if (status === "completed" || status === "failed") return false;
      return 1500;
    },
  });
}
