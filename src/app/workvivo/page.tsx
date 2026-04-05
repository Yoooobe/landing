import WorkvivoRouteRedirect from "@/components/WorkvivoRouteRedirect";

export default function WorkvivoLegacyRedirectPage() {
  return (
    <WorkvivoRouteRedirect
      href="/api-integracoes/workvivo/"
      message="Redirecionando para API e integrações · Workvivo × Yoobe…"
    />
  );
}
