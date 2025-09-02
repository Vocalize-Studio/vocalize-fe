import { getSessionUser } from "@/lib/sessions";
import NavbarContainer from "./navbar-container";

export default async function Navbar() {
  const user = await getSessionUser();
  return <NavbarContainer user={user} />;
}
