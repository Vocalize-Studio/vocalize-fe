"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User } from "lucide-react";
import LoginForm from "./login-form";
import ForgotPasswordForm from "./forgot-password-form";

interface LoginDialogProps {
  isScrolled: boolean;
}

export default function LoginDialog({ isScrolled }: LoginDialogProps) {
  const [mode, setMode] = useState<"login" | "forgot">("login");

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setMode("login");
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`${
            isScrolled
              ? "font-montserrat bg-white text-[#3B82F6] border-2 border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white p-4"
              : "font-montserrat text-white border border-white hover:bg-[#3B82F6] hover:text-white p-4"
          } cursor-pointer`}
        >
          <User className="mr-1.5 h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-auto bg-[#252525] border-none p-8 rounded-2xl">
        {mode === "login" ? (
          <LoginForm onForgot={() => setMode("forgot")} />
        ) : (
          <ForgotPasswordForm onBackToLogin={() => setMode("login")} />
        )}
      </DialogContent>
    </Dialog>
  );
}
