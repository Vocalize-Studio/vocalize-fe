import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Email tidak valid")
      .min(1, "Email tidak boleh kosong"),
    otp: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 4, {
        message: "Kode OTP harus 4 digit",
      }),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password minimal 8 karakter",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Konfirmasi password minimal 8 karakter",
      }),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Password dan konfirmasi tidak cocok",
    path: ["confirmPassword"],
  });
