"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/basePath";

/** Redirects unknown routes to landing home (dev + static 404 before patch). */
export default function NotFoundRedirect() {
  const router = useRouter();
  const home = withBasePath("/");

  useEffect(() => {
    router.replace(home);
  }, [router, home]);

  return null;
}
