import "server-only";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import type { JobResponse } from "@/features/vocalizer/schema/job";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = (await cookies()).get("token")?.value ?? "";
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await apiClient<JobResponse>(
    `/api/v1/ml/jobs/${id}/results`,
    "GET",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res)
    return NextResponse.json({ error: "Upstream failed" }, { status: 502 });
  return NextResponse.json(res, { status: 200 });
}
