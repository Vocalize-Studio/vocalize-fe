"use client";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import goalLogo from "../../../../public/goal.svg";

export default function StepDoneForm() {
  return (
    <div className="space-y-4">
      <DialogHeader className="mt-10">
        <DialogTitle className="text-[#f4f4f4] text-center font-semibold font-montserrat text-3xl mt-2">
          All Done!
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-[#f4f4f4] text-center mb-6">
        Your Password has been reset.
      </p>
      <div className="flex items-center justify-center">
        <Image src={goalLogo} alt="goal" />
      </div>
      <div className="flex items-center justify-center mt-6">
        <DialogClose asChild>
          <Button
            type="button"
            className="w-full h-12 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1B3A6F] hover:opacity-80 text-[#f4f4f4] font-montserrat font-bold text-sm tracking-wide uppercase cursor-pointer"
          >
            homepage
          </Button>
        </DialogClose>
      </div>

      <p className="text-[#3B82F6] text-sm text-center cursor-pointer font-montserrat font-normal mt-8">
        Return to Log In
      </p>
      <p className="text-[#f4f4f4] text-sm text-center cursor-pointer">
        Don’t have an account yet?{" "}
        <span className="text-[#3B82F6]">Sign Up for Free</span>
      </p>
    </div>
  );
}
