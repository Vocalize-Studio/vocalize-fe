import { apiClient } from "@/lib/api-client";
import { VocalizerRequest } from "../schema/vocalizer";

export async function fileUpload(values: VocalizerRequest) {
  const fd = new FormData();

  (Object.keys(values) as (keyof VocalizerRequest)[]).forEach((key) => {
    const val = values[key];
    if (val instanceof File) {
      fd.append(key, val);
    } else if (typeof val === "string") {
      fd.append(key, val);
    }
  });

  fd.append("auto_start_ml_job", "true");

  return await apiClient("/api/v1/files/upload", "POST", { body: fd });
}
