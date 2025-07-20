Bu dosya, projenin web sitesi yapısını ve ana sayfalarını tanımlar.

# AI Destekli Özetleyici ve Not Çıkarıcı Platform — Site Yapısı

Bu doküman, AI Destekli Özetleyici ve Not Çıkarıcı Platformu'nun temel sayfa yapısını ve kullanıcı navigasyon akışını tanımlar. Uygulama, tamamen client-side çalıştığı ve basit bir işlevselliğe odaklandığı için minimalist bir site yapısı benimsenmiştir.

---

## Ana Sayfalar ve Rotasyonlar:

### 1. Ana Sayfa (`/`)
*   **Amaç:** Kullanıcıların metin yükleyebileceği veya yapıştırabileceği ana arayüz. Özetleme ve not çıkarma işlemlerinin başlatıldığı merkez nokta.
*   **İçerik:**
    *   Metin giriş alanı (textarea veya dosya yükleme butonu).
    *   "Özetle" ve "Not Çıkar" gibi işlem butonları.
    *   İşlem sonuçlarının (özet, notlar) görüntüleneceği alan.
    *   Kaydedilen özetlere ve notlara hızlı erişim sağlayan bir bölüm (örneğin son kaydedilenler).

### 2. Kaydedilen Notlar ve Özetler (`/notes`)
*   **Amaç:** Kullanıcının daha önce özetlediği metinleri, çıkardığı notları ve bunların özetlerini listeleyen sayfa.
*   **İçerik:**
    *   Kaydedilmiş tüm özet ve notların listesi (arama ve filtreleme özellikleri).
    *   Her bir özet/not öğesi için başlık, tarih, kısa önizleme.
    *   Detay sayfasına gitme veya silme/düzenleme seçenekleri.

### 3. Ayarlar (`/settings`)
*   **Amaç:** Kullanıcıların uygulama ayarlarını (örneğin, Gemini API anahtarı, tema tercihleri, veri yönetimi seçenekleri) düzenleyebileceği sayfa.
*   **İçerik:**
    *   API anahtarı giriş alanı.
    *   Tema seçimi (açık/koyu mod).
    *   Verileri dışa aktarma/içe aktarma seçenekleri.
    *   `IndexedDB` veritabanını temizleme butonu.

### 4. Hakkında/Yardım (`/about` veya `/help`)
*   **Amaç:** Uygulama hakkında genel bilgi, kullanım kılavuzu, gizlilik politikası ve sıkça sorulan soruları içeren sayfa.
*   **İçerik:**
    *   Proje amacı ve temel özelliklerin kısa özeti.
    *   Nasıl kullanılır kılavuzu.
    *   Gizlilik politikası (verilerin client-side saklandığına vurgu).
    *   Sıkça sorulan sorular (SSS).

---

## Navigasyon ve Kullanıcı Akışı:

*   Basit ve sezgisel bir navigasyon çubuğu (header veya sidebar) aracılığıyla ana sayfalara kolay erişim sağlanacaktır.
*   Özetleme ve not çıkarma işlemi Ana Sayfa'dan başlatılır.
*   Sonuçlar anında Ana Sayfa'da görüntülenir ve kullanıcı tarafından kaydedilebilir.
*   Kaydedilen öğeler `/notes` sayfasında yönetilir.
*   Ayarlar ve bilgi sayfaları kolayca erişilebilir olmalıdır.

---

Bu yapı, projenin tamamen client-side çalışma, gizlilik odaklılık ve kullanım kolaylığı hedefleriyle uyumludur.