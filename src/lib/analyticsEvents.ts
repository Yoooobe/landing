/** GA4 conversion / soft-intent event names (key events in Admin where noted). */
export const GA_CONVERSION_EVENTS = {
  generateLead: "generate_lead",
  scheduleDemo: "schedule_demo",
  contactWhatsapp: "contact_whatsapp",
  contactEmail: "contact_email",
  /** Soft intent: user opened contact form path (dock, header Contato). Not a key event. */
  contactIntent: "contact_intent",
} as const;

export type GaConversionEventName =
  (typeof GA_CONVERSION_EVENTS)[keyof typeof GA_CONVERSION_EVENTS];

/** Maps outbound href to a conversion event, if trackable. */
export function outboundConversionEventName(href: string): GaConversionEventName | null {
  const h = href.trim().toLowerCase();
  if (!h) return null;
  if (h.includes("calendly.com")) return GA_CONVERSION_EVENTS.scheduleDemo;
  if (h.includes("wa.me") || h.includes("whatsapp.com") || h.includes("api.whatsapp.com")) {
    return GA_CONVERSION_EVENTS.contactWhatsapp;
  }
  if (h.startsWith("mailto:")) return GA_CONVERSION_EVENTS.contactEmail;
  return null;
}
