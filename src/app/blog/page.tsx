import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | 4unik",
  description: "Insights, tendências e guias sobre employee engagement, gamificação e logística de premiações corporativas.",
};

const POSTS = [
  {
    id: 1,
    title: "O Guia Definitivo da Gamificação no RH Moderno",
    excerpt: "Descubra como empresas líderes estão usando mecânicas de jogos para reduzir o turnover e aumentar o engajamento da equipe.",
    date: "Acesso em 12 Mar 2026",
    readTime: "8 min de leitura",
    category: "Engajamento",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "SLA de Logística em Premiações: Por que D+1 muda tudo",
    excerpt: "A frustração do colaborador com o prêmio atrasado pode destruir toda a experiência. Veja como a infraestrutura 4unik resolve isso.",
    date: "Acesso em 05 Mar 2026",
    readTime: "5 min de leitura",
    category: "Logística",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Reconhecimento 360: O poder do feedback Peer-to-Peer",
    excerpt: "Como estruturar um sistema onde colaboradores reconhecem colegas, promovendo a cultura da empresa de forma orgânica.",
    date: "Acesso em 28 Fev 2026",
    readTime: "6 min de leitura",
    category: "Cultura",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Welcome Kits: Causando a melhor primeira impressão",
    excerpt: "O onboarding é crucial. Veja exemplos de cases de sucesso em kits de boas-vindas corporativos montados na plataforma Yoobe.",
    date: "Acesso em 15 Fev 2026",
    readTime: "4 min de leitura",
    category: "Kits & Eventos",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2670&auto=format&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0d1424] min-h-screen text-white">
      {/* Header */}
      <div className="container mx-auto px-4 max-w-6xl mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black mb-6 font-heading">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-yoobe-neon-pink">Estratégias</span>
          </h1>
          <p className="text-xl text-white/60 font-sans leading-relaxed">
            As melhores práticas para transformar a cultura, engajamento e a logística de premiações da sua empresa.
          </p>
        </div>
      </div>

      {/* Featured Post (First Post) */}
      <div className="container mx-auto px-4 max-w-6xl mb-16">
        <Link href={`/blog/${POSTS[0].id}`} className="block group">
          <div className="relative rounded-3xl overflow-hidden glass-panel-dark border border-white/10 flex flex-col md:flex-row h-auto md:h-[400px]">
             <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
               <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f18] via-transparent to-transparent hidden md:block"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-transparent md:hidden"></div>
             </div>
             <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
               <span className="inline-block px-3 py-1 mb-6 rounded-full border border-yoobe-neon-pink/30 bg-yoobe-neon-pink/10 text-yoobe-neon-pink text-xs font-bold tracking-wide uppercase w-fit">
                 {POSTS[0].category}
               </span>
               <h2 className="text-3xl md:text-4xl font-black mb-4 font-heading group-hover:text-brand-orange transition-colors">
                 {POSTS[0].title}
               </h2>
               <p className="text-white/60 text-lg mb-6 font-sans">
                 {POSTS[0].excerpt}
               </p>
               <div className="flex items-center gap-6 text-sm text-white/40 font-sans mt-auto">
                 <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {POSTS[0].date}</div>
                 <div className="flex items-center gap-2"><Clock className="w-4 h-4"/> {POSTS[0].readTime}</div>
               </div>
             </div>
          </div>
        </Link>
      </div>

      {/* Grid Posts */}
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {POSTS.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div className="rounded-3xl overflow-hidden glass-panel-dark border border-white/10 h-full flex flex-col">
                <div className="h-48 relative overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full border border-yoobe-purple/30 bg-yoobe-purple/10 text-yoobe-purple text-xs font-bold tracking-wide uppercase w-fit">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-yoobe-purple transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 font-sans mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-white/40 font-sans border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {post.date}</div>
                    <div className="flex items-center gap-2 font-medium text-brand-orange group-hover:translate-x-1 transition-transform">Ler Mais <ArrowRight className="w-4 h-4"/></div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
