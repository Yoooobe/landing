#!/usr/bin/env node
/**
 * Configura GA4 Admin: Viewer para SA + eventos-chave do funil.
 * Requer OAuth com scopes analytics (uma vez):
 *
 *   gcloud auth application-default login \
 *     --scopes=https://www.googleapis.com/auth/analytics.edit,https://www.googleapis.com/auth/analytics.manage.users
 *
 * Usage: node scripts/setup-ga4-admin.mjs [--dry-run]
 */
import { google } from "../mcps/4unik-marketing/node_modules/googleapis/build/src/index.js";
import { GoogleAuth } from "../mcps/4unik-marketing/node_modules/google-auth-library/build/src/index.js";

const GA_PROPERTY_ID = process.env.GA_PROPERTY_ID || "327916606";
const SA_EMAIL =
  process.env.GA4_READER_SA_EMAIL ||
  "landing-ga4-reader@institucional-480905.iam.gserviceaccount.com";
const KEY_EVENTS = ["generate_lead", "schedule_demo", "contact_whatsapp", "contact_email"];
const DRY_RUN = process.argv.includes("--dry-run");

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.edit",
  "https://www.googleapis.com/auth/analytics.manage.users",
];

async function getAdminClient() {
  const auth = new GoogleAuth({ scopes: SCOPES });
  return google.analyticsadmin({ version: "v1beta", auth });
}

async function ensureViewerAccess(admin) {
  const parent = `properties/${GA_PROPERTY_ID}`;
  const { data } = await admin.properties.accessBindings.list({ parent });
  const existing = (data.accessBindings ?? []).find(
    (b) => b.user === SA_EMAIL || b.user?.includes(SA_EMAIL),
  );
  if (existing) {
    console.log(`OK Viewer já existe: ${existing.name}`);
    return { created: false, binding: existing };
  }

  if (DRY_RUN) {
    console.log(`[dry-run] Criaria accessBinding Viewer para ${SA_EMAIL}`);
    return { created: false, dryRun: true };
  }

  const created = await admin.properties.accessBindings.create({
    parent,
    requestBody: {
      roles: ["predefinedRoles/viewer"],
      user: SA_EMAIL,
    },
  });
  console.log(`OK Viewer criado: ${created.data.name}`);
  return { created: true, binding: created.data };
}

async function ensureKeyEvent(admin, eventName) {
  const parent = `properties/${GA_PROPERTY_ID}`;
  const { data } = await admin.properties.conversionEvents.list({ parent });
  const existing = (data.conversionEvents ?? []).find(
    (e) => e.eventName === eventName,
  );
  if (existing) {
    console.log(`OK Key event já existe: ${existing.name}`);
    return { created: false, event: existing };
  }

  if (DRY_RUN) {
    console.log(`[dry-run] Criaria conversion event ${eventName}`);
    return { created: false, dryRun: true };
  }

  const created = await admin.properties.conversionEvents.create({
    parent,
    requestBody: {
      eventName,
    },
  });
  console.log(`OK Key event criado: ${created.data.name}`);
  return { created: true, event: created.data };
}

async function main() {
  console.log(`setup-ga4-admin: propriedade ${GA_PROPERTY_ID}, SA ${SA_EMAIL}`);
  const admin = await getAdminClient();

  try {
    await admin.accountSummaries.list({ pageSize: 1 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      "\nsetup-ga4-admin: sem permissão Analytics Admin. Corra:\n\n" +
        "  gcloud auth application-default login \\\n" +
        "    --scopes=https://www.googleapis.com/auth/analytics.edit,https://www.googleapis.com/auth/analytics.manage.users\n",
    );
    process.exit(1);
  }

  await ensureViewerAccess(admin);
  for (const eventName of KEY_EVENTS) {
    await ensureKeyEvent(admin, eventName);
  }
  console.log("\nsetup-ga4-admin: concluído. Teste: npm run fetch:ga4-snapshot");
}

main().catch((err) => {
  console.error(err.response?.data ?? err);
  process.exit(1);
});
