import { z } from "zod";

/** Payload enviado ao ingest (JSON). */
export const leadPayloadSchema = z
  .object({
    name: z.string().min(2).max(120),
    email: z.string().email(),
    company: z.string().min(2).max(200),
    phone: z.string().max(40).optional(),
    message: z.string().max(2000).optional(),
    consent: z.boolean(),
    /** Honeypot: deve estar vazio */
    website: z.string().optional(),
    source: z.string().max(80),
    locale: z.enum(["pt", "en"]),
  })
  .refine((data) => data.consent === true, { path: ["consent"] })
  .refine((data) => !data.website?.length, { path: ["website"] });

export type LeadPayload = z.infer<typeof leadPayloadSchema>;

export function parseLeadPayloadJson(body: unknown) {
  return leadPayloadSchema.safeParse(body);
}
