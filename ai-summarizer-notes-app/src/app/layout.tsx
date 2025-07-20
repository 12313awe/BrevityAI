import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/molecules/Header';
import { Footer } from '@/components/molecules/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BrevityAI - AI Destekli Özetleyici ve Not Çıkarıcı',
  description: 'Metinlerinizi hızlıca özetleyin ve önemli noktaları çıkarın. AI destekli akıllı özetleme platformu.',
  keywords: 'AI, özet, özetleme, not çıkarma, yapay zeka, metin analizi',
  authors: [{ name: 'BrevityAI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'BrevityAI - AI Destekli Özetleyici',
    description: 'Metinlerinizi hızlıca özetleyin ve önemli noktaları çıkarın.',
    type: 'website',
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrevityAI - AI Destekli Özetleyici',
    description: 'Metinlerinizi hızlıca özetleyin ve önemli noktaları çıkarın.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-secondary-50">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}