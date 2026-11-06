import { Outfit } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const ROOT_BODY_CLASSNAME =
  "font-sans antialiased min-h-screen flex flex-col bg-brand-ink-dark text-white selection:bg-brand-primary/30";
