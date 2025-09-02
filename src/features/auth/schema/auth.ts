import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must be at least 4 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(["user", "admin"]).default("user").optional(),
});
export type RegisterRequest = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email cannot be empty"),
    otp: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 4, {
        message: "OTP code must be 4 digits",
      }),
    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Password must be at least 8 characters",
      }),
    confirmPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "Confirm password must be at least 8 characters",
      }),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Password and confirmation do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
