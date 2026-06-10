"use client";

import { getSanityImageUrl } from "@/sanity/lib/image";
import type { BlogAuthorProfile } from "@/sanity/lib/types";
import { ExternalLink, UserRound } from "lucide-react";
import Image from "next/image";

type Props = {
  profile: BlogAuthorProfile;
  locale: "pt" | "en";
  aiGenerated?: boolean;
};

export default function BlogAuthorBio({ profile, locale, aiGenerated }: Props) {
  if (!profile.bio?.trim()) return null;

  const avatarUrl = getSanityImageUrl(profile.avatar);
  const writtenBy = locale === "pt" ? "Escrito por" : "Written by";
  const aiNote =
    locale === "pt"
      ? "Conteúdo gerado com apoio de IA e revisado editorialmente."
      : "AI-assisted content, editorially reviewed.";

  return (
    <aside
      className="mb-12 rounded-2xl border border-white/10 bg-white/4 p-6 md:p-8"
      aria-label={writtenBy}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={profile.avatar?.alt || profile.name}
            width={72}
            height={72}
            className="h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-2 ring-brand-orange/30"
          />
        ) : (
          <div
            className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand-orange/20 to-yoobe-purple/30 ring-2 ring-brand-orange/20"
            aria-hidden
          >
            <UserRound className="h-8 w-8 text-brand-orange/80" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-orange/90">
            {writtenBy}
          </p>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="font-heading text-xl font-bold text-white">{profile.name}</h2>
            {profile.role ? (
              <span className="text-sm text-white/50">{profile.role}</span>
            ) : null}
            {profile.profileUrl ? (
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-brand-orange/90 transition-colors hover:text-brand-orange"
              >
                {locale === "pt" ? "Perfil" : "Profile"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
          <p className="text-base leading-relaxed text-white/70">{profile.bio}</p>
          {aiGenerated ? (
            <p className="mt-3 text-xs text-white/40">{aiNote}</p>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
