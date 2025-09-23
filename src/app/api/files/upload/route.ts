import "server-only";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const form = await req.formData();

    const vocal = form.get("vocal_audio");
    if (
      vocal instanceof File &&
      (vocal.type === "" || vocal.type === "video/mp4")
    ) {
    }

    form.set("auto_start_ml_job", "true");

    const upstream = await fetch(
      `${process.env.NEXT_API_URL}/api/v1/files/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-User-ID": String(form.get("user_id") ?? ""),
        },
        body: form,
      }
    );

    console.log(upstream);

    const text = await upstream.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {}
    if (!upstream.ok) {
      return NextResponse.json(
        { error: data?.error ?? upstream.statusText },
        { status: upstream.status }
      );
    }
    return NextResponse.json(data ?? {}, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Internal error" },
      { status: 500 }
    );
  }
}
