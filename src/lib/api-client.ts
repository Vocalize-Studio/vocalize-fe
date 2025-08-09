import { cookies } from "next/headers";

export const apiClient = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT",
  options: RequestInit = {}
): Promise<T | null> => {
  const isFormData = options.body instanceof FormData;

  const baseUrl = process.env.NEXT_API_URL;
  if (!baseUrl) throw new Error("NEXT_API_URL is not defined");

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const config: RequestInit = {
    method,
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();

  if (!response.ok) {
    let message = text;
    if (contentType.includes("application/json")) {
      try {
        const json = JSON.parse(text);
        message = json?.message || JSON.stringify(json);
      } catch {
        message = "Gagal mem-parsing error JSON dari server.";
      }
    }
    console.error("API Error:", {
      endpoint,
      method,
      message,
      status: response.status,
    });
    throw new Error(message);
  }

  if (!text || text.trim() === "") return null;

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error("Gagal mem-parsing JSON.");
    }
  }

  return text as unknown as T;
};
