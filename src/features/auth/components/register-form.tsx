"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import googleIcon from "../../../../public/google-icon.svg";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // gunakan Loader2 sebagai spinner
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/auth";

interface RegisterFormProps {
  isScrolled: boolean;
}

export default function RegisterForm({ isScrolled }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    console.log("Submitting:", values);

    setTimeout(() => {
      setIsLoading(false);
      setIsDialogOpen(false);
      form.reset();
    }, 2000);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="w-full">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full ${
              isScrolled
                ? "font-montserrat bg-white text-[#3B82F6] border-2 border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white p-4"
                : "font-montserrat text-white border border-white hover:bg-[#3B82F6] hover:text-white p-4"
            } cursor-pointer`}
          >
            Register
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px] h-auto bg-[#252525] border-none p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#f4f4f4] text-center font-montserrat font-semibold text-4xl">
            Sign Up for FREE
          </DialogTitle>
          <DialogDescription className="text-center text-[#f4f4f4] font-montserrat font-normal text-sm mt-2">
            Already have an account?{" "}
            <span className="text-[#3B82F6] font-bold cursor-pointer">
              Log in
            </span>
          </DialogDescription>
        </DialogHeader>

        <Button
          type="button"
          variant="ghost"
          className="flex items-center justify-center hover:bg-white/80 bg-white rounded-full mt-1 w-full h-12 px-4 cursor-pointer"
        >
          <Image src={googleIcon} alt="google-icon" />
          <span className="font-montserrat text-sm text-[#929292] font-semibold -translate-x-1/6">
            Google
          </span>
        </Button>

        <p className="text-center text-[#929292] font-montserrat text-xs my-2">
          or sign up with email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#929292] text-xs font-montserrat">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter your name here"
                      className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4] placeholder:text-[#929292] text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#929292] text-xs font-montserrat">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
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
                    <FormLabel className="text-[#929292] text-xs font-montserrat">
                      Password (minimum 8 characters)
                    </FormLabel>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-[#929292] hover:text-[#f4f4f4] font-montserrat flex items-center gap-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
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

            <p className="text-[#929292] font-montserrat font-normal text-xs">
              By Signing up you agree to our{" "}
              <span className="text-white font-bold cursor-pointer">
                Terms of Service
              </span>
            </p>

            <DialogFooter className="mt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1B3A6F] hover:opacity-80 text-[#f4f4f4] font-montserrat font-bold text-sm tracking-wide flex items-center justify-center"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                ) : null}
                {isLoading ? "Processing..." : "CREATE MY FREE ACCOUNT"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
