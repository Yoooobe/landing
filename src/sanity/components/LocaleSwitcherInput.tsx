"use client";

import { withBasePath } from "@/lib/basePath";
import { useCallback, useEffect, useState } from "react";
import { set, StringInputProps, useClient, useFormValue } from "sanity";

const LOCALE_LABELS: Record<string, string> = {
  pt: "Português",
  en: "English",
};

const OTHER_LOCALE: Record<string, string> = {
  pt: "en",
  en: "pt",
};

type CounterpartDoc = {
  _id: string;
  _type: string;
  title?: string;
  locale?: string;
  slug?: { current?: string };
  pageKey?: string;
  mediaKey?: string;
};

/**
 * Custom input for the `locale` field.
 *
 * Renders the standard radio buttons PLUS a link to the counterpart locale
 * document (same slug or pageKey, different locale). Changing the radio
 * button updates the field value in the normal Sanity way; the link below
 * opens the other-locale doc in the studio's URL without a full navigation.
 */
export function LocaleSwitcherInput(props: StringInputProps) {
  const { value, onChange, schemaType } = props;
  const client = useClient({ apiVersion: "2024-01-01" });

  // Read sibling fields to find the counterpart document
  const docType = useFormValue(["_type"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const pageKey = useFormValue(["pageKey"]) as string | undefined;
  const mediaKey = useFormValue(["mediaKey"]) as string | undefined;

  const [counterpart, setCounterpart] = useState<CounterpartDoc | null>(null);
  const [loading, setLoading] = useState(false);

  const currentLocale = value ?? "pt";
  const otherLocale = OTHER_LOCALE[currentLocale] ?? "en";

  useEffect(() => {
    if (!client || !docType) return;

    let cancelled = false;
    setLoading(true);

    let query = "";
    let params: Record<string, string> = {};

    if (docType === "marketingPage" && slug) {
      query = `*[_type == "marketingPage" && slug.current == $slug && locale == $locale][0]{_id, _type, title, locale, slug}`;
      params = { slug, locale: otherLocale };
    } else if (docType === "platformShowcaseMedia" && pageKey) {
      query = `*[_type == "platformShowcaseMedia" && pageKey == $pageKey && locale == $locale][0]{_id, _type, title, locale, pageKey}`;
      params = { pageKey, locale: otherLocale };
    } else if (docType === "workvivoShowcaseMedia" && mediaKey) {
      query = `*[_type == "workvivoShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]{_id, _type, title, locale, mediaKey}`;
      params = { mediaKey, locale: otherLocale };
    } else if (docType === "homeShowcaseMedia" && mediaKey) {
      query = `*[_type == "homeShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]{_id, _type, title, locale, mediaKey}`;
      params = { mediaKey, locale: otherLocale };
    } else if (docType === "gamificacaoShowcaseMedia" && mediaKey) {
      query = `*[_type == "gamificacaoShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]{_id, _type, title, locale, mediaKey}`;
      params = { mediaKey, locale: otherLocale };
    } else if (docType === "apiIntegracoesShowcaseMedia" && mediaKey) {
      query = `*[_type == "apiIntegracoesShowcaseMedia" && mediaKey == $mediaKey && locale == $locale][0]{_id, _type, title, locale, mediaKey}`;
      params = { mediaKey, locale: otherLocale };
    } else {
      setLoading(false);
      return;
    }

    client
      .fetch<CounterpartDoc | null>(query, params)
      .then((doc) => {
        if (!cancelled) {
          setCounterpart(doc ?? null);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [client, docType, slug, pageKey, mediaKey, otherLocale]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(e.target.value));
    },
    [onChange],
  );

  // Build the studio URL for the counterpart document (basePath from NEXT_PUBLIC_SITE_URL)
  function getCounterpartUrl(doc: CounterpartDoc): string {
    const studioBase = withBasePath("/studio");
    return `${studioBase}/intent/edit/type=${encodeURIComponent(doc._type)};id=${doc._id}/`;
  }

  const localeOptions =
    (schemaType.options as { list?: Array<{ title: string; value: string }> } | undefined)?.list ??
    [
      { title: "Português", value: "pt" },
      { title: "English", value: "en" },
    ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Standard radio buttons */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {localeOptions.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: currentLocale === opt.value ? 600 : 400,
              color: currentLocale === opt.value ? "var(--card-fg-color, #1a1a2e)" : "#666",
            }}
          >
            <input
              type="radio"
              name="locale-switcher"
              value={opt.value}
              checked={currentLocale === opt.value}
              onChange={handleChange}
              style={{ accentColor: "#2377C9" }}
            />
            {opt.title}
          </label>
        ))}
      </div>

      {/* Counterpart link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.75rem",
          borderRadius: 6,
          background: "rgba(35,119,201,0.07)",
          border: "1px solid rgba(35,119,201,0.2)",
          fontSize: "0.78rem",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2377C9" strokeWidth="2.5" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>

        <span style={{ color: "#555" }}>
          Versão {LOCALE_LABELS[otherLocale] ?? otherLocale}:
        </span>

        {loading ? (
          <span style={{ color: "#999", fontStyle: "italic" }}>verificando…</span>
        ) : counterpart ? (
          <a
            href={getCounterpartUrl(counterpart)}
            style={{
              color: "#2377C9",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            {counterpart.title ?? `Documento em ${LOCALE_LABELS[otherLocale]}`}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ) : (
          <span style={{ color: "#bbb", fontStyle: "italic" }}>
            Documento em {LOCALE_LABELS[otherLocale]} não encontrado
          </span>
        )}
      </div>
    </div>
  );
}
