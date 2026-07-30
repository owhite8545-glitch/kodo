import { Playfair_Display, DM_Sans } from "next/font/google";

/**
 * KODŌ — Highly optimized, variable font configuration engine.
 * Loaded during build time, preventing visual FOUT/FOIT layout shifts,
 * and eliminating unnecessary external network requests.
 */

export const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-editorial-display",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-utility-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});
