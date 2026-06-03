import ApiIntegracoesSubnav from "@/components/ApiIntegracoesSubnav";

export default function ApiIntegracoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-surface-base text-white">
      <ApiIntegracoesSubnav />
      {children}
    </div>
  );
}
