// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";

// const BE_BASE = process.env.BACKEND_API_URL?.replace(/\/$/, "");

// export async function GET(req: NextRequest) {
//   if (!BE_BASE)
//     return new NextResponse("BACKEND_API_URL not set", { status: 500 });

//   try {
//     const { code, state } = await req.json();
//     if (!code || !state) {
//       return NextResponse.json(
//         { error: "code/state required" },
//         { status: 400 }
//       );
//     }
//     const r = await fetch(
//       `${BE_BASE}/api/v1/auth/google/callback?code=${encodeURIComponent(
//         code
//       )}&state=${encodeURIComponent(state)}`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     const payload = await r.json().catch(() => ({}));

//     if (!r.ok) {
//       return NextResponse.json(
//         { ok: false, detail: payload?.message || "BE exchange failed" },
//         { status: r.status }
//       );
//     }

//     const {
//       access_token,
//       refresh_token,
//       expires_in = 15 * 60,
//       user,
//       return_to = "/",
//     } = payload || {};

//     const res = NextResponse.json({ ok: true, user, return_to });

//     res.cookies.set("access_token", access_token, {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: Math.max(1, Math.floor(expires_in)),
//     });
//     res.cookies.set("refresh_token", refresh_token, {
//       httpOnly: true,
//       sameSite: "lax",
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30,
//     });

//     return res;
//   } catch (e: any) {
//     return NextResponse.json({ ok: false, detail: String(e) }, { status: 500 });
//   }
// }
