"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { User } from "lucide-react";
import LoginForm from "./login-form";
import ForgotPasswordForm from "./forgot-password-form";
import { useLoginDialogStore } from "@/store/auth-dialog-store";

export default function LoginDialog({ isScrolled }: { isScrolled: boolean }) {
  const { isOpen, mode, open, close, setMode } = useLoginDialogStore();

  return (
    <>
      <Button
        onClick={() => open("login")}
        variant="ghost"
        className={`${
          isScrolled
            ? "font-montserrat bg-white text-[#3B82F6] border-2 border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white p-4"
            : "font-montserrat text-white border border-white hover:bg-[#3B82F6] hover:text-white p-4"
        } cursor-pointer`}
      >
        <User className="h-4 w-4" />
        Login
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(next) => {
          if (!next) close();
        }}
      >
        {mode === "login" ? (
          <DialogContent className="sm:max-w-[425px] h-auto bg-[#252525] border-none p-8 rounded-2xl">
            <LoginForm onForgot={() => setMode("forgot")} />
          </DialogContent>
        ) : (
          <DialogContent className="sm:max-w-[425px] h-auto bg-[#252525] border-none p-0 rounded-2xl">
            <ForgotPasswordForm onBackToLogin={() => setMode("login")} />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
