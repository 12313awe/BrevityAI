'use client';

import React from 'react';
import { 
  Brain, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  Key,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: Brain,
      title: 'AI Destekli Özetleme',
      description: 'Google Gemini AI kullanarak metinlerinizi akıllıca özetler ve ana noktaları çıkarır.'
    },
    {
      icon: Shield,
      title: 'Gizlilik Odaklı',
      description: 'Verileriniz sadece cihazınızda saklanır. Hiçbir veri sunucularımıza gönderilmez.'
    },
    {
      icon: Zap,
      title: 'Hızlı ve Etkili',
      description: 'Saniyeler içinde uzun metinleri özetler ve önemli bilgileri çıkarır.'
    },
    {
      icon: Globe,
      title: 'Çoklu Dil Desteği',
      description: 'Türkçe ve İngilizce metinleri destekler, istediğiniz dilde özet alabilirsiniz.'
    },
    {
      icon: Database,
      title: 'Yerel Depolama',
      description: 'IndexedDB kullanarak özetlerinizi güvenle cihazınızda saklar.'
    },
    {
      icon: Key,
      title: 'Kendi API Anahtarınız',
      description: 'Kendi Gemini API anahtarınızı kullanarak tam kontrol sahibi olun.'
    }
  ];

  const steps = [
    {
      step: 1,
      title: 'API Anahtarı Alın',
      description: 'Google AI Studio\'dan ücretsiz Gemini API anahtarınızı alın.'
    },
    {
      step: 2,
      title: 'Ayarları Yapılandırın',
      description: 'API anahtarınızı girin ve tercihlerinizi ayarlayın.'
    },
    {
      step: 3,
      title: 'Metni İşleyin',
      description: 'Özetlemek istediğiniz metni yapıştırın ve AI\'ın işlemesini bekleyin.'
    },
    {
      step: 4,
      title: 'Sonuçları Kaydedin',
      description: 'Özetleri ve ana noktaları cihazınızda güvenle saklayın.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Brain className="h-12 w-12 text-primary-600" />
          <h1 className="text-4xl font-bold text-secondary-900">
            BrevityAI
          </h1>
        </div>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          AI destekli akıllı özetleyici ve not çıkarıcı platform. 
          Metinlerinizi hızlıca özetleyin, önemli noktaları çıkarın ve güvenle saklayın.
        </p>
      </div>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
          Özellikler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-secondary-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works */}
      <section>
        <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
          Nasıl Çalışır?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">
                {step.title}
              </h3>
              <p className="text-secondary-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="bg-white rounded-lg shadow-sm border border-secondary-200 p-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900">
            Gizlilik ve Güvenlik
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-900">
              Verileriniz Güvende
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-secondary-600">
                  Tüm veriler sadece cihazınızda saklanır
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-secondary-600">
                  Hiçbir veri sunucularımıza gönderilmez
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-secondary-600">
                  API anahtarınız güvenli şekilde saklanır
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <span className="text-secondary-600">
                  IndexedDB ile şifrelenmiş depolama
                </span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary-900">
              Açık Kaynak
            </h3>
            <p className="text-secondary-600">
              BrevityAI tamamen açık kaynak kodludur. Kodları inceleyebilir, 
              katkıda bulunabilir ve güvenliğini doğrulayabilirsiniz.
            </p>
            <a
              href="https://github.com/brevityai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <span>GitHub'da görüntüle</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* API Information */}
      <section className="bg-blue-50 rounded-lg border border-blue-200 p-8">
        <div className="text-center mb-6">
          <Key className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900">
            Gemini API Hakkında
          </h2>
        </div>
        
        <div className="space-y-4 text-center">
          <p className="text-secondary-600">
            BrevityAI, Google'ın güçlü Gemini AI modelini kullanır. 
            Kendi API anahtarınızı kullanarak tam kontrol sahibi olursunuz.
          </p>
          
          <div className="flex justify-center space-x-4">
            <a
              href="https://ai.google.dev/gemini-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <span>API Anahtarı Al</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <a
              href="https://ai.google.dev/gemini-api/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors"
            >
              <span>Dokümantasyon</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section>
        <h2 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
          Teknik Detaylar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Teknolojiler
            </h3>
            <ul className="space-y-2 text-secondary-600">
              <li>• Next.js 14 (App Router)</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• IndexedDB (LocalForage)</li>
              <li>• Google Gemini AI</li>
              <li>• Progressive Web App (PWA)</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Özellikler
            </h3>
            <ul className="space-y-2 text-secondary-600">
              <li>• Responsive tasarım</li>
              <li>• Offline çalışma</li>
              <li>• Hızlı performans</li>
              <li>• Erişilebilirlik</li>
              <li>• SEO optimizasyonu</li>
              <li>• Modern UI/UX</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}