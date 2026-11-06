"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EnGamificacaoRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/platform/gamification-engine/");
  }, [router]);
  return null;
}
