"use client";

import { BASE_PATH, withBasePath } from "@/lib/basePath";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  href: string;
  message: string;
};

export default function WorkvivoRouteRedirect({ href, message }: Props) {
  const router = useRouter();
  const resolvedHref =
    href.startsWith("/") && !href.startsWith(BASE_PATH) ? withBasePath(href) : href;

  useEffect(() => {
    router.replace(resolvedHref);
  }, [resolvedHref, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-navy-dark px-4 text-center text-sm text-white/55">
      {message}
    </div>
  );
}
