import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "@/lib/api-client";
import { JobResponse } from "@/features/vocalizer/schema/job";
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const token = (await cookies()).get("token")?.value ?? "";
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const res = await apiClient<JobResponse>(
    `/api/v1/ml/jobs/${params.id}/results`,
    "GET",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return NextResponse.json(res?.data, { status: 200 });
}
