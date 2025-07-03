"use client";

import React, { useRef } from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import Image from "next/image";
import logo from "../../public/vocalize-logo.svg";

const navItems = [" AI Vocalizer", "Pricing", "Blog", "Library"];

export default function Navbar() {
  const navContainerRef = useRef(null);
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="relative z-10 px-12 py-4">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center ">
              <Image src={logo} alt="vocalize-logo" />
              <span className="text-white text-xl font-bold shadow-2xl">
                Vocalize
              </span>
            </div>
            <div className="flex items-center justify-center max-w-3xl space-x-12">
              <div className="hidden md:flex items-center gap-x-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-3 md:mx-6">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 border border-white/20 cursor-pointer"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
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
