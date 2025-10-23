import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Montserrat,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ReactQueryProviders } from "@/providers/react-query-providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vocalize",
  description: "AI audio separation & enhancement for vocals and instruments.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/vocalize-logo.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${playfair.variable} antialiased`}
      >
        <ReactQueryProviders>
          <Navbar />
          {children}
          <Toaster richColors />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
