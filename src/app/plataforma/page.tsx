import PlataformaHero from "@/components/PlataformaHero";
import AdminDashboardHighlight from "@/components/AdminDashboardHighlight";
import PlataformaGamificationEngine from "@/components/PlataformaGamificationEngine";
import PlataformaStore from "@/components/PlataformaStore";
import LogisticsFulfillment from "@/components/LogisticsFulfillment";
import SecurityEnterprise from "@/components/SecurityEnterprise";
import AiRoadmap from "@/components/AiRoadmap";
import PlataformaPageCta from "@/components/PlataformaPageCta";

export default function PlataformaPage() {
  return (
    <div className="bg-brand-navy-dark text-white min-h-screen">
      <PlataformaHero />
      <AdminDashboardHighlight />
      <PlataformaGamificationEngine />
      <PlataformaStore />
      <LogisticsFulfillment />
      <AiRoadmap />
      <SecurityEnterprise />

      <PlataformaPageCta />
    </div>
  );
}
