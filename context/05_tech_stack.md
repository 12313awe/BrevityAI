Bu dosya, projenin temel teknoloji yığınını ve ilgili araçları tanımlar.

# AI Destekli Özetleyici ve Not Çıkarıcı Platform — Teknoloji Yığını

Bu doküman, AI Destekli Özetleyici ve Not Çıkarıcı Platformu'nun geliştirilmesi için kullanılacak temel teknoloji yığınını, kütüphaneleri ve araçları detaylandırmaktadır. Proje, tamamen client-side çalışacak şekilde, modern ve verimli web teknolojileri üzerine inşa edilecektir.

---

## 1. Frontend Geliştirme:

*   **Framework:** **Next.js (React tabanlı)**
    *   **Neden:** React'ın bileşen tabanlı yapısı, iyi dokümantasyon, geniş topluluk desteği ve geliştirme hızı. Next.js, istemci tarafı yönlendirme, optimizasyonlar ve genel geliştirici deneyimi için tercih edilmiştir.
*   **Dil:** **TypeScript**
    *   **Neden:** Tip güvenliği, kod kalitesi, hata yakalama yetenekleri ve büyük ölçekli uygulamaların geliştirilmesinde sağladığı kolaylıklar.

## 2. Stil ve UI Kütüphanesi:

*   **CSS Framework:** **Tailwind CSS**
    *   **Neden:** Hızlı ve esnek responsive tasarım imkanı, utility-first yaklaşımı ile stil oluşturma kolaylığı, özelleştirilebilirlik ve performans.
*   **UI Bileşenleri (Opsiyonel):** Gerekirse Radix UI, Headless UI gibi erişilebilir ve stilize edilebilir başsız UI kütüphaneleri kullanılabilir. Ancak öncelik Tailwind ile özel bileşenler geliştirmek olacaktır.

## 3. Yapay Zeka Entegrasyonu:

*   **AI Modeli:** **Google Gemini API**
    *   **Neden:** Metin özetleme ve not çıkarma yetenekleri için güçlü ve esnek bir yapay zeka modeli. Google Cloud Platform üzerindeki API'lara doğrudan client-side erişim sağlanacaktır (API anahtarının güvenli yönetimi kritik).

## 4. Veri Depolama:

*   **Client-Side Veritabanı:** **IndexedDB (tercihen)** veya **localStorage**
    *   **Neden:** Kullanıcı verilerinin (özetler, notlar, ayarlar) doğrudan kullanıcının cihazında, client-side olarak depolanması. Bu, gizliliği en üst düzeye çıkarır ve sunucu maliyetini ortadan kaldırır. IndexedDB, daha yapısal ve büyük veri kümeleri için localStorage'a göre daha gelişmiş bir çözüm sunar.
    *   **Kütüphane (Opsiyonel):** Dexter, PouchDB gibi IndexedDB'yi kolaylaştıran bir wrapper kütüphane kullanılabilir.

## 5. Hosting ve Dağıtım:

*   **Statik Site Barındırma:** **Vercel** veya **Netlify**
    *   **Neden:** Serverless mimari ile statik Next.js uygulamalarını ücretsiz veya çok düşük maliyetle barındırma imkanı [[memory:2764547]]. Otomatik dağıtım, CDN ve global performans avantajları.

## 6. Geliştirme Araçları ve Diğerleri:

*   **Paket Yöneticisi:** npm veya Yarn
*   **Kod Biçimlendirme:** Prettier
*   **Linting:** ESLint (TypeScript ve React için yapılandırılmış)
*   **Versiyon Kontrol Sistemi:** Git
*   **Editör:** Visual Studio Code (önerilen)

---

Bu teknoloji yığını, projenin modern, performanslı, gizlilik odaklı ve maliyet-etkin olma hedeflerini desteklemektedir.
