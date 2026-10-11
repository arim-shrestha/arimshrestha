import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    output: "export",
    // With static export, distDir is where the site is written; only set it
    // for builds so `next dev` keeps using .next
    ...(phase === PHASE_PRODUCTION_BUILD && { distDir: "dist" }),
  };
}
