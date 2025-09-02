"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { SessionUser } from "@/lib/sessions";
import { logout } from "@/features/auth/services/auth";

export default function UserMenu({
  user,
  isScrolled,
}: {
  user: NonNullable<SessionUser>;
  isScrolled: boolean;
}) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`font-semibold font-montserrat text-base hover:bg-transparent hover:text-white ${
            isScrolled ? "text-[#3B82F6] hover:text-[#3B82F6]" : "text-white"
          }`}
        >
          {user.username ?? "User"}{" "}
          <ChevronDown className="ml-1 w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 font-montserrat">
        <DropdownMenuLabel>{user.username ?? "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Account</DropdownMenuItem>
        <DropdownMenuItem>My Plan</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:text-red-500"
          onClick={async () => {
            await logout();
            router.refresh();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Mobile({
  user,
  isScrolled,
  onAfterAction,
}: {
  user: NonNullable<SessionUser>;
  isScrolled: boolean;
  onAfterAction?: () => void;
}) {
  const router = useRouter();
  return (
    <div className="mt-4 text-center">
      <div
        className={`mb-2 text-sm ${
          isScrolled ? "text-[#3B82F6]" : "text-white"
        }`}
      >
        Signed in as{" "}
        <span className="font-bold text-lg">{user.username ?? "User"}</span>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center font-montserrat">
        <Button
          variant="ghost"
          className={`justify-start ${
            isScrolled ? "text-[#3B82F6]" : "text-white"
          }`}
          onClick={onAfterAction}
        >
          Account
        </Button>
        <Button
          variant="ghost"
          className={`justify-start ${
            isScrolled ? "text-[#3B82F6]" : "text-white"
          }`}
          onClick={onAfterAction}
        >
          My Plan
        </Button>
        <Button
          variant="destructive"
          className="justify-start"
          onClick={async () => {
            await logout();
            onAfterAction?.();
            router.refresh();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

UserMenu.Mobile = Mobile;
