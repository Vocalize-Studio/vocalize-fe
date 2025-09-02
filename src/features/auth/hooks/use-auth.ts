import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginRequest, RegisterRequest } from "../schema/auth";
import { login, logout, register } from "../services/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
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
  const router = useRouter();
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
    onSuccess: () => {
      toast.success("Registration successful", {
        description: "Your account has been created.",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error("Registration failed", {
        description: error.message || "An error occurred while registering.",
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful", {
        description: "You have been logged out.",
      });
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error("Logout failed", {
        description: error.message || "An error occurred during logout.",
      });
    },
  });
};
