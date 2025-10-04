import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const BE_BASE = process.env.NEXT_API_URL?.replace(/\/$/, "");

function getRedirectUri(req: NextRequest): string {
  if (process.env.GOOGLE_REDIRECT_URI) {
    return process.env.GOOGLE_REDIRECT_URI;
  }

  const host = req.headers.get("host");
  const protocol =
    req.headers.get("x-forwarded-proto") ||
    (req.url.startsWith("https") ? "https" : "http");

  return `${protocol}://${host}/auth/google/callback`;
}

export async function GET(req: NextRequest) {
  if (!BE_BASE) {
    return new NextResponse("BACKEND_API_URL not set", { status: 500 });
  }

  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?auth=missing", req.url));
  }

  const redirectUri = getRedirectUri(req);

  console.log(`Using redirect URI: ${redirectUri}`);

  const url =
    `${BE_BASE}/api/v1/google/callback?` +
    `code=${encodeURIComponent(code)}` +
    `&state=${encodeURIComponent(state)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}`;

  const r = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const ct = r.headers.get("content-type") || "";
  const raw = await r.text();

  if (!r.ok) {
    console.error("BE /callback error:", r.status, raw);
    return NextResponse.redirect(new URL(`/?auth=failed#${r.status}`, req.url));
  }

  const payload = ct.includes("application/json") ? JSON.parse(raw) : {};
  const data = payload?.data || payload;
  const {
    access_token,
    refresh_token,
    expires_in = 15 * 60,
    return_to = "/",
  } = data;

  if (!access_token || !refresh_token) {
    return NextResponse.redirect(new URL("/?auth=failed#no-tokens", req.url));
  }

  const cookieStore = await cookies();

  cookieStore.set("token", access_token, {
    // httpOnly: true,
    // secure: true,
    path: "/",
    maxAge: expires_in ?? 60 * 60 * 24,
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.redirect(new URL(return_to, req.url));
}
