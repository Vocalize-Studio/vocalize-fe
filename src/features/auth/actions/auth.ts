"use server";

import { cookies } from "next/headers";
import { login } from "../services/auth";
import { loginSchema } from "../schema/auth";
import { z } from "zod";

export async function loginAction(payload: z.infer<typeof loginSchema>) {
  const res = await login(payload);

  const { access_token, expires_in, user } = res.data;

  const cookieStore = await cookies();

  cookieStore.set("token", access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: expires_in ?? 60 * 60 * 24,
  });

  return {
    success: res.success,
    message: res.message,
    username: user.username,
  };
}
