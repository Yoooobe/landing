import type { VercelRequest, VercelResponse } from "@vercel/node";
import { persistTrackingEvent, tokenFromRequest, verifyTrackingToken } from "../../lib/emailTracking";

const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", "base64");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "image/gif");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  if (req.method !== "GET") return res.status(405).end();
  const payload = verifyTrackingToken(tokenFromRequest(req));
  if (payload) await persistTrackingEvent("open", payload, req).catch(() => undefined);
  return res.status(200).send(GIF);
}
