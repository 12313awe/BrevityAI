'use client';

import React from 'react';
import { Brain, Zap, Shield, FileText } from 'lucide-react';
import TextProcessor from '@/components/organisms/TextProcessor';
import { useSummaries } from '@/hooks/useSummaries';
import { Summary } from '@/types';

export default function HomePage() {
  const { addSummary } = useSummaries();

  const handleSummaryGenerated = async (summary: Summary) => {
    try {
      await addSummary(summary);
      // Başarı mesajı göster
      alert('Özet başarıyla kaydedildi!');
    } catch (error) {
      console.error('Özet kaydedilirken hata:', error);
      alert('Özet kaydedilirken hata oluştu.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Bölümü */}
      <div className="text-center py-12 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            BrevityAI
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            AI destekli özetleme ve not çıkarma platformu. Metinlerinizi hızla özetleyin, 
            önemli notları çıkarın.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-3 mb-3 shadow-sm">
                <Zap className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Hızlı İşlem</h3>
              <p className="text-sm text-neutral-600">
                AI ile saniyeler içinde özet ve notlar
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-3 mb-3 shadow-sm">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Tamamen Gizli</h3>
              <p className="text-sm text-neutral-600">
                Verileriniz cihazınızda güvenle saklanır
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-3 mb-3 shadow-sm">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-1">Akıllı Notlar</h3>
              <p className="text-sm text-neutral-600">
                Önemli noktaları otomatik çıkarır
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metin İşleme Bölümü */}
      <TextProcessor onSummaryGenerated={handleSummaryGenerated} />

      {/* Nasıl Çalışır */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
          Nasıl Çalışır?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Metin Girin</h3>
            <p className="text-neutral-600 text-sm">
              Özetlemek istediğiniz metni yapıştırın veya yazın
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">AI İşlesin</h3>
            <p className="text-neutral-600 text-sm">
              Gemini AI metninizi analiz eder ve özetler
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Kaydedin</h3>
            <p className="text-neutral-600 text-sm">
              Özet ve notlarınızı cihazınızda güvenle saklayın
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}