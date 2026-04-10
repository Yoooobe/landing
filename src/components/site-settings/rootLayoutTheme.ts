import { Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const ROOT_BODY_CLASSNAME =
  "font-sans antialiased min-h-screen flex flex-col bg-brand-navy-dark text-white selection:bg-brand-orange/30";
