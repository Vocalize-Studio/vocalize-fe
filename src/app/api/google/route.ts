// src/app/api/google/route.ts
export const runtime = "nodejs";

export async function GET() {
  const base = process.env.BACKEND_API_URL?.replace(/\/$/, "");
  if (!base) return new Response("BACKEND_API_URL not set", { status: 500 });

  const r = await fetch(
    `${base}/api/v1/auth/google/url?ngrok-skip-browser-warning=true`,
    {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  const ct = r.headers.get("content-type") || "";
  const rawText = await r.text();

  let json: any = {};
  try {
    json =
      ct.includes("application/json") && rawText ? JSON.parse(rawText) : {};
  } catch {}

  const auth_url =
    json?.data?.auth_url ??
    json?.auth_url ??
    (typeof json === "string" ? json : undefined);

  if (!r.ok || !auth_url) {
    return Response.json(
      {
        success: false,
        message: "No auth_url from backend",
        status: r.status,
        raw: rawText,
        json,
      },
      { status: r.status || 500 }
    );
  }

  return Response.json({ success: true, data: { auth_url } });
}
