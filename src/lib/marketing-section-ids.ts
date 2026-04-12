/** Anchor ids for marketing blocks keyed by Sanity `_key` (legacy section wiring). */
export function marketingSectionId(key: string | undefined): string | undefined {
  switch (key) {
    case "bento-overview":
      return "platform";
    case "platform-management":
      return "gestao";
    case "platform-store":
      return "loja";
    case "gamification-summary":
      return "gamificacao";
    case "pricing":
      return "planos";
    case "mechanics":
      return "mechanics";
    case "admin-dashboard":
      return "gestor";
    case "gamification-engine-intro":
      return "gamificacao";
    case "store-intro":
      return "loja";
    default:
      return undefined;
  }
}

export function marketingExtraAnchorIds(key: string | undefined): string[] {
  switch (key) {
    case "store-intro":
      return ["wallet"];
    default:
      return [];
  }
}
