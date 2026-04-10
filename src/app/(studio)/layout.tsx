import { jakarta, ROOT_BODY_CLASSNAME } from "@/components/site-settings/rootLayoutTheme";
import "../globals.css";

export default function StudioRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark scroll-smooth ${jakarta.variable}`}
      suppressHydrationWarning
    >
      <body className={ROOT_BODY_CLASSNAME} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
