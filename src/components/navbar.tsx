"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import logo from "../../public/vocalize-logo.svg";
import logoBlue from "../../public/vocalize-logo-blue.svg";

const navItems = [" AI Vocalizer", "Pricing", "Blog", "Library"];

export default function Navbar() {
  const navContainerRef = useRef<HTMLInputElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navContainerRef}
      className={`fixed inset-x-0 top-4 z-50 h-16 transition-all duration-500 sm:inset-x-6 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-md rounded-xl"
          : "bg-transparent"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="relative z-10 px-6 sm:px-16 nd:px-10 py-4">
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
              <div className="hidden md:flex items-center gap-x-2">
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

              <div className="flex items-center space-x-3 md:mx-16">
                <Button
                  variant="ghost"
                  className={`${
                    isScrolled
                      ? "font-montserrat bg-white text-[#3B82F6] border-2 border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white p-4"
                      : "font-montserrat text-white border border-white hover:bg-[#3B82F6] hover:text-white p-4"
                  } cursor-pointer`}
                >
                  <User className="w-4 h-4 mr-2 text-inherit" />
                  Login
                </Button>

                <Button
                  variant="ghost"
                  className={`${
                    isScrolled
                      ? "font-montserrat bg-white text-[#3B82F6] border-2 border-[#3B82F6] hover:bg-[#3B82F6] hover:text-white p-4"
                      : "font-montserrat text-white border border-white hover:bg-[#3B82F6] hover:text-white p-4"
                  } cursor-pointer`}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
