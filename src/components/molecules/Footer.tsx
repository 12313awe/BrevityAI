import React from 'react';
import { Heart, Shield, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">BrevityAI</h3>
            <p className="text-neutral-600 text-sm">
              AI destekli özetleme ve not çıkarma platformu. Metinlerinizi hızla özetleyin, 
              önemli notları çıkarın.
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-md font-medium text-neutral-900 mb-3">Özellikler</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <Shield className="w-4 h-4 text-primary-600" />
                <span>Tamamen Gizli</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <Zap className="w-4 h-4 text-primary-600" />
                <span>Hızlı İşlem</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <Heart className="w-4 h-4 text-primary-600" />
                <span>Kullanıcı Dostu</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="text-md font-medium text-neutral-900 mb-3">Gizlilik</h4>
            <p className="text-sm text-neutral-600">
              Tüm verileriniz cihazınızda güvenle saklanır. 
              Hiçbir veri sunucularımıza gönderilmez.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-8 pt-6 text-center">
          <p className="text-sm text-neutral-500">
            © 2024 BrevityAI. Tüm hakları saklıdır. Tamamen client-side çalışan, gizlilik odaklı platform.
          </p>
        </div>
      </div>
    </footer>
  );
}