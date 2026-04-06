import CasosHero from "@/components/CasosHero";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import CasosPageCta from "@/components/CasosPageCta";

export default function CasosDeUsoPage() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <CasosHero />
      <CaseStudiesGrid />

      <CasosPageCta />
    </div>
  );
}
