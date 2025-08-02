import { Role } from "@/constants/roles";

export const isAdmin = (role: Role) => role === "admin";
export const isUser = (role: Role) => role === "user";

export const hasAccess = (role: Role, allowed: Role[]) =>
  allowed.includes(role);
