"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UploadPayload } from "@/features/vocalizer/schema/vocalizer";
import { uploadDirect } from "../services/file-upload";

export function useUploadFile() {
  return useMutation({
    mutationKey: ["file-upload"],
    mutationFn: async (values: UploadPayload) => {
      const res = await uploadDirect(values);
      return res;
    },
    onError: (e: any) =>
      toast.error("Upload Failed", { description: e?.message ?? "Failed" }),
  });
}
