"use client";

import { getLeadSubmitUrl } from "@/lib/getLeadSubmitUrl";
import { leadPayloadSchema, type LeadPayload } from "@/lib/leadPayload";
import { useLocaleMessages } from "@/contexts/LocaleMessagesContext";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";

const cardVariants = cva("rounded-2xl border text-left shadow-xl", {
  variants: {
    variant: {
      home: "border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6",
      plataforma: "border-slate-200/80 bg-white p-5 text-brand-navy-dark shadow-black/10 md:p-6",
      api: "border-cyan-500/25 bg-[#0c1520] p-5 md:p-6",
      gamificacao:
        "border-fuchsia-500/20 bg-linear-to-br from-yoobe-purple/15 to-fuchsia-600/10 p-5 md:p-6",
      casos: "border-brand-orange/30 bg-[#0f172a] p-5 md:p-6",
      inteligencia: "border-white/15 bg-white p-5 text-brand-navy-dark md:p-6",
      marketing: "border-white/10 bg-white/5 p-5 backdrop-blur-sm md:p-6",
    },
  },
  defaultVariants: { variant: "marketing" },
});

const labelVariants = cva("mb-1.5 block text-xs font-semibold uppercase tracking-wide", {
  variants: {
    variant: {
      home: "text-white/70",
      plataforma: "text-brand-navy-dark/70",
      api: "text-cyan-200/80",
      gamificacao: "text-white/75",
      casos: "text-white/70",
      inteligencia: "text-brand-navy-dark/70",
      marketing: "text-white/70",
    },
  },
  defaultVariants: { variant: "marketing" },
});

const inputVariants = cva(
  "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-offset-0 disabled:opacity-50",
  {
    variants: {
      variant: {
        home:
          "border-white/20 bg-white/5 text-white placeholder:text-white/35 focus:border-white/40 focus:ring-white/25",
        plataforma:
          "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-navy-dark/40 focus:ring-brand-navy-dark/20",
        api: "border-cyan-500/30 bg-[#0a0f18] text-white placeholder:text-white/35 focus:border-cyan-400/50 focus:ring-cyan-500/25",
        gamificacao:
          "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-fuchsia-400/40 focus:ring-fuchsia-500/25",
        casos:
          "border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-brand-orange/50 focus:ring-brand-orange/25",
        inteligencia:
          "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-brand-navy-dark/40 focus:ring-brand-navy-dark/20",
        marketing:
          "border-white/20 bg-white/5 text-white placeholder:text-white/35 focus:border-white/40 focus:ring-white/25",
      },
    },
    defaultVariants: { variant: "marketing" },
  },
);

const errorRing = "border-red-400 focus:border-red-400 focus:ring-red-500/30";

export type LeadFormVariant = NonNullable<VariantProps<typeof cardVariants>["variant"]>;

export type LeadCaptureFormProps = {
  variant: LeadFormVariant;
  /** Identificador da página (ex.: home, api-integracoes). */
  source: string;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

function localeToLeadLocale(locale: string): LeadPayload["locale"] {
  return locale === "en" ? "en" : "pt";
}

export default function LeadCaptureForm({ variant, source, className }: LeadCaptureFormProps) {
  const { m, locale } = useLocaleMessages();
  const copy = m.leadForm;
  const leadLocale = localeToLeadLocale(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LeadPayload | "root", string>>>(
    {},
  );

  const v = variant;

  const clearFieldError = useCallback((key: keyof LeadPayload) => {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      phone: phone.trim() || undefined,
      message: message.trim() || undefined,
      consent,
      website: honeypot,
      source,
      locale: leadLocale,
    };

    const parsed = leadPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      const next: Partial<Record<keyof LeadPayload | "root", string>> = {};
      if (flat.fieldErrors.name?.[0]) next.name = copy.fieldErrors.name;
      if (flat.fieldErrors.email?.[0]) next.email = copy.fieldErrors.email;
      if (flat.fieldErrors.company?.[0]) next.company = copy.fieldErrors.company;
      if (flat.fieldErrors.consent?.[0]) next.consent = copy.fieldErrors.consent;
      if (flat.fieldErrors.website?.[0]) next.root = copy.errorGeneric;
      setFieldErrors(next);
      return;
    }

    const url = getLeadSubmitUrl();
    if (!url) {
      setFieldErrors({ root: copy.errorConfig });
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus("error");
        setFieldErrors({ root: copy.errorGeneric });
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setFieldErrors({ root: copy.errorGeneric });
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(cardVariants({ variant: v }), "text-center", className)}
        role="status"
        aria-live="polite"
      >
        <p
          className={cn(
            "font-heading text-lg font-bold md:text-xl",
            v === "plataforma" || v === "inteligencia" ? "text-emerald-700" : "text-emerald-400",
          )}
        >
          {copy.successTitle}
        </p>
        <p
          className={cn(
            "mt-2 text-sm",
            v === "plataforma" || v === "inteligencia" ? "text-slate-600" : "text-white/70",
          )}
        >
          {copy.successBody}
        </p>
      </div>
    );
  }

  const inputError = (key: keyof LeadPayload) => Boolean(fieldErrors[key]);

  return (
    <form
      className={cn("relative", cardVariants({ variant: v }), className)}
      onSubmit={onSubmit}
      noValidate
    >
      {fieldErrors.root ? (
        <p
          className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          role="alert"
        >
          {fieldErrors.root}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label htmlFor={`lead-name-${source}`} className={labelVariants({ variant: v })}>
            {copy.nameLabel}
          </label>
          <input
            id={`lead-name-${source}`}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError("name");
            }}
            placeholder={copy.namePlaceholder}
            className={cn(inputVariants({ variant: v }), inputError("name") && errorRing)}
            aria-invalid={inputError("name")}
            aria-describedby={inputError("name") ? `lead-name-err-${source}` : undefined}
          />
          {fieldErrors.name ? (
            <p id={`lead-name-err-${source}`} className="mt-1 text-xs text-red-400">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-1">
          <label htmlFor={`lead-email-${source}`} className={labelVariants({ variant: v })}>
            {copy.emailLabel}
          </label>
          <input
            id={`lead-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError("email");
            }}
            placeholder={copy.emailPlaceholder}
            className={cn(inputVariants({ variant: v }), inputError("email") && errorRing)}
            aria-invalid={inputError("email")}
            aria-describedby={inputError("email") ? `lead-email-err-${source}` : undefined}
          />
          {fieldErrors.email ? (
            <p id={`lead-email-err-${source}`} className="mt-1 text-xs text-red-400">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`lead-company-${source}`} className={labelVariants({ variant: v })}>
            {copy.companyLabel}
          </label>
          <input
            id={`lead-company-${source}`}
            name="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              clearFieldError("company");
            }}
            placeholder={copy.companyPlaceholder}
            className={cn(inputVariants({ variant: v }), inputError("company") && errorRing)}
            aria-invalid={inputError("company")}
            aria-describedby={inputError("company") ? `lead-company-err-${source}` : undefined}
          />
          {fieldErrors.company ? (
            <p id={`lead-company-err-${source}`} className="mt-1 text-xs text-red-400">
              {fieldErrors.company}
            </p>
          ) : null}
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`lead-phone-${source}`} className={labelVariants({ variant: v })}>
            {copy.phoneLabel}
          </label>
          <input
            id={`lead-phone-${source}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={copy.phonePlaceholder}
            className={inputVariants({ variant: v })}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor={`lead-message-${source}`} className={labelVariants({ variant: v })}>
            {copy.messageLabel}
          </label>
          <textarea
            id={`lead-message-${source}`}
            name="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={copy.messagePlaceholder}
            className={cn(inputVariants({ variant: v }), "min-h-[88px] resize-y")}
          />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={`lead-website-${source}`}>Website</label>
        <input
          id={`lead-website-${source}`}
          name="website"
          type="text"
          tabIndex={-1}
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="mt-4 flex items-start gap-3">
        <input
          id={`lead-consent-${source}`}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            clearFieldError("consent");
          }}
          className={cn(
            "mt-1 h-4 w-4 shrink-0 rounded border focus:ring-2",
            v === "plataforma" || v === "inteligencia"
              ? "border-slate-300 text-brand-navy-dark focus:ring-brand-navy-dark/30"
              : "border-white/30 bg-white/5 text-brand-orange focus:ring-brand-orange/40",
          )}
          aria-invalid={inputError("consent")}
          aria-describedby={inputError("consent") ? `lead-consent-err-${source}` : undefined}
        />
        <label
          htmlFor={`lead-consent-${source}`}
          className={cn(
            "text-xs leading-snug",
            v === "plataforma" || v === "inteligencia" ? "text-slate-600" : "text-white/65",
          )}
        >
          {copy.consentLabel}
        </label>
      </div>
      {fieldErrors.consent ? (
        <p id={`lead-consent-err-${source}`} className="mt-2 text-xs text-red-400">
          {fieldErrors.consent}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-bold transition disabled:opacity-60",
          v === "home" && "bg-yoobe-purple text-white hover:bg-yoobe-purple/90",
          v === "plataforma" && "bg-brand-navy-dark text-white hover:bg-brand-navy-dark/90",
          v === "api" && "bg-cyan-500 text-[#0a0f18] hover:bg-cyan-400",
          v === "gamificacao" &&
            "bg-linear-to-r from-yoobe-purple to-fuchsia-600 text-white hover:opacity-95",
          v === "casos" && "bg-brand-orange text-white hover:bg-brand-orange/90",
          v === "inteligencia" && "bg-brand-navy-dark text-white hover:bg-brand-navy-dark/90",
          v === "marketing" && "bg-brand-orange text-white hover:bg-brand-orange/90",
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            {copy.submitting}
          </>
        ) : (
          copy.submit
        )}
      </button>
    </form>
  );
}
