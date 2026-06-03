import ApiIntegracoesSubnav from "@/components/ApiIntegracoesSubnav";

export default function EnApiIntegracoesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="min-h-screen bg-surface-base text-white">
      <ApiIntegracoesSubnav />
      {children}
    </div>
  );
}
