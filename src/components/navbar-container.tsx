"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../../public/vocalize-logo.svg";
import logoBlue from "../../public/vocalize-logo-blue.svg";
import LoginDialog from "@/features/auth/components/login-dialog";
import RegisterForm from "@/features/auth/components/register-form";
import type { SessionUser } from "@/lib/sessions";
import UserMenu from "./user-menu";

const navItems = ["AI Vocalizer", "Pricing", "Blog", "Library"];

export default function NavbarContainer({ user }: { user: SessionUser }) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isGuest = user?.role === "guest";
  const isAuthenticated = !!user?.id && !isGuest;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-4 z-50 h-14 md:h-16 transition-all duration-500 sm:inset-x-6 md:inset-x-8 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-md rounded-xl"
          : "bg-transparent"
      }`}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="relative z-10 px-6 sm:px-16 md:px-10 py-4">
          <div className="mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Image src={isScrolled ? logoBlue : logo} alt="vocalize-logo" />
              <span
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? "text-[#3B82F6]" : "text-white"
                } text-shadow-custom`}
              >
                Vocalize
              </span>
            </div>

            <div className="flex items-center justify-center max-w-4xl space-x-1">
              <div className="hidden lg:flex items-center gap-x-2">
                {navItems.map((item) => (
                  <a
                    key={item}
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
                {isAuthenticated ? (
                  <UserMenu user={user!} isScrolled={isScrolled} />
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
                onClick={() => setMobileOpen((v) => !v)}
                className={`p-2 rounded ${
                  isScrolled ? "text-[#3B82F6]" : "text-white"
                }`}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {mobileOpen && (
          <div
            className={`lg:hidden text-center absolute top-full left-0 w-full transition-all duration-300 ${
              isScrolled
                ? "bg-white/90 backdrop-blur-md shadow-md"
                : "bg-transparent backdrop-blur-md"
            }`}
          >
            <div className="flex flex-col px-6 py-4 space-y-4 mx-auto">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block text-lg font-semibold ${
                    isScrolled ? "text-[#3B82F6]" : "text-white"
                  } hover:underline`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              {isAuthenticated ? (
                <UserMenu user={user!} isScrolled={isScrolled} />
              ) : (
                <>
                  <LoginDialog isScrolled={isScrolled} />
                  <RegisterForm isScrolled={isScrolled} />
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
