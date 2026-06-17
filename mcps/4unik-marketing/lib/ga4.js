import fs from "fs";
import { google } from "googleapis";

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "327916606";
const GA4_STREAM_ID = process.env.GA4_STREAM_ID || "15052677461";
const GA4_HOSTNAME = process.env.GA4_HOSTNAME || "plataforma.4unik.com.br";
const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || "";

function credentialsConfigured() {
  if (!CREDENTIALS_PATH) return false;
  try {
    return fs.existsSync(CREDENTIALS_PATH);
  } catch {
    return false;
  }
}

function streamDimensionFilter() {
  return {
    filter: {
      fieldName: "streamId",
      stringFilter: {
        matchType: "EXACT",
        value: GA4_STREAM_ID,
      },
    },
  };
}

function hostnameDimensionFilter() {
  return {
    filter: {
      fieldName: "hostName",
      stringFilter: {
        matchType: "EXACT",
        value: GA4_HOSTNAME,
      },
    },
  };
}

async function getAnalyticsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
  return google.analyticsdata({
    version: "v1beta",
    auth,
  });
}

async function runReport(analytics, requestBody) {
  return analytics.properties.runReport({
    property: `properties/${GA_PROPERTY_ID}`,
    requestBody,
  });
}

function metricValueFromRow(row, index = 0) {
  if (!row?.metricValues?.[index]?.value) return 0;
  const num = Number(row.metricValues[index].value);
  return Number.isFinite(num) ? num : 0;
}

function parseEngagementTotals(response) {
  const row = response.data.rows?.[0];
  return {
    activeUsers: metricValueFromRow(row, 0),
    sessions: metricValueFromRow(row, 1),
    newUsers: metricValueFromRow(row, 2),
    bounceRate: metricValueFromRow(row, 3),
    screenPageViews: metricValueFromRow(row, 4),
  };
}

async function fetchGenerateLeadCount(analytics, startDate, endDate, scopeFilter) {
  const response = await runReport(analytics, {
    dateRanges: [{ startDate, endDate }],
    dimensionFilter: {
      andGroup: {
        expressions: [
          scopeFilter,
          {
            filter: {
              fieldName: "eventName",
              stringFilter: { matchType: "EXACT", value: "generate_lead" },
            },
          },
        ],
      },
    },
    metrics: [{ name: "eventCount" }],
  });
  return metricValueFromRow(response.data.rows?.[0], 0);
}

/**
 * @param {{ startDate: string, endDate?: string, filterMode?: 'stream' | 'hostname' }} params
 */
export async function fetchGa4LandingMetrics({
  startDate,
  endDate = "today",
  filterMode = "stream",
}) {
  if (!credentialsConfigured()) {
    return {
      status: "mock_fallback",
      reason: "missing_credentials",
      note: "Defina GOOGLE_APPLICATION_CREDENTIALS com o JSON da service account landing-ga4-reader.",
      gaPropertyId: GA_PROPERTY_ID,
      period: `${startDate} a ${endDate}`,
    };
  }

  const analytics = await getAnalyticsClient();
  const dimensionFilter =
    filterMode === "hostname" ? hostnameDimensionFilter() : streamDimensionFilter();

  const baseRequest = {
    dateRanges: [{ startDate, endDate }],
    dimensionFilter,
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "newUsers" },
      { name: "bounceRate" },
      { name: "screenPageViews" },
    ],
  };

  try {
    let engagementResponse;
    let activeFilter = dimensionFilter;
    try {
      engagementResponse = await runReport(analytics, baseRequest);
    } catch (streamError) {
      if (filterMode !== "stream") throw streamError;
      activeFilter = hostnameDimensionFilter();
      engagementResponse = await runReport(analytics, {
        ...baseRequest,
        dimensionFilter: activeFilter,
      });
    }

    const engagement = parseEngagementTotals(engagementResponse);
    const generateLeadEvents = await fetchGenerateLeadCount(
      analytics,
      startDate,
      endDate,
      activeFilter,
    );
    const totals = { ...engagement, generateLeadEvents };

    const channelResponse = await runReport(analytics, {
      dateRanges: [{ startDate, endDate }],
      dimensionFilter: activeFilter,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 5,
    });

    const pagesResponse = await runReport(analytics, {
      dateRanges: [{ startDate, endDate }],
      dimensionFilter: activeFilter,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    const topChannels = (channelResponse.data.rows ?? []).map((row) => ({
      channel: row.dimensionValues?.[0]?.value ?? "(not set)",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    const topPages = (pagesResponse.data.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "/",
      views: Number(row.metricValues?.[0]?.value ?? 0),
    }));

    const sessions = totals.sessions || 0;
    const generateLead = totals.generateLeadEvents || 0;

    return {
      status: "success",
      source: "ga4_data_api",
      gaPropertyId: GA_PROPERTY_ID,
      ga4StreamId: GA4_STREAM_ID,
      hostname: GA4_HOSTNAME,
      period: `${startDate} a ${endDate}`,
      metrics: {
        ...totals,
        leadConversionRate: sessions > 0 ? Number((generateLead / sessions).toFixed(4)) : 0,
        topTrafficChannels: topChannels,
        topLandingPages: topPages.map((p) => p.path),
        topPagesDetail: topPages,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const is403 = message.includes("403") || message.toLowerCase().includes("permission");
    return {
      status: "mock_fallback",
      reason: is403 ? "ga4_property_access_denied" : "api_error",
      note: is403
        ? `Adicione landing-ga4-reader@institucional-480905.iam.gserviceaccount.com como Viewer na propriedade GA4 ${GA_PROPERTY_ID}.`
        : message,
      gaPropertyId: GA_PROPERTY_ID,
      period: `${startDate} a ${endDate}`,
    };
  }
}

export function mockGa4Payload(startDate, endDate) {
  return {
    status: "mock_fallback",
    reason: "simulated",
    gaPropertyId: GA_PROPERTY_ID,
    note: "Dados simulados. Configure GOOGLE_APPLICATION_CREDENTIALS para métricas reais.",
    period: `${startDate} a ${endDate || "hoje"}`,
    metrics: {
      activeUsers: 1450,
      sessions: 1820,
      newUsers: 1200,
      bounceRate: 42.5,
      screenPageViews: 3200,
      generateLeadEvents: 45,
      leadConversionRate: 0.0247,
      topTrafficChannels: [{ channel: "Organic Search", sessions: 620 }],
      topLandingPages: ["/landing/api-integracoes", "/landing/casos-de-uso"],
    },
    recommendation:
      "Configure credenciais GA4 ou aumente otimização on-page para rotas com alta rejeição.",
  };
}

export async function resolveGa4Metrics(startDate, endDate) {
  const result = await fetchGa4LandingMetrics({ startDate, endDate });
  if (result.status === "success") return result;
  if (result.status === "mock_fallback" && result.reason === "missing_credentials") {
    return mockGa4Payload(startDate, endDate);
  }
  return {
    ...mockGa4Payload(startDate, endDate),
    status: "mock_fallback",
    reason: result.reason,
    note: result.note,
    apiError: result.note,
  };
}

export {
  GA_PROPERTY_ID,
  GA4_STREAM_ID,
  GA4_HOSTNAME,
  credentialsConfigured,
};
