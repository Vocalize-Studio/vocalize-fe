import { useMutation } from "@tanstack/react-query";
import { fileUpload } from "../services/vocalizer";
import { VocalizerRequest } from "../schema/vocalizer";

export function useUploadFile() {
  return useMutation({
    mutationKey: ["file-upload"],
    mutationFn: (payload: VocalizerRequest) => fileUpload(payload),
  });
}
