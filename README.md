# BrevityAI - AI Destekli Özetleyici ve Not Çıkarıcı Platform

BrevityAI, metinlerinizi yapay zeka ile hızlıca özetleyen ve önemli notları çıkaran tamamen client-side çalışan web uygulamasıdır.

## 🚀 Özellikler

- **AI Destekli Özetleme**: Google Gemini API ile güçlü metin özetleme
- **Akıllı Not Çıkarma**: Metinlerden önemli noktaları otomatik çıkarma
- **Tamamen Gizli**: Tüm veriler cihazınızda güvenle saklanır
- **Client-Side**: Sunucu gerektirmez, tamamen tarayıcıda çalışır
- **Responsive Tasarım**: Tüm cihazlarda mükemmel çalışır
- **Hızlı ve Güvenilir**: Modern web teknolojileri ile geliştirilmiştir

## 🛠️ Teknoloji Yığını

- **Frontend**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **Veri Depolama**: IndexedDB (LocalForage)
- **AI API**: Google Gemini
- **İkonlar**: Lucide React

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd brevityai
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:3000` adresini açın.

## 🔧 Yapılandırma

1. Uygulamayı açın ve "Ayarlar" sayfasına gidin
2. [Google AI Studio](https://makersuite.google.com/app/apikey)'dan Gemini API anahtarınızı alın
3. API anahtarını ayarlar sayfasına girin
4. Artık metinlerinizi özetlemeye başlayabilirsiniz!

## 📱 Kullanım

1. **Ana Sayfa**: Özetlemek istediğiniz metni girin
2. **Özetle ve Not Çıkar** butonuna tıklayın
3. AI tarafından oluşturulan özet ve notları inceleyin
4. Beğendiğiniz sonuçları kaydedin
5. **Notlarım** sayfasından kaydedilen özetleri yönetin

## 🔒 Gizlilik

- Tüm verileriniz cihazınızda IndexedDB ile saklanır
- Hiçbir veri sunucularımıza gönderilmez
- API çağrıları sadece özetleme için Gemini'ye yapılır
- Tamamen offline çalışabilir (API çağrıları hariç)

## 🏗️ Proje Yapısı

```
src/
├── app/                 # Next.js App Router sayfaları
├── components/          # React bileşenleri
│   ├── atoms/          # Temel UI bileşenleri
│   ├── molecules/      # Orta seviye bileşenler
│   └── organisms/      # Karmaşık bileşenler
├── hooks/              # Custom React hooks
├── lib/                # Yardımcı fonksiyonlar
└── types/              # TypeScript tip tanımları
```

## 🚀 Dağıtım

Proje Vercel, Netlify gibi statik hosting platformlarında kolayca dağıtılabilir:

```bash
npm run build
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen bir issue açın veya pull request gönderin.

## 📞 Destek

Herhangi bir sorunuz veya öneriniz için lütfen bir issue açın.