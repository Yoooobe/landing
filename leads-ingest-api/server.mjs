import { createServer } from "node:http";

const unwrap = (m) => (m.default && typeof m.default === "object" ? m.default : m);
const { BRAND_ENV, missingBrandEnv } = unwrap(await import("./lib/leadConfig.ts"));
const load = (p) => () => import(p).then((m) => unwrap(m).default ?? m.default);

const ROUTES = {
  "/": load("./api/ingest.ts"),
  "/api": load("./api/ingest.ts"),
  "/api/ingest": load("./api/ingest.ts"),
  "/api/email/open": load("./api/email/open.ts"),
  "/api/email/click": load("./api/email/click.ts"),
  "/api/email/unsubscribe": load("./api/email/unsubscribe.ts"),
  "/api/email/events": load("./api/email/events.ts"),
};

const MAX_BODY = 1_000_000;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(Object.assign(new Error("payload_too_large"), { status: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function parseBody(buf, contentType = "") {
  if (!buf.length) return undefined;
  const type = contentType.split(";")[0].trim().toLowerCase();
  if (type === "application/json") {
    try {
      return JSON.parse(buf.toString("utf8"));
    } catch {
      throw Object.assign(new Error("invalid_json"), { status: 400 });
    }
  }
  if (type === "application/x-www-form-urlencoded") {
    return Object.fromEntries(new URLSearchParams(buf.toString("utf8")));
  }
  if (type.startsWith("text/")) return buf.toString("utf8");
  return buf;
}

function toQuery(searchParams) {
  const query = {};
  for (const [k, v] of searchParams) {
    if (k in query) query[k] = [].concat(query[k], v);
    else query[k] = v;
  }
  return query;
}

function decorate(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(data));
    return res;
  };
  res.send = (data) => {
    if (data === undefined || data === null) return res.end(), res;
    if (Buffer.isBuffer(data)) {
      if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "application/octet-stream");
      return res.end(data), res;
    }
    if (typeof data === "object") return res.json(data);
    if (!res.getHeader("Content-Type")) res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(String(data)), res;
  };
  res.redirect = (a, b) => {
    const [code, url] = typeof a === "number" ? [a, b] : [307, a];
    res.statusCode = code;
    res.setHeader("Location", url);
    res.end();
    return res;
  };
  return res;
}

const server = createServer(async (req, res) => {
  decorate(res);
  const url = new URL(req.url || "/", "http://localhost");
  const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;

  if (path === "/health" || path === "/healthz") {
    const missing = missingBrandEnv(process.env);
    return res.status(200).json({
      ok: true,
      service: "leads-ingest",
      configured: missing.length === 0,
      missingBrandEnv: missing,
      brandEnv: BRAND_ENV,
    });
  }

  const route = ROUTES[path];
  if (!route) return res.status(404).json({ ok: false, error: "not_found" });

  try {
    req.query = toQuery(url.searchParams);
    req.cookies = {};
    if (req.method !== "GET" && req.method !== "HEAD" && req.method !== "OPTIONS") {
      req.body = parseBody(await readBody(req), req.headers["content-type"]);
    }
    const handler = await route();
    await handler(req, res);
    if (!res.writableEnded) res.end();
  } catch (err) {
    const status = err?.status || 500;
    if (status === 500) console.error("[server]", err);
    if (!res.headersSent) res.status(status).json({ ok: false, error: status === 500 ? "internal_error" : err.message });
    else if (!res.writableEnded) res.end();
  }
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, "0.0.0.0", () => console.log(`[leads-ingest] listening on :${port}`));
