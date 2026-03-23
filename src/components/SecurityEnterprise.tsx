"use client";

import { Shield, Lock, FileKey } from "lucide-react";

export default function SecurityEnterprise() {
  return (
    <section className="py-24 bg-brand-navy-dark relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="glass-panel-dark rounded-[2.5rem] p-10 md:p-16 border border-white/10 relative overflow-hidden">
          {/* Abstract Security Glow */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 relative z-10">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Enterprise Security</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight relative z-10 font-heading">
                Segurança, SSO Corporativo & LGPD
              </h2>
              <p className="text-lg text-white/60 mb-8 relative z-10">
                Lidamos com dados da sua equipe de altíssima prioridade (endereços de entrega, CPFs, nomes de departamento). Nossa plataforma passa pelas mais estritas due-diligences de bancos e empresas Globais de tech.
              </p>
            </div>

            <div className="md:w-1/2 flex flex-col gap-4 w-full relative z-10">
              <div className="bg-[#0f1522] border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl"><Lock className="text-white w-6 h-6" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">SAML / SSO Active Directory</h4>
                  <p className="text-sm text-white/50 leading-relaxed">Integração com Microsoft Entra ID (Azure AD), Okta ou Google Workspace. Se um colaborador sai da empresa, o acesso é quebrado instantaneamente na plataforma.</p>
                </div>
              </div>
              <div className="bg-[#0f1522] border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors">
                <div className="p-3 bg-white/5 rounded-xl"><FileKey className="text-white w-6 h-6" /></div>
                <div>
                  <h4 className="text-white font-bold mb-1">Criptografia e Logs (Audit Trail)</h4>
                  <p className="text-sm text-white/50 leading-relaxed">Qualquer movimentação de moedas ou mudança de permissões do RH fica impressa de forma imutável nos logs de auditoria do sistema por 5 anos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
