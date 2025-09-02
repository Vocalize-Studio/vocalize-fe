import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const BE_BASE = process.env.BACKEND_API_URL?.replace(/\/$/, "");

export async function GET(req: NextRequest) {
  if (!BE_BASE)
    return new NextResponse("BACKEND_API_URL not set", { status: 500 });

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?auth=missing", req.url));
  }

  const r = await fetch(
    `${BE_BASE}/api/v1/auth/google/callback?code=${encodeURIComponent(
      code
    )}&state=${encodeURIComponent(state)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );

  if (!r.ok) {
    return NextResponse.redirect(new URL("/?auth=failed", req.url));
  }

  const payload = (await r.json().catch(() => ({}))) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    return_to?: string;
  };

  const access = payload.access_token;
  const refresh = payload.refresh_token;
  const exp = Math.max(1, Math.floor(payload.expires_in ?? 15 * 60));

  const jar = await cookies();
  jar.set("access_token", access ?? "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: exp,
  });
  jar.set("refresh_token", refresh ?? "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  const dest = payload.return_to || "/";
  return NextResponse.redirect(new URL(dest, req.url));
}
