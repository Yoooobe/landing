import { toYoobePath } from "../../src/lib/routes";

const SITE = "https://corporate.yoobe.co";

type Rule = [RegExp, string | ((...m: string[]) => string)];

const RULES: Rule[] = [
  [/https?:\/\/plataforma\.4unik\.com\.br\/landing(\/[^\s"'`)<>]*)?/g, (_m, rest) => SITE + toYoobePath(rest || "/")],
  [/https?:\/\/plataforma\.4unik\.com\.br/g, SITE],
  [/plataforma\.4unik\.com\.br(\/landing)?/g, "corporate.yoobe.co"],
  [/https:\/\/calendly\.com\/4unik\/30min/g, "https://calendly.com/yoobeco/demo"],
  [/https?:\/\/catalogo\.4unik\.com\.br/g, "https://catalogo.yoobe.co"],
  [/catalogo\.4unik\.com\.br/g, "catalogo.yoobe.co"],
  [/https?:\/\/(?:www\.)?4unik\.com\.br\/?/g, "https://catalogo.yoobe.co/"],
  [/[a-z0-9._-]+@4unik\.com\.br/gi, "vendas@yoobe.co"],
  [/(?<![\w.])4unik\.com\.br/g, "catalogo.yoobe.co"],
  [/api\.4unik\.yoobe\.co/g, "api.yoobe.co"],
  [/gestor\.4unik\.io/g, "admin.yoobe.co"],
  [/loja\.4unik\.io/g, "store.yoobe.co"],
  [/([a-z]+)\.4unik\.io/g, "$1.yoobe.co"],
  [/551126844724/g, "5541987607512"],
  [/@4unikoficial/gi, "@yoobe.co"],
  [/4\s?unik\s+by\s+yoobe/gi, "Yoobe"],
  [/yoobe\s*\/\s*4unik|4unik\s*\/\s*yoobe/gi, "Yoobe"],
  [/4UNIK/g, "YOOBE"],
  [/(?<=^|[-/_])4unik(?=[-/_.]|$)/g, "yoobe"],
  [/4\s?-?\s?[Uu]nik/g, "Yoobe"],
];

export function rewriteBrand(text: string): string {
  let out = text;
  for (const [re, to] of RULES) {
    out = typeof to === "string" ? out.replace(re, to) : out.replace(re, to as (...m: string[]) => string);
  }
  return out;
}

export function rewriteHref(href: string): string {
  return toYoobePath(rewriteBrand(href));
}

const SKIP_KEYS = new Set(["_id", "_ref", "_type", "_key", "_rev", "_createdAt", "_updatedAt", "_weak", "_strengthenOnPublish"]);

export function rewriteDoc(value: unknown, key = ""): unknown {
  if (typeof value === "string") {
    if (SKIP_KEYS.has(key)) return value;
    return value.startsWith("/") ? rewriteHref(value) : rewriteBrand(value);
  }
  if (Array.isArray(value)) return value.map((v) => rewriteDoc(v));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewriteDoc(v, k)]));
  }
  return value;
}
