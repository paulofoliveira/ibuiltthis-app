import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Footer from "@/components/common/footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iBuiltThis - Compartilhe suas criações, descubra novos lançamentos",
  description: "Uma comunidade para apresentar seus aplicativos, ferramentas de IA, produtos SaaS e projetos criativos. Lançamentos autênticos, pessoas reais e opiniões sinceras.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR"
        className={`${outfit.className} antialiased`}>
        <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
