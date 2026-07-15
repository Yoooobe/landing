import assert from "node:assert/strict";

import {
  contactGoal,
  decodeCursor,
  encodeCursor,
  safeDestination,
  verifyTrackingToken,
} from "../lib/emailTracking";

process.env.TRACKING_SECRET = "compatibility-test-secret-32-bytes";

// Gerado por dashboard/db.py::sign_token. Garante que Python e Node assinam
// exatamente o mesmo JSON UTF-8 e HMAC SHA-256.
const pythonToken =
  "eyJzaWQiOiJjb21wYXQtMTIzIiwiZW1haWwiOiJsZWFkQGV4YW1wbGUuY29tIiwiY2lkIjo2LCJldGFwYSI6MSwidSI6Imh0dHBzOi8vNHVuaWsuY29tLmJyLz91dG1fc291cmNlPTR1bmlrLW1haWwifQ.EDmdqq80x-mhaX7H_6dUNvdEHi8m7y9WCe4t-ER6P90";

assert.deepEqual(verifyTrackingToken(pythonToken), {
  sid: "compat-123",
  email: "lead@example.com",
  cid: 6,
  etapa: 1,
  u: "https://4unik.com.br/?utm_source=4unik-mail",
});
assert.equal(verifyTrackingToken(`${pythonToken}x`), null);

assert.equal(safeDestination("javascript:alert(1)"), "");
assert.equal(safeDestination("https://4unik.com.br/"), "https://4unik.com.br/");
assert.equal(safeDestination("mailto:comercial@4unik.com.br"), "mailto:comercial@4unik.com.br");
assert.equal(contactGoal("https://wa.me/551126844724"), "contact_whatsapp");
assert.equal(contactGoal("mailto:comercial@4unik.com.br"), "contact_email");

const cursor = { createdAt: "2026-07-15T00:00:00.000Z", id: "event-123" };
assert.deepEqual(decodeCursor(encodeCursor(cursor)), cursor);

console.log("email tracking compatibility: ok");
