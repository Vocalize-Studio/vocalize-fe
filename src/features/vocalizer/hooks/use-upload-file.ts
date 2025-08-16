import { useMutation } from "@tanstack/react-query";
import { fileUpload, UploadPayload } from "../services/vocalizer";

export function useUploadFile() {
  return useMutation({
    mutationKey: ["file-upload"],
    mutationFn: (payload: UploadPayload) => fileUpload(payload),
  });
}
