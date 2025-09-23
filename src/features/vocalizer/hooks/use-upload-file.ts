import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUploadFile() {
  return useMutation({
    mutationKey: ["file-upload"],
    mutationFn: async (fd: FormData) => {
      const r = await fetch("/api/files/upload", { method: "POST", body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error ?? "Upload failed");
      return j;
    },
    onError: (e: any) =>
      toast.error("Upload Failed", { description: e?.message ?? "Failed" }),
  });
}
