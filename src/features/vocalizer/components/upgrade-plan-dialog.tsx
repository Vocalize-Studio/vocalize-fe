"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UpgradePlanDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-full sm:max-w-4xl border-0 bg-[#2A2A2A] text-white rounded-xl p-0 overflow-hidden">
        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_420px] gap-0">
          <div className="p-5 sm:p-7">
            <DialogHeader className="space-y-2">
              <div className="inline-flex items-center justify-center gap-1.5 rounded-fullpx-2.5 py-1">
                <DialogTitle className="text-lg sm:text-xl md:text-xl font-semibold tracking-tight text-center">
                  Unlock Full Audio &amp; More!
                </DialogTitle>
                <span className="text-xs flex items-center gap-1">
                  <span className="text-blue-400">★</span>
                </span>
              </div>

              <DialogDescription className="text-[#C2D8FC] text-sm sm:text-base font-montserrat text-center">
                Enjoy the complete song and get access to all versions and
                download options by upgrading your plan.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6 flex items-center justify-center gap-5">
              <Button
                asChild
                className="px-5 py-2 rounded-full font-medium text-white 
               bg-[#3B82F6] border-2 border-[#2563EB] 
               hover:bg-[#2563EB] text-center min-w-[150px]"
              >
                <Link href="/pricing">Check out our plan</Link>
              </Button>
              <Button
                className="px-5 py-2 rounded-full font-medium text-white 
              bg-[#3B82F6] border-2 border-[#2563EB] 
               hover:bg-[#2563EB] 
               min-w-[150px] text-center"
                onClick={onClose}
              >
                Not Now
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-[#1F1F1F]" />
            <Image
              src="/download-bg.svg"
              alt="Sing together"
              fill
              className="object-cover opacity-90"
              priority
            />
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
