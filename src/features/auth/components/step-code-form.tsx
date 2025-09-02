"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function StepCodeForm({
  next,
  onBackToLogin,
}: {
  next: () => void;
  onBackToLogin: () => void;
}) {
  const { control, handleSubmit, setValue, getValues } = useFormContext();

  const onSubmit = () => {
    next();
  };

  const email = getValues("email");

  const inputRefs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;
    const currentOtp = getValues("otp").split("");
    currentOtp[index] = value;
    const newOtp = currentOtp.join("");
    setValue("otp", newOtp);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !getValues("otp")[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-2 flex-col items-center justify-center px-5"
    >
      <div className="mx-auto w-full max-w-[420px]">
        <DialogHeader className="mt-8">
          <div className="flex items-center justify-center">
            <svg
              width="79"
              height="78"
              viewBox="0 0 79 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.6 31.2V18.2C15.6 15.8099 16.0708 13.4433 16.9854 11.2352C17.9 9.02704 19.2406 7.02068 20.9307 5.33066C22.6207 3.64063 24.627 2.30003 26.8352 1.38539C29.0433 0.470757 31.4099 0 33.8 0C36.1901 0 38.5567 0.470757 40.7648 1.38539C42.973 2.30003 44.9793 3.64063 46.6693 5.33066C48.3594 7.02068 49.7 9.02704 50.6146 11.2352C51.5292 13.4433 52 15.8099 52 18.2V31.2H59.8C61.8687 31.2 63.8526 32.0218 65.3154 33.4846C66.7782 34.9473 67.6 36.9313 67.6 39V41.86C70.5387 42.4567 73.1808 44.0511 75.0786 46.3729C76.9763 48.6948 78.013 51.6013 78.013 54.6C78.013 57.5987 76.9763 60.5052 75.0786 62.8271C73.1808 65.1489 70.5387 66.7433 67.6 67.34V70.2C67.6 72.2687 66.7782 74.2527 65.3154 75.7154C63.8526 77.1782 61.8687 78 59.8 78H7.8C5.73131 78 3.74735 77.1782 2.28457 75.7154C0.821783 74.2527 0 72.2687 0 70.2L0 39C0 36.9313 0.821783 34.9473 2.28457 33.4846C3.74735 32.0218 5.73131 31.2 7.8 31.2H15.6ZM20.8 18.2C20.8 14.7522 22.1696 11.4456 24.6076 9.00761C27.0456 6.56964 30.3522 5.2 33.8 5.2C37.2478 5.2 40.5544 6.56964 42.9924 9.00761C45.4304 11.4456 46.8 14.7522 46.8 18.2V31.2H20.8V18.2ZM44.2 46.8C42.1313 46.8 40.1473 47.6218 38.6846 49.0846C37.2218 50.5474 36.4 52.5313 36.4 54.6C36.4 56.6687 37.2218 58.6527 38.6846 60.1154C40.1473 61.5782 42.1313 62.4 44.2 62.4H65C67.0687 62.4 69.0526 61.5782 70.5154 60.1154C71.9782 58.6527 72.8 56.6687 72.8 54.6C72.8 52.5313 71.9782 50.5474 70.5154 49.0846C69.0526 47.6218 67.0687 46.8 65 46.8H44.2Z"
                fill="url(#paint0_linear_140_1277)"
              />
              <path
                d="M57.7377 57.2H52.5377V52H57.7377V57.2ZM42.1377 57.2H47.3377V52H42.1377V57.2ZM68.1377 57.2H62.9377V52H68.1377V57.2Z"
                fill="#3B82F6"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_140_1277"
                  x1="39.0065"
                  y1="0"
                  x2="39.0065"
                  y2="78"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#1B3A6F" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <DialogTitle className="text-[#f4f4f4] text-center font-semibold font-montserrat text-3xl mt-2">
            Password Reset
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[#f4f4f4] text-center mb-6">
          we sent a code to <span className="font-semibold">{email}</span>
        </p>

        <FormField
          control={control}
          name="otp"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex gap-7 items-center justify-center">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Input
                      key={index}
                      maxLength={1}
                      ref={inputRefs[index]}
                      onChange={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-14 md:w-16 md:h-18 text-center text-xl border border-[#999] bg-transparent text-white focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-md"
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage className="text-center" />
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
        <p className="text-[#f4f4f4] text-xs md:text-sm text-center cursor-pointer mt-2">
          Don’t have an account yet?{" "}
          <span className="text-[#3B82F6]">Sign Up for Free</span>
        </p>
      </div>
    </form>
  );
}
