import { apiClient } from "@/lib/api-client";

export type UploadPayload = {
  file: File;
  file_type: string;
};

export async function fileUpload({ file, file_type }: UploadPayload) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("file_type", file_type);

  return await apiClient("/api/v1/files/upload", "POST", { body: fd });
}
