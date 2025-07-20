# AI Destekli Özetleyici ve Not Çıkarıcı Platform — Görev Listesi

Bu doküman, AI Destekli Özetleyici ve Not Çıkarıcı Platformu projesinin geliştirilmesi için detaylı, adım adım bir görev listesini içermektedir. Bu liste, `commands/02_generate_tasks.txt` komutu çalıştırıldığında yapay zeka tarafından doldurulacaktır. Her görev tamamlandığında, ilgili kutucuk işaretlenmelidir (`[x]`).

---

## 1. Temel Proje Kurulumu ve Yapılandırma

- [ ] Yeni bir Next.js projesi oluştur (TypeScript, ESLint, Tailwind CSS ile).
- [ ] Proje dizinine geç.
- [ ] `tailwind.config.js` dosyasını `context/08_ui_ux_guidelines.md`'deki renk paleti, tipografi ve boşluk kurallarına göre özelleştir.
- [ ] `src/styles/globals.css` dosyasını Tailwind CSS direktifleri ve temel stiller ile ayarla.
- [ ] Temel dosya yapısını oluştur (`src/lib`, `src/components` altında `atoms`, `molecules`, `organisms` klasörleri).

## 2. Kullanıcı Arayüzü (UI) Bileşenleri Geliştirme

### 2.1. Atomlar (En Küçük UI Parçaları)
- [ ] `src/components/atoms/Button.tsx` bileşenini oluştur (responsive ve farklı durumlar için stillerle).
- [ ] `src/components/atoms/Input.tsx` bileşenini oluştur (metin, textarea için).
- [ ] `src/components/atoms/Spinner.tsx` bileşenini oluştur (yükleme göstergeleri için).
- [ ] Diğer gerekli atomları oluştur (örn: `Text`, `Heading`).

### 2.2. Moleküller (Atomların Birleşimi)
- [ ] `src/components/molecules/Header.tsx` bileşenini oluştur (basit navigasyon ve uygulama başlığı).
- [ ] `src/components/molecules/Footer.tsx` bileşenini oluştur.
- [ ] `src/components/molecules/TextareaWithButton.tsx` bileşenini oluştur (metin girişi ve özetle/not çıkar butonu).
- [ ] Diğer gerekli molekülleri oluştur (örn: `SummaryCard`, `NoteItem`).

### 2.3. Organizmalar (Karmaşık UI Bölümleri)
- [ ] `src/components/organisms/SummarySection.tsx` bileşenini oluştur (özetleme sonuçlarını gösteren bölüm).
- [ ] `src/components/organisms/NoteSection.tsx` bileşenini oluştur (not çıkarma sonuçlarını gösteren bölüm).
- [ ] Diğer gerekli organizmaları oluştur (örn: `SettingsForm`).

## 3. Sayfa Geliştirme

- [ ] Ana Sayfa (`/`) için `src/app/page.tsx` dosyasını oluştur ve ilgili UI bileşenlerini entegre et.
- [ ] Kaydedilen Notlar ve Özetler Sayfası (`/notes`) için `src/app/notes/page.tsx` dosyasını oluştur ve listeleme/yönetim özelliklerini ekle.
- [ ] Ayarlar Sayfası (`/settings`) için `src/app/settings/page.tsx` dosyasını oluştur (Gemini API anahtarı, tema ayarları).
- [ ] Hakkında/Yardım Sayfası (`/about` veya `/help`) için `src/app/about/page.tsx` dosyasını oluştur ve `output/content_drafts/about_page_v1.md` içeriğini entegre et.
- [ ] `src/app/layout.tsx` dosyasını, genel uygulama düzeni için `Header` ve `Footer` bileşenlerini içerecek şekilde düzenle.

## 4. İş Mantığı ve Veri Yönetimi

- [ ] Gemini API ile etkileşime girecek client-side bir helper fonksiyonu veya hook oluştur (`src/lib/gemini-api.ts`). API anahtarını Ayarlar'dan almalı.
- [ ] IndexedDB veya localStorage kullanarak client-side veri depolama mekanizmalarını kur (`src/lib/data-storage.ts`). CRUD operasyonlarını desteklemeli.
- [ ] Özetleme ve not çıkarma iş mantığını ilgili bileşenlere veya hook'lara entegre et.
- [ ] Kullanıcı ayarlarını (API anahtarı, tema) yerel olarak kaydetme ve okuma işlevselliğini ekle.
- [ ] Kaydedilen özetleri ve notları listeleme, düzenleme, silme işlevselliğini entegre et.

## 5. Optimizasyon ve Testler

- [ ] Tüm temel özelliklerin fonksiyonel testlerini yap.
- [ ] Farklı cihazlarda ve tarayıcılarda responsive tasarımı test et.
- [ ] Lighthouse veya PageSpeed Insights ile performans denetimi yap ve iyileştirmeler uygula.
- [ ] Erişilebilirlik denetimi yap ve tespit edilen sorunları gider.
- [ ] Güvenlik denetimi yap (`commands/04_security_audit.txt` komutunu kullanarak) ve raporlanan zafiyetleri düzelt.

## 6. Dağıtım

- [ ] Projeyi Vercel veya Netlify'a dağıtım için hazırla.
- [ ] İlk dağıtımı gerçekleştir ve canlı URL'yi doğrula.

---

Bu görev listesi, projenin adım adım geliştirilmesine rehberlik edecektir. Her bir görevi tamamladıkça bu dosyayı güncellemeyi unutmayın. 