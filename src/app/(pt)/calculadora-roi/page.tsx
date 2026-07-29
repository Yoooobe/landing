import RoiCalculatorComponent from "@/components/RoiCalculatorComponent";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { buildFaqPageJsonLd } from "@/lib/jsonLd";
import { buildRoutePageMetadata } from "@/lib/seo/routeMetadata";
import { pageAbsoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildRoutePageMetadata(
    {
      title: "Calculadora de ROI de Engajamento Corporativo e RH | 4unik",
      description:
        "Simule o retorno financeiro da plataforma 4unik: redução de turnover, otimização de logística de brindes e ganho de produtividade com gamificação.",
      openGraphDescription:
        "Calcule quanto sua empresa pode economizar com gamificação corporativa, retenção de talentos e logística de recompensas.",
    },
    {
      canonicalPath: "/calculadora-roi/",
      languages: {
        "pt-BR": "/calculadora-roi/",
        en: "/en/calculadora-roi/",
      },
      openGraphPath: "/calculadora-roi/",
      ogLocale: "pt_BR",
      ogRouteKey: "roiCalculator",
    },
  );
}

export default function CalculadoraRoiPage() {
  const pagePath = "/calculadora-roi/";
  const faqItems = [
    {
      q: "Como a calculadora de ROI da 4unik estima a economia de turnover?",
      a: "A estimativa utiliza o custo médio de substituição de colaboradores (1,5x o salário mensal) e aplica uma redução conservadora de 25% na taxa de turnover a partir de iniciativas de reconhecimento contínuo e gamificação corporativa.",
    },
    {
      q: "Qual a economia gerada na logística de brindes e recompensas?",
      a: "Com o catálogo digital 4unik e entrega D+1 sob demanda, as empresas eliminam até 40% dos custos com estoque parado, compras desnecessárias de kits físicos e fretes duplicados.",
    },
  ];

  const faqLd = buildFaqPageJsonLd(pageAbsoluteUrl(pagePath), faqItems);

  return (
    <>
      <JsonLdScript data={{ ...faqLd }} />
      <RoiCalculatorComponent locale="pt" />
    </>
  );
}
