"use server";

import { apiClient } from "@/lib/api-client";
import { LoginRequest, RegisterRequest } from "../schema/auth";

export async function login(payload: LoginRequest): Promise<any> {
  const res = await apiClient("/api/v1/auth/login", "POST", {
    body: JSON.stringify(payload),
  });
  return res;
}

export async function register(payload: RegisterRequest): Promise<any> {
  const res = await apiClient("/api/v1/auth/register", "POST", {
    body: JSON.stringify(payload),
  });
  return res;
}
