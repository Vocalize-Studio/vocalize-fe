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
import { Button } from "@/components/ui/button";
import {
  useLoginDialogStore,
  useRegisterDialogStore,
} from "@/store/auth-dialog-store";

export default function StepEmailForm({
  next,
  onBackToLogin,
}: {
  next: () => void;
  onBackToLogin: () => void;
}) {
  const { control, handleSubmit } = useFormContext();

  const onSubmit = (data: any) => {
    next();
  };

  const { open: openRegister } = useRegisterDialogStore();
  const { close: closeLogin } = useLoginDialogStore();

  const handleGoToRegister = () => {
    closeLogin();
    openRegister();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 flex-col items-center justify-center px-5"
      >
        <div className="mx-auto w-full max-w-[420px]">
          <DialogHeader className="mt-8">
            <div className="flex items-center justify-center">
              <svg
                width="65"
                height="85"
                viewBox="0 0 65 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.381 0C27.0135 0 21.8658 2.13222 18.0705 5.9276C14.2751 9.72298 12.1429 14.8706 12.1429 20.2381V28.3333H8.09524C5.94825 28.3333 3.88919 29.1862 2.37104 30.7044C0.852888 32.2225 0 34.2816 0 36.4286V76.9048C0 79.0518 0.852888 81.1108 2.37104 82.629C3.88919 84.1471 5.94825 85 8.09524 85H56.6667C58.8137 85 60.8727 84.1471 62.3909 82.629C63.909 81.1108 64.7619 79.0518 64.7619 76.9048V36.4286C64.7619 34.2816 63.909 32.2225 62.3909 30.7044C60.8727 29.1862 58.8137 28.3333 56.6667 28.3333H52.619V20.2381C52.619 17.5804 52.0956 14.9487 51.0785 12.4933C50.0615 10.0379 48.5707 7.80688 46.6915 5.9276C44.8122 4.04832 42.5811 2.55759 40.1257 1.54053C37.6703 0.523474 35.0387 0 32.381 0ZM32.381 7.69048C39.3024 7.69048 44.9286 13.3167 44.9286 20.2381V28.3333H19.8333V20.2381C19.8333 13.3167 25.4595 7.69048 32.381 7.69048ZM33.15 38.4524C36.9548 38.4524 39.9905 39.3024 42.1762 40.9619C44.3619 42.6619 45.4548 44.9286 45.4548 47.7619C45.4548 49.5429 44.8476 51.1214 43.6738 52.619C42.5 54.0762 40.9619 55.2095 39.1 56.0595C38.0476 56.6667 37.3595 57.2738 36.9952 57.9619C36.631 58.6905 36.4286 59.581 36.4286 60.7143H28.3333C28.3333 58.6905 28.7381 57.3143 29.5071 56.3429C30.3571 55.3714 31.7333 54.2381 33.8381 52.9429C34.8905 52.3762 35.7405 51.6476 36.4286 50.7571C36.9952 49.9071 37.319 48.8952 37.319 47.7619C37.319 46.5476 36.9548 45.6571 36.2262 44.969C35.4976 44.2405 34.4048 43.9167 33.15 43.9167C32.0571 43.9167 31.1667 44.2 30.3571 44.7667C29.7095 45.3333 29.3048 46.1833 29.3048 47.3167H21.331C21.1286 44.5238 22.2619 42.0952 24.4881 40.6381C26.6738 39.181 29.5476 38.4524 33.15 38.4524ZM28.3333 64.7619H36.4286V72.8571H28.3333V64.7619Z"
                  fill="url(#paint0_linear_140_1226)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_140_1226"
                    x1="32.381"
                    y1="0"
                    x2="32.381"
                    y2="85"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#1B3A6F" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <DialogTitle className="text-[#f4f4f4] text-center font-semibold font-montserrat text-2xl md:text-3xl mt-2">
              Forgot Password?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-[#f4f4f4] text-center mb-6">
            No worries, we’ll send you reset instructions
          </p>

          <FormField
            control={control}
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
                    className="bg-[#333] border-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] text-[#f4f4f4] placeholder:text-[#929292] text-sm rounded-sm"
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

          <p
            onClick={onBackToLogin}
            className="text-[#3B82F6] text-sm text-center cursor-pointer font-montserrat font-normal mt-6"
          >
            Return to Log In
          </p>
          <p
            onClick={handleGoToRegister}
            className="text-[#f4f4f4] text-xs md:text-sm text-center cursor-pointer mt-2"
          >
            Don’t have an account yet?{" "}
            <span className="text-[#3B82F6]">Sign Up for Free</span>
          </p>
        </div>
      </form>
    </>
  );
}
