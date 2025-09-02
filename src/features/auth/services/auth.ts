"use server";

import { apiClient } from "@/lib/api-client";
import { LoginRequest, RegisterRequest } from "../schema/auth";
import { cookies } from "next/headers";

export async function login(payload: LoginRequest): Promise<{
  success: boolean;
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
}> {
  const res = await apiClient<any>("/api/v1/auth/login", "POST", {
    body: JSON.stringify(payload),
  });

  const { access_token, refresh_token, expires_in, user } = res.data;

  const cookieStore = await cookies();
  cookieStore.set("token", access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: expires_in ?? 60 * 60 * 24,
  });

  cookieStore.set("refresh_token", refresh_token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    success: res.success,
    message: res.message,
    user,
  };
}

export async function register(payload: RegisterRequest): Promise<any> {
  const res = await apiClient("/api/v1/auth/register", "POST", {
    body: JSON.stringify(payload),
  });
  return res;
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.set("token", "", { httpOnly: true, path: "/", maxAge: 0 });
  c.set("refresh_token", "", { httpOnly: true, path: "/", maxAge: 0 });
}
