import ApiIntegracoesSubnav from "@/components/ApiIntegracoesSubnav";

export default function ApiIntegracoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#0a0f18] text-white">
      <ApiIntegracoesSubnav />
      {children}
    </div>
  );
}
