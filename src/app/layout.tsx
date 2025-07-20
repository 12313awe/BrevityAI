import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrevityAI - AI Destekli Özetleyici ve Not Çıkarıcı",
  description: "Metinlerinizi AI ile hızlıca özetleyin ve önemli notları çıkarın. Tamamen gizli, client-side çalışan platform.",
  keywords: "AI, özet, not çıkarma, metin analizi, yapay zeka, özetleme",
  authors: [{ name: "BrevityAI" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}