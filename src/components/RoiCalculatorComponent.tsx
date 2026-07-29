"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, CheckCircle2, TrendingUp, Users, DollarSign, Award, ShieldCheck } from "lucide-react";
import TrackedOutboundLink from "@/components/analytics/TrackedOutboundLink";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { DEFAULT_CALENDLY_URL } from "@/lib/calendly";

type Props = {
  locale: "pt" | "en";
};

export default function RoiCalculatorComponent({ locale }: Props) {
  const [employees, setEmployees] = useState<number>(250);
  const [avgSalary, setAvgSalary] = useState<number>(6500);
  const [turnoverRate, setTurnoverRate] = useState<number>(18);

  const isPt = locale === "pt";

  // Financial Math for ROI
  // Cost to replace an employee = 1.5x monthly salary
  const replacementCostPerEmployee = avgSalary * 1.5;
  const annualDepartures = Math.round((employees * turnoverRate) / 100);
  const currentAnnualTurnoverCost = annualDepartures * replacementCostPerEmployee;

  // Expected 4unik Impact:
  // 1. Turnover Reduction: -25% turnover
  const turnoverReductionPct = 25;
  const savedDepartures = Math.round((annualDepartures * turnoverReductionPct) / 100);
  const turnoverSavings = savedDepartures * replacementCostPerEmployee;

  // 2. Productivity & Engagement Gain: ~ R$ 450 per employee/year in operational efficiency
  const productivitySavings = employees * 450;

  // 3. Logistics & Swag Savings: 40% reduction in wasted kits & physical store operations (~ R$ 200 per employee/year)
  const logisticsSavings = employees * 200;

  // Total Estimated Savings
  const totalAnnualSavings = turnoverSavings + productivitySavings + logisticsSavings;

  // Estimated 4unik Investment (~ R$ 18 per employee/month)
  const estimatedAnnualInvestment = employees * 18 * 12;

  // Net Annual ROI Multiple
  const netSavings = totalAnnualSavings - estimatedAnnualInvestment;
  const roiMultiple = estimatedAnnualInvestment > 0 ? (totalAnnualSavings / estimatedAnnualInvestment).toFixed(1) : "4.5";

  const currencySymbol = isPt ? "R$" : "$";
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat(isPt ? "pt-BR" : "en-US", {
      style: "currency",
      currency: isPt ? "BRL" : "USD",
      maximumFractionDigits: 0,
    }).format(val);

  const prefilledCalendlyUrl = `${DEFAULT_CALENDLY_URL}?text_details=${encodeURIComponent(
    `Simulação ROI 4unik (${employees} colaboradores, ROI estimado: ${formatCurrency(netSavings)})`
  )}`;

  return (
    <main className="min-h-screen bg-surface-section pb-24 pt-32 text-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <Calculator className="h-4 w-4" />
            {isPt ? "Calculadora de ROI de Engajamento" : "Engagement ROI Calculator"}
          </span>
          <h1 className="mb-6 font-heading text-4xl font-black leading-tight md:text-6xl">
            {isPt ? (
              <>
                Simule o impacto financeiro da <span className="text-brand-orange">4unik</span> no seu time
              </>
            ) : (
              <>
                Calculate 4unik’s financial impact on <span className="text-brand-orange">your workforce</span>
              </>
            )}
          </h1>
          <p className="text-lg text-white/70 md:text-xl">
            {isPt
              ? "Descubra quanto sua empresa pode economizar reduzindo o turnover, otimizando o envio de brindes e impulsionando o engajamento com gamificação."
              : "Discover how much your company can save by reducing turnover, streamlining reward logistics, and boosting engagement through gamification."}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Controls Inputs Panel */}
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8 lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-6 font-heading text-xl font-bold text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-orange" />
              {isPt ? "Dados da sua empresa" : "Your company metrics"}
            </h2>

            <div className="space-y-6">
              {/* Input 1: Number of Employees */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/80">
                    {isPt ? "Número de colaboradores" : "Number of employees"}
                  </label>
                  <span className="font-heading text-lg font-bold text-brand-orange">{employees}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="3000"
                  step="10"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-orange"
                />
                <div className="mt-1 flex justify-between text-xs text-white/40">
                  <span>20</span>
                  <span>1.500</span>
                  <span>3.000+</span>
                </div>
              </div>

              {/* Input 2: Average Monthly Salary */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/80">
                    {isPt ? "Salário médio mensal" : "Average monthly salary"}
                  </label>
                  <span className="font-heading text-lg font-bold text-brand-orange">{formatCurrency(avgSalary)}</span>
                </div>
                <input
                  type="range"
                  min="2500"
                  max="25000"
                  step="500"
                  value={avgSalary}
                  onChange={(e) => setAvgSalary(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-orange"
                />
                <div className="mt-1 flex justify-between text-xs text-white/40">
                  <span>{formatCurrency(2500)}</span>
                  <span>{formatCurrency(12000)}</span>
                  <span>{formatCurrency(25000)}</span>
                </div>
              </div>

              {/* Input 3: Turnover Rate */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-semibold text-white/80">
                    {isPt ? "Taxa anual de turnover estimada" : "Estimated annual turnover rate"}
                  </label>
                  <span className="font-heading text-lg font-bold text-brand-orange">{turnoverRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="45"
                  step="1"
                  value={turnoverRate}
                  onChange={(e) => setTurnoverRate(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-brand-orange"
                />
                <div className="mt-1 flex justify-between text-xs text-white/40">
                  <span>5% (Baixo)</span>
                  <span>20% (Médio)</span>
                  <span>45% (Alto)</span>
                </div>
              </div>
            </div>

            {/* Current Loss Summary Card */}
            <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-white/80">
              <div className="flex items-center justify-between">
                <span>{isPt ? "Custo estimado de substituições/ano:" : "Estimated turnover cost/yr:"}</span>
                <strong className="text-sm text-red-400">{formatCurrency(currentAnnualTurnoverCost)}</strong>
              </div>
              <p className="mt-1 text-white/50">
                {isPt
                  ? `Baseado em cerca de ${annualDepartures} desligamentos/ano (${turnoverRate}%) com custo médio de 1,5× salário por substituição.`
                  : `Based on ~${annualDepartures} departures/yr (${turnoverRate}%) costing 1.5× salary per replacement.`}
              </p>
            </div>
          </motion.div>

          {/* Results Summary Panel */}
          <motion.div
            className="flex flex-col justify-between rounded-3xl border border-brand-orange/30 bg-gradient-to-b from-brand-orange/15 to-surface-card p-6 shadow-2xl backdrop-blur-xl md:p-8 lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  {isPt ? "Retorno Projetado de Investimento" : "Projected Return on Investment"}
                </span>
                <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-black text-black">
                  {roiMultiple}× ROI
                </span>
              </div>

              <div className="mb-6">
                <span className="text-sm text-white/60">{isPt ? "Economia Líquida Anual Estimada:" : "Estimated Net Annual Savings:"}</span>
                <div className="font-heading text-4xl font-black text-brand-orange md:text-5xl">
                  {formatCurrency(netSavings)}
                </div>
                <span className="text-xs text-white/40">
                  {isPt ? "*Após investimento na infraestrutura 4unik" : "*After 4unik infrastructure investment"}
                </span>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {isPt ? "Retenção de talentos (-25% turnover):" : "Talent retention (-25% turnover):"}
                  </span>
                  <strong className="text-emerald-400">+{formatCurrency(turnoverSavings)}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {isPt ? "Produtividade & engajamento:" : "Productivity & engagement:"}
                  </span>
                  <strong className="text-emerald-400">+{formatCurrency(productivitySavings)}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    {isPt ? "Economia em logística & estoque:" : "Logistics & inventory savings:"}
                  </span>
                  <strong className="text-emerald-400">+{formatCurrency(logisticsSavings)}</strong>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3">
              <TrackedOutboundLink
                href={prefilledCalendlyUrl}
                source="roi-calculator-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 font-heading font-bold text-black shadow-lg transition hover:bg-brand-orange/90"
              >
                {isPt ? "Agendar Demonstração com este Relatório" : "Schedule Demo with this Report"}
                <ArrowRight className="h-4 w-4" />
              </TrackedOutboundLink>
            </div>
          </motion.div>
        </div>

        {/* Lead Capture Section */}
        <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                {isPt ? "Receba um estudo personalizado para seu RH" : "Get a customized study for your HR"}
              </h3>
              <p className="text-sm text-white/70">
                {isPt
                  ? "Nossos especialistas calculam a margem exata de economia considerando seu conveniado atual, catálogo e modelo de trabalho (remoto, híbrido ou presencial)."
                  : "Our experts will calculate exact savings based on your current catalog, workforce model, and engagement goals."}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-orange" />
                  {isPt ? "Sem compromisso comercial" : "No commitment"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-brand-orange" />
                  {isPt ? "Estudo confidencial em 24h" : "Confidential study in 24h"}
                </span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <LeadCaptureForm variant="home" source="roi-calculator-page" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
