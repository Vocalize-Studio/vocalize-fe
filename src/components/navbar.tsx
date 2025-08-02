"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import logo from "../../public/vocalize-logo.svg";
import logoBlue from "../../public/vocalize-logo-blue.svg";
import RegisterForm from "@/features/auth/components/register-form";
import LoginDialog from "@/features/auth/components/login-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navItems = ["AI Vocalizer", "Pricing", "Blog", "Library"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-500 sm:inset-x-6 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-md rounded-xl"
          : "bg-transparent"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="relative z-10 px-6 sm:px-16 md:px-10 py-4">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center">
              {isScrolled ? (
                <Image src={logoBlue} alt="vocalize-logo" />
              ) : (
                <Image src={logo} alt="vocalize-logo" />
              )}
              <span
                className={`text-2xl font-bold transition-colors ${
                  isScrolled
                    ? "text-[#3B82F6] text-shadow-custom"
                    : "text-white text-shadow-custom"
                }`}
              >
                Vocalize
              </span>
            </div>
            <div className="flex items-center justify-center max-w-4xl space-x-1">
              <div className="hidden lg:flex items-center gap-x-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className={`nav-hover-btn ${
                      isScrolled
                        ? "nav-hover-btn-scrolled"
                        : "nav-hover-btn-light"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="hidden lg:flex items-center space-x-3 md:mx-16">
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`font-semibold font-montserrat text-base ${
                          isScrolled ? "text-[#3B82F6]" : "text-white"
                        }`}
                      >
                        abc ▾
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>abc</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Account</DropdownMenuItem>
                      <DropdownMenuItem>My Plan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {}}
                        className="text-red-500 focus:text-red-500"
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <LoginDialog isScrolled={isScrolled} />
                    <RegisterForm isScrolled={isScrolled} />
                  </>
                )}
              </div>
            </div>
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded ${
                  isScrolled ? "text-[#3B82F6]" : "text-white"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden text-center absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
              isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-md"
                : "bg-transparent backdrop-blur-md"
            }`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4 mx-auto">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className={`block text-lg font-semibold ${
                    isScrolled ? "text-[#3B82F6]" : "text-white"
                  } hover:underline`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              <div className="flex flex-col gap-3 mt-4">
                <LoginDialog isScrolled={isScrolled} />
                <RegisterForm isScrolled={isScrolled} />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
