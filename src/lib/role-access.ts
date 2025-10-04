export type Role = "guest" | "user" | "premium" | "admin";

export type Capabilities = {
  previewLimitSec: number | null;
  allowDownload: boolean;
  allowedTabs: Array<"Standard" | "Dynamic" | "Smooth">;
};

export function getCaps(role: Role): Capabilities {
  switch (role) {
    case "admin":
    case "premium":
      return {
        previewLimitSec: null,
        allowDownload: true,
        allowedTabs: ["Standard", "Dynamic", "Smooth"],
      };
    case "user":
      return {
        previewLimitSec: 20,
        allowDownload: true,
        allowedTabs: ["Standard"],
      };
    default:
      return {
        previewLimitSec: 30,
        allowDownload: false,
        allowedTabs: ["Standard"],
      };
  }
}
