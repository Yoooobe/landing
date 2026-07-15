import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  contactGoal,
  persistTrackingEvent,
  safeDestination,
  sendGa4ContactGoal,
  tokenFromRequest,
  verifyTrackingToken,
} from "../../lib/emailTracking";

const FALLBACK = "https://plataforma.4unik.com.br/landing/";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const payload = verifyTrackingToken(tokenFromRequest(req));
  const destination = safeDestination(payload?.u) || FALLBACK;
  if (payload) {
    await persistTrackingEvent("click", payload, req, destination).catch(() => undefined);
    const goal = contactGoal(destination);
    if (goal) await sendGa4ContactGoal(goal, payload).catch(() => undefined);
  }
  res.setHeader("Cache-Control", "no-store");
  return res.redirect(302, destination);
}
