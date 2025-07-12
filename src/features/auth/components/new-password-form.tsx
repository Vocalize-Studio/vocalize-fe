"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StepNewPasswordForm({ next }: { next: () => void }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { control, handleSubmit } = useFormContext();

  const onSubmit = () => {
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <DialogHeader className="mt-8">
        <div className="flex items-center justify-center">
          <svg
            width="77"
            height="42"
            viewBox="0 0 77 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 42V35H73.5V42H3.5ZM7.525 20.825L2.975 18.2L5.95 12.95H0V7.7H5.95L2.975 2.625L7.525 0L10.5 5.075L13.475 0L18.025 2.625L15.05 7.7H21V12.95H15.05L18.025 18.2L13.475 20.825L10.5 15.575L7.525 20.825ZM35.525 20.825L30.975 18.2L33.95 12.95H28V7.7H33.95L30.975 2.625L35.525 0L38.5 5.075L41.475 0L46.025 2.625L43.05 7.7H49V12.95H43.05L46.025 18.2L41.475 20.825L38.5 15.575L35.525 20.825ZM63.525 20.825L58.975 18.2L61.95 12.95H56V7.7H61.95L58.975 2.625L63.525 0L66.5 5.075L69.475 0L74.025 2.625L71.05 7.7H77V12.95H71.05L74.025 18.2L69.475 20.825L66.5 15.575L63.525 20.825Z"
              fill="url(#paint0_linear_140_1345)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_140_1345"
                x1="38.5"
                y1="0"
                x2="38.5"
                y2="42"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#234C90" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <DialogTitle className="text-[#f4f4f4] text-center font-semibold font-montserrat text-3xl mt-2">
          Set new password
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-[#f4f4f4] text-center mb-6">
        Must be at least 8 characters
      </p>

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel className="text-[#929292] text-xs">Password</FormLabel>
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
                placeholder="********"
                className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel className="text-[#929292] text-xs">
                Confirm Password
              </FormLabel>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="flex items-center gap-1 text-[#929292] hover:text-[#f4f4f4] text-xs"
              >
                {showConfirmPassword ? (
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="********"
                className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center justify-center mt-6">
        <Button
          type="submit"
          className="w-full h-12 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1B3A6F] hover:opacity-80 text-[#f4f4f4] font-montserrat font-bold text-sm tracking-wide uppercase cursor-pointer"
        >
          reset password
        </Button>
      </div>

      <p className="text-[#3B82F6] text-sm text-center cursor-pointer font-montserrat font-normal mt-10">
        Return to Log In
      </p>
      <p className="text-[#f4f4f4] text-sm text-center cursor-pointer">
        Don’t have an account yet?{" "}
        <span className="text-[#3B82F6]">Sign Up for Free</span>
      </p>
    </form>
  );
}
