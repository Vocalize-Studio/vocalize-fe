"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import googleIcon from "../../../../public/google-icon.svg";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginRequest, loginSchema } from "../schema/auth";
import { useLogin } from "../hooks/use-auth";
import {
  useLoginDialogStore,
  useRegisterDialogStore,
} from "@/store/auth-dialog-store";

interface LoginFormProps {
  onForgot: () => void;
}

export default function LoginForm({ onForgot }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate: login, isPending } = useLogin();

  const { close } = useLoginDialogStore();
  const { open: openRegister } = useRegisterDialogStore();

  const onSubmit = (values: LoginRequest) => {
    login(values);
    form.reset();
    close();
  };

  const handleDialog = () => {
    close();
    openRegister();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <DialogHeader>
          <DialogTitle className="text-[#f4f4f4] text-center font-montserrat font-semibold text-3xl">
            Welcome Back!
          </DialogTitle>
          <DialogDescription className="text-center text-[#f4f4f4] font-montserrat text-sm mt-1">
            Don’t have an account yet?{" "}
            <span
              onClick={handleDialog}
              className="text-[#3B82F6] font-bold cursor-pointer"
            >
              Sign Up Free
            </span>
          </DialogDescription>
        </DialogHeader>

        <Button
          type="button"
          variant="ghost"
          className="flex items-center justify-center hover:bg-white/80 bg-white rounded-full w-full h-12 px-4"
          onClick={async () => {
            try {
              const res = await fetch("/api/google");
              const data = await res.json();

              if (data?.success && data?.data?.auth_url) {
                window.location.href = data.data.auth_url;
              } else {
                console.error("Invalid payload:", data);
              }
            } catch (err) {
              console.error("Error fetching Google OAuth URL:", err);
            }
          }}
        >
          <Image src={googleIcon} alt="google-icon" />
          <span className="font-montserrat text-sm text-[#929292] font-semibold -translate-x-1/6 cursor-pointer">
            Google
          </span>
        </Button>

        <p className="text-center text-[#929292] font-montserrat text-xs">
          or continue with
        </p>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#929292] text-xs">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="yourname@gmail.com"
                  className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4] placeholder:text-[#929292] text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-[#929292] text-xs">
                  Password (min 8 characters)
                </FormLabel>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-1 text-[#929292] hover:text-[#f4f4f4] text-xs"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span>{showPassword ? "Hide" : "Show"}</span>
                </button>
              </div>
              <FormControl>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4] placeholder:text-[#929292] text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p
          className="text-[#3B82F6] text-sm text-center mt-1 cursor-pointer"
          onClick={onForgot}
        >
          Forgot your Password?
        </p>

        <DialogFooter className="mt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 uppercase rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1B3A6F] hover:opacity-80 text-[#f4f4f4] font-montserrat font-bold text-sm tracking-wide"
          >
            {isPending ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : null}
            {isPending ? "Processing..." : "LOG IN TO MY ACCOUNT"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
