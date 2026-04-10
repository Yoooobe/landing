import ApiIntegracoesSubnav from "@/components/ApiIntegracoesSubnav";

export default function EnApiIntegracoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="min-h-screen bg-[#0a0f18] text-white">
      <ApiIntegracoesSubnav />
      {children}
    </div>
  );
}
