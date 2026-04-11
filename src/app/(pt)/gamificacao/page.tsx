"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GamificacaoRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/plataforma/motor-gamificacao/");
  }, [router]);
  return null;
}
