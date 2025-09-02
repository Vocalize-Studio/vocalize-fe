import { cookies } from "next/headers";
import { decodeJwt } from "jose";

export type SessionUser = {
  id: number;
  username: string;
  role?: string;
} | null;

export async function getSessionUser(): Promise<SessionUser> {
  const c = await cookies();
  const token = c.get("access_token")?.value || c.get("token")?.value;
  if (!token) return null;

  const claims = decodeJwt(token);

  return {
    id: Number((claims as any).user_id),
    username: String((claims as any).username),
    role: (claims as any).role as string | undefined,
  };
}
