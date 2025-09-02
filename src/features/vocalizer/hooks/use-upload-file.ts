import { useMutation } from "@tanstack/react-query";
import { fileUpload } from "../services/file-upload";
import type { UploadPayload } from "../schema/vocalizer";
import { toast } from "sonner";

export function useUploadFile() {
  return useMutation({
    mutationKey: ["file-upload"],
    mutationFn: (payload: UploadPayload) => fileUpload(payload),
    onError: (error: Error) => {
      toast.error("Upload Failed", {
        description: error.message || "Failed",
      });
    },
  });
}
