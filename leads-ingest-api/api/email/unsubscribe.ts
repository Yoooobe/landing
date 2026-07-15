import type { VercelRequest, VercelResponse } from "@vercel/node";
import { persistTrackingEvent, tokenFromRequest, verifyTrackingToken } from "../../lib/emailTracking";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] || c));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!["GET", "POST"].includes(req.method || "")) return res.status(405).end();
  const payload = verifyTrackingToken(tokenFromRequest(req));
  res.setHeader("Cache-Control", "no-store");
  if (!payload?.email) return res.status(400).send("Link de descadastro inválido ou expirado.");
  if (req.method === "POST") {
    await persistTrackingEvent("unsubscribe", payload, req).catch(() => undefined);
    return res.status(200).send("ok");
  }
  const email = escapeHtml(String(payload?.email || "Seu e-mail"));
  return res.status(200).send(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Descadastro — 4Unik</title></head><body style="margin:0;background:#f0f3f5;font-family:Arial,sans-serif;color:#1a0a2e"><main style="max-width:520px;margin:48px auto;background:#fff;border-radius:14px;padding:32px"><h1 style="font-size:22px">Confirmar descadastro</h1><p>Deseja deixar de receber comunicações em ${email}?</p><form method="post"><button type="submit" style="border:0;border-radius:10px;background:#6d28d9;color:#fff;padding:12px 18px;font-weight:700;cursor:pointer">Confirmar descadastro</button></form><p style="color:#6b7c87;margin-top:20px">O descadastro só será registrado depois da confirmação.</p></main></body></html>`);
}
