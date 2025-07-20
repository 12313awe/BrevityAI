# BrevityAI - AI Destekli Özetleyici ve Not Çıkarıcı Platform

BrevityAI, Google Gemini AI kullanarak metinleri akıllıca özetleyen ve önemli noktaları çıkaran modern bir web uygulamasıdır. Tüm verileriniz güvenle cihazınızda saklanır.

## 🚀 Özellikler

- **AI Destekli Özetleme**: Google Gemini AI ile akıllı metin özetleme
- **Çoklu Dil Desteği**: Türkçe ve İngilizce metinleri destekler
- **Gizlilik Odaklı**: Veriler sadece cihazınızda saklanır
- **Hızlı ve Etkili**: Saniyeler içinde özet ve ana noktalar
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Offline Çalışma**: İnternet bağlantısı olmadan da çalışır

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **AI**: Google Gemini API
- **Depolama**: IndexedDB (LocalForage)
- **UI Bileşenleri**: Custom React bileşenleri
- **İkonlar**: Lucide React

## 📦 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/brevityai/brevityai.git
cd brevityai
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 🔑 API Anahtarı Kurulumu

1. [Google AI Studio](https://ai.google.dev/gemini-api)'ya gidin
2. Ücretsiz bir hesap oluşturun
3. API anahtarınızı alın
4. BrevityAI'da Ayarlar sayfasına gidin
5. API anahtarınızı girin ve kaydedin

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Ana sayfa
│   ├── notes/             # Notlar sayfası
│   ├── settings/          # Ayarlar sayfası
│   └── about/             # Hakkında sayfası
├── components/            # React bileşenleri
│   ├── atoms/             # Temel bileşenler
│   ├── molecules/         # Orta seviye bileşenler
│   └── organisms/         # Karmaşık bileşenler
├── hooks/                 # Custom React hooks
├── lib/                   # Yardımcı kütüphaneler
├── types/                 # TypeScript tip tanımları
└── styles/                # CSS dosyaları
```

## 🔒 Gizlilik ve Güvenlik

- **Yerel Depolama**: Tüm veriler IndexedDB ile cihazınızda saklanır
- **Sunucu Yok**: Hiçbir veri sunucularımıza gönderilmez
- **API Güvenliği**: API anahtarınız güvenle cihazınızda saklanır
- **Açık Kaynak**: Kodları inceleyebilir ve güvenliğini doğrulayabilirsiniz

## 📱 Kullanım

1. **Metin Girin**: Ana sayfada özetlemek istediğiniz metni girin
2. **Seçenekleri Ayarlayın**: Özet uzunluğu, dil ve diğer seçenekleri belirleyin
3. **İşleyin**: "Özetle" butonuna tıklayın ve AI'ın işlemesini bekleyin
4. **Kaydedin**: Sonuçları cihazınızda güvenle saklayın
5. **Yönetin**: Notlarım sayfasında özetlerinizi görüntüleyin ve yönetin

## 🚀 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com)'e projeyi import edin
2. Otomatik olarak deploy edilecektir
3. Custom domain ekleyebilirsiniz

### Netlify

1. [Netlify](https://netlify.com)'e projeyi import edin
2. Build komutu: `npm run build`
3. Publish directory: `out`

### Docker

```bash
# Docker image oluşturun
docker build -t brevityai .

# Container'ı çalıştırın
docker run -p 3000:3000 brevityai
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🆘 Destek

- **Dokümantasyon**: [docs.brevityai.com](https://docs.brevityai.com)
- **Issues**: [GitHub Issues](https://github.com/brevityai/brevityai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/brevityai/brevityai/discussions)
- **Email**: support@brevityai.com

## 🙏 Teşekkürler

- [Google Gemini AI](https://ai.google.dev/gemini-api) - AI özellikleri için
- [Next.js](https://nextjs.org) - React framework'ü için
- [Tailwind CSS](https://tailwindcss.com) - CSS framework'ü için
- [Lucide](https://lucide.dev) - İkonlar için

---

**BrevityAI** ile metinlerinizi akıllıca özetleyin! 🧠✨