import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginRequest, RegisterRequest } from "../schema/auth";
import { login, register } from "../services/auth";
import { loginAction } from "../actions/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => loginAction(payload),
    onSuccess: () => {
      toast.success("Login successful", {
        description: "Welcome back!",
      });
    },
    onError: (error: Error) => {
      toast.error("Login failed", {
        description: error.message || "An error occurred while logging in.",
      });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: () => {
      toast.success("Registration successful", {
        description: "Your account has been created.",
      });
    },
    onError: (error: Error) => {
      toast.error("Registration failed", {
        description: error.message || "An error occurred while registering.",
      });
    },
  });
};
