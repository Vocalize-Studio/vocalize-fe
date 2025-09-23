import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import type { Role } from "@/lib/role-access";

export type SessionUser = {
  id: number | null;
  username: string | null;
  role: Role;
};

export async function getSessionUser(): Promise<SessionUser> {
  const token =
    (await cookies()).get("access_token")?.value ||
    (await cookies()).get("token")?.value;
  if (!token) {
    return { id: null, username: null, role: "guest" };
  }

  const claims = decodeJwt(token);
  const rawRole = (claims as any).role as string | undefined;

  const valid: Role[] = ["user", "premium", "admin"];
  const role: Role =
    rawRole && valid.includes(rawRole as Role) ? (rawRole as Role) : "user";

  return {
    id: Number((claims as any).user_id ?? null),
    username: (claims as any).username ?? null,
    role,
  };
}
