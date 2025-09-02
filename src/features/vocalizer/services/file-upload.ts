"use server";

import { apiClient } from "@/lib/api-client";
import { UploadPayload, VocalizerRequest } from "../schema/vocalizer";
import { cookies } from "next/headers";

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

  (Object.keys(values) as (keyof VocalizerRequest)[]).forEach((key) => {
    const val = values[key];
    if (val instanceof File) {
      fd.append(key, val);
    } else if (typeof val === "string") {
      fd.append(key, val);
    }
  });

  fd.append("auto_start_ml_job", "true");

  return apiClient<any>("/api/v1/files/upload", "POST", {
    body: fd,
    headers: {
      Authorization: `Bearer ${token}`,
      "X-User-ID": userId.toString(),
    },
  });
}
