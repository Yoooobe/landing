/** Normalizes menu section titles for PT/EN CMS vs code fallback matching. */
export function normalizeShellMenuSectionTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

type ShellMenuSectionLike<TItem> = {
  title?: string;
  items?: TItem[];
};

/**
 * Merges CMS shell menu sections with code fallbacks:
 * - matches sections by title (not only index), so CMS reordering does not misalign items;
 * - appends fallback sections missing from CMS (e.g. "Soluções por perfil" when Studio menu is older).
 */
export function mergeShellMenuSections<TSection extends { title: string; items: TItem[] }, TItem>(
  cmsSections: Array<ShellMenuSectionLike<TItem>> | null | undefined,
  fallbackSections: TSection[],
  mergeItem: (cmsItem: TItem | undefined, fallbackItem: TItem | undefined) => TItem,
): TSection[] {
  if (!cmsSections?.length) {
    return fallbackSections;
  }

  const cmsTitleKeys = new Set(
    cmsSections.map((section) => normalizeShellMenuSectionTitle(section.title || "")),
  );

  const mergedFromCms = cmsSections.map((section, sectionIndex) => {
    const normalizedTitle = normalizeShellMenuSectionTitle(section.title || "");
    const fallbackSection =
      fallbackSections.find(
        (candidate) => normalizeShellMenuSectionTitle(candidate.title) === normalizedTitle,
      ) ?? fallbackSections[sectionIndex];

    const sourceItems = section.items?.length
      ? section.items
      : fallbackSection?.items ?? [];

    return {
      title: section.title || fallbackSection?.title || "Menu",
      items: sourceItems.map((item, itemIndex) =>
        mergeItem(item, fallbackSection?.items[itemIndex]),
      ),
    } as TSection;
  });

  const appendedFallback = fallbackSections.filter((section) => {
    const key = normalizeShellMenuSectionTitle(section.title);
    return key && !cmsTitleKeys.has(key);
  });

  return [...mergedFromCms, ...appendedFallback];
}
