import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { AnimatePresence } from "motion/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Adam Xu",
  description: "Hi, I&apos;m Adam.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </body>
    </html>
  );
}
