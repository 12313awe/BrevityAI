import React from 'react';
import { Brain, Shield, Zap, Users, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Başlık */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Brain className="w-12 h-12 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          BrevityAI Hakkında
        </h1>
        <p className="text-lg text-neutral-600">
          AI destekli özetleme ve not çıkarma platformu
        </p>
      </div>

      {/* Platform Amacı */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Platform Amacı</h2>
        <p className="text-neutral-700 leading-relaxed mb-4">
          BrevityAI, dijital çağın bilgi yoğunluğunda kaybolmadan, metinleri hızlı ve etkili bir şekilde 
          anlamanıza yardımcı olmak için tasarlanmış yenilikçi bir web uygulamasıdır. Amacımız, özellikle 
          öğrenciler, araştırmacılar, içerik üreticileri ve yoğun bilgi akışıyla çalışan herkesin, uzun 
          PDF'lerden, web makalelerinden veya herhangi bir metinden ana fikirleri ve önemli noktaları 
          kolayca çıkarmasını sağlamaktır.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Kullanıcı dostu arayüzü ve yapay zeka gücüyle, zamanınızı daha verimli kullanmanızı hedefleriz.
        </p>
      </div>

      {/* Temel Özellikler */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Temel Özelliklerimiz</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 rounded-lg p-2 mt-1">
              <Zap className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Tamamen Client-Side Çalışma</h3>
              <p className="text-neutral-600 text-sm">
                Uygulamamız tamamen tarayıcınızda çalışır, yani herhangi bir sunucu tarafı bileşeni 
                veya karmaşık altyapı gerektirmez. Bu, hızlı, güvenli ve tamamen size özel bir deneyim sunar.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 rounded-lg p-2 mt-1">
              <Shield className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Gizlilik Odaklı Veri Yönetimi</h3>
              <p className="text-neutral-600 text-sm">
                Verileriniz, özetleriniz ve notlarınız yalnızca sizin cihazınızda yerel olarak depolanır. 
                Bu, kişisel verilerinizin gizliliğini en üst düzeyde korur ve internet bağlantınız olmasa 
                bile verilere erişmenizi sağlar.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 rounded-lg p-2 mt-1">
              <Brain className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">AI Destekli Akıllı Özetleme</h3>
              <p className="text-neutral-600 text-sm">
                Google Gemini gibi güçlü yapay zeka API'ları entegrasyonu sayesinde, yüklediğiniz veya 
                yapıştırdığınız metinlerin otomatik olarak özetlerini oluşturur ve metinden anahtar 
                kelimeler, önemli cümleler ve notlar çıkarır.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="bg-primary-100 rounded-lg p-2 mt-1">
              <Heart className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Kullanıcı Dostu Arayüz</h3>
              <p className="text-neutral-600 text-sm">
                Modern, temiz ve sezgisel bir kullanıcı arayüzü ile özetleme ve not çıkarma süreçlerini 
                basitleştiriyoruz. Sonuçları kolayca görebilir, düzenleyebilir ve kaydedebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Kimler İçin */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Kimler İçin?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-900 mb-1">Öğrenciler</h3>
            <p className="text-sm text-neutral-600">
              Ders notlarını, araştırma makalelerini veya ders kitaplarını hızla özetlemek isteyenler.
            </p>
          </div>

          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <Target className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-900 mb-1">Araştırmacılar</h3>
            <p className="text-sm text-neutral-600">
              Büyük veri kümelerinden veya literatür taramalarından önemli bilgileri ayıklamak isteyenler.
            </p>
          </div>

          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <Brain className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-900 mb-1">İçerik Üreticileri</h3>
            <p className="text-sm text-neutral-600">
              Uzun makalelerden veya raporlardan blog yazıları, sosyal medya gönderileri için hızlı notlar çıkarmak isteyenler.
            </p>
          </div>

          <div className="text-center p-4 bg-neutral-50 rounded-lg">
            <Zap className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h3 className="font-semibold text-neutral-900 mb-1">Herkes</h3>
            <p className="text-sm text-neutral-600">
              Bilgi tüketimini optimize etmek ve okuma verimliliğini artırmak isteyenler.
            </p>
          </div>
        </div>
      </div>

      {/* Misyon */}
      <div className="card">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Misyonumuz</h2>
        <p className="text-neutral-700 leading-relaxed text-lg">
          Bilgiyi erişilebilir, yönetilebilir ve anlamlı hale getirmek. Kullanıcılarımızın, bilgiye 
          boğulmadan, en kritik bilgilere odaklanmalarını sağlayarak üretkenliklerini artırmalarına 
          yardımcı olmak.
        </p>
      </div>

      {/* Gizlilik Vurgusu */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Shield className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-green-900">Gizlilik Garantisi</h3>
        </div>
        <p className="text-green-800">
          BrevityAI, verilerinizin gizliliğini en üst düzeyde korur. Tüm özetleriniz, notlarınız ve 
          ayarlarınız yalnızca sizin cihazınızda saklanır. Hiçbir veri sunucularımıza gönderilmez, 
          kaydedilmez veya üçüncü taraflarla paylaşılmaz. Bu, tamamen client-side çalışan mimarimizin 
          doğal bir sonucudur.
        </p>
      </div>

      {/* İletişim */}
      <div className="text-center py-8">
        <p className="text-neutral-600">
          Bu platform hakkında daha fazla bilgi edinmek veya geri bildirimde bulunmak için 
          lütfen bizimle iletişime geçin.
        </p>
      </div>
    </div>
  );
}