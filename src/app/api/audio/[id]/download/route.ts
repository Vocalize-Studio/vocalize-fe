import { getCaps } from "@/lib/role-access";
import { getSessionUser } from "@/lib/sessions";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await getSessionUser();
  const caps = getCaps(user?.role);

  if (!params.id) {
    return new Response("Missing audio id", { status: 400 });
  }

  if (!caps.allowDownload) {
    return new Response("Forbidden", { status: 403 });
  }

  return new Response("ok");
}
