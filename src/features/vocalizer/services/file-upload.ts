"use server";

import { apiClient } from "@/lib/api-client";
import { UploadPayload, VocalizerRequest } from "../schema/vocalizer";
import { cookies } from "next/headers";

function appendFormData(fd: FormData, key: string, val: unknown) {
  if (val instanceof File) fd.append(key, val);
  else if (val !== undefined && val !== null) fd.append(key, String(val));
}

export async function fileUpload(values: UploadPayload) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";

  const fd = new FormData();

  if (values.user_id === undefined || values.user_id === null) {
    throw new Error("Missing user_id");
  }

  const userId = Number(values.user_id);
  if (Number.isNaN(userId)) {
    throw new Error("Invalid user_id: must be a number");
  }

  (Object.keys(values) as (keyof VocalizerRequest)[]).forEach((k) =>
    appendFormData(fd, k as string, values[k])
  );

  if (!fd.has("user_id")) fd.append("user_id", String(userId));

  fd.append("auto_start_ml_job", "true");

  return apiClient<any>("/api/v1/files/upload", "POST", {
    body: fd,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User-ID": userId.toString(),
    },
  });
}
