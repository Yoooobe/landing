import groq from "groq";

export const recentLeadsQuery = groq`
  *[_type == "leadSubmission"] | order(submittedAt desc) [0...20] {
    _id,
    submittedAt,
    name,
    email,
    company,
    phone,
    message,
    source,
    locale,
    status
  }
`;

export const leadStatsQuery = groq`{
  "total": count(*[_type == "leadSubmission"]),
  "last7Days": count(*[_type == "leadSubmission" && submittedAt >= $sevenDaysAgo]),
  "last30Days": count(*[_type == "leadSubmission" && submittedAt >= $thirtyDaysAgo]),
  "byLocale": {
    "pt": count(*[_type == "leadSubmission" && locale == "pt"]),
    "en": count(*[_type == "leadSubmission" && locale == "en"])
  },
  "leadsForAggregation": *[_type == "leadSubmission"]{ source }
}`;

export const leadAudienceSettingsQuery = groq`
  *[_id == "siteSettings"][0]{
    gaMeasurementId,
    gtmContainerId,
    metaPixelId,
    linkedinPartnerId,
    calendlyUrl,
    contactEmail
  }
`;
