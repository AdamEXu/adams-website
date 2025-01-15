"use client";

import { createContext, useContext } from "react";
import { Lenis as LenisType } from "@studio-freight/lenis";

export const LenisContext = createContext<LenisType | null>(null);

export const useLenisInstance = () => {
  const lenis = useContext(LenisContext);
  if (!lenis) {
    throw new Error("useLenisInstance must be used within a LenisProvider");
  }
  return lenis;
};
