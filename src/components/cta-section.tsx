"use client";

import React from "react";
import { Button } from "./ui/button";
import { useLoginDialogStore } from "@/store/auth-dialog-store";
import { useRouter } from "next/navigation";

export function CtaSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { open } = useLoginDialogStore();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="w-full rounded-3xl bg-gradient-to-b from-[#3B82F6] to-[#1B3A6F] p-8 md:p-12 text-center text-white cta-card-shadow">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-10 font-montserrat">
          Experience AI Vocalizer for yourself
        </h2>

        <p className="xs:text-lg sm:text-xl lg:text-2xl my-4 opacity-90 max-w-4xl mx-auto font-normal font-montserrat leading-normal">
          Master and preview unlimited tracks for free and{" "}
          <span className="font-bold">
            only pay when you're ready to download.
          </span>{" "}
          Get started today!
        </p>

        <Button
          onClick={() => {
            if (isLoggedIn) {
              router.push("/");
            } else {
              open("login");
            }
          }}
          size="lg"
          className="bg-white hover:bg-gray-100 md:mt-12 px-10 py-6 md:px-12 md:py-8 font-montserrat rounded-full font-semibold text-xl md:text-3xl cursor-pointer uppercase max-w-5xl mx-auto"
        >
          <span className="bg-gradient-to-r from-blue-500 to-[#00025E] bg-clip-text text-transparent">
            {isLoggedIn ? "VOCALIZE" : "SIGN UP FREE"}
          </span>
        </Button>
      </div>
    </div>
  );
}
