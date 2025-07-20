Bu dosya, projenin yazılım mimarisini ve temel bileşenlerini tanımlar.

# AI Destekli Özetleyici ve Not Çıkarıcı Platform — Yazılım Mimarisi

Bu doküman, AI Destekli Özetleyici ve Not Çıkarıcı Platformu'nun yazılım mimarisini ve ana bileşenlerini detaylandırmaktadır. Proje, tamamen client-side çalışacak, sunucusuz ve gizlilik odaklı bir yapıya sahip olacaktır. Bu mimari, düşük maliyet, yüksek performans ve kullanıcı verilerinin güvenliğini sağlamayı hedefler.

---

## 1. Mimari Yaklaşım: Tamamen Client-Side (Frontend Odaklı)

*   **Genel Bakış:** Uygulama, herhangi bir sunucu tarafı bileşeni veya veritabanı olmadan doğrudan kullanıcının web tarayıcısında çalışır. Tüm işlemler (AI API çağrıları hariç) ve veri depolama istemci tarafında gerçekleşir.
*   **Avantajları:**
    *   **Maliyet Etkinliği:** Sunucu ve veritabanı maliyetleri sıfırdır.
    *   **Gizlilik ve Güvenlik:** Kullanıcı verileri cihazından ayrılmaz, bu da veri ihlali riskini minimuma indirir.
    *   **Performans:** Sunucuya gidiş-dönüş süreleri (roundtrip) azaldığı için daha hızlı yanıt süreleri.
    *   **Offline Yetenek:** Tarayıcı tabanlı depolama sayesinde internet bağlantısı olmadan da kısmen çalışabilir.

## 2. Ana Bileşenler ve Akış:

### 2.1. Kullanıcı Arayüzü (UI) Katmanı:
*   **Teknoloji:** Next.js (React tabanlı) ve Tailwind CSS.
*   **Sorumluluklar:**
    *   Kullanıcı girdilerini alma (metin alanı, dosya yükleyici).
    *   Özetleme ve not çıkarma sonuçlarını görüntüleme.
    *   Kaydedilen özetleri/notları listeleme ve yönetme.
    *   Uygulama ayarlarını (API anahtarı, tema) yönetme.
    *   Responsive ve erişilebilir bir kullanıcı deneyimi sunma.
*   **Bileşen Yapısı:** Modüler ve yeniden kullanılabilir React bileşenleri (örn: `TextInput`, `SummaryDisplay`, `NoteList`, `SettingsForm`).

### 2.2. İş Mantığı Katmanı:
*   **Konum:** Doğrudan React bileşenleri içinde veya ayrılmış yardımcı fonksiyonlar/hook'lar (örn: `useSummary`, `useNotes`).
*   **Sorumluluklar:**
    *   Metin ön işleme (temizleme, biçimlendirme).
    *   Gemini API'ye istek gönderme ve yanıtları işleme.
    *   Verileri client-side depolama mekanizmalarına kaydetme ve buradan okuma.
    *   Uygulama içi durum yönetimi (React Context API veya Redux/Zustand gibi hafif bir durum yöneticisi).

### 2.3. Veri Depolama Katmanı:
*   **Teknoloji:** IndexedDB (tercihen) veya localStorage.
*   **Sorumluluklar:**
    *   Kullanıcının özetlediği metinleri, oluşturulan özetleri ve çıkarılan notları kalıcı olarak depolama.
    *   Kullanıcı ayarlarını (örn: API anahtarı, tema tercihleri) saklama.
    *   Veri ekleme, okuma, güncelleme ve silme (CRUD) operasyonlarını yönetme.
    *   Veri güvenliğini ve gizliliğini sağlama (şifreleme yapılmayacak, ancak dışa aktarım olmayacak).
*   **Soyutlama:** Veri depolama operasyonlarını soyutlayan utility fonksiyonları veya bir custom hook (`useIndexedDB` gibi) kullanılabilir.

### 2.4. Harici API Entegrasyonu:
*   **API:** Google Gemini API.
*   **Akış:**
    1.  Kullanıcı metni Ana Sayfa'da girer.
    2.  İş Mantığı katmanı, metni Gemini API'ye uygun formatta gönderir.
    3.  Gemini API, özetlenmiş metni ve çıkarılan notları JSON formatında geri döndürür.
    4.  İş Mantığı katmanı, bu yanıtı işleyerek UI katmanına sunar ve/or depolama katmanına kaydeder.
*   **Güvenlik Notu:** Gemini API anahtarı, kullanıcı tarafından Ayarlar sayfasında girilecek ve client-side depolanacaktır. Bu anahtarın gizliliği kullanıcının sorumluluğundadır ve hassas veriler için kullanılmamalıdır.

---

## 3. Veri Akışı Örneği (Özetleme İşlemi):

1.  Kullanıcı Ana Sayfa'daki metin alanına metin yapıştırır.
2.  `Özetle` butonuna tıklar.
3.  UI bileşeni, metni İş Mantığı katmanındaki bir fonksiyona iletir.
4.  İş Mantığı fonksiyonu, metni ön işler ve Gemini API'ye bir istek (fetch) gönderir.
5.  API'dan gelen özetlenmiş metin ve notlar alınır.
6.  İşlenmiş sonuçlar, UI bileşenine geri döndürülür ve kullanıcıya gösterilir.
7.  Aynı zamanda, sonuçlar ve orijinal metin (isteğe bağlı), Veri Depolama katmanı aracılığıyla IndexedDB'ye kaydedilir.

---

Bu mimari, projenin tamamen client-side, gizlilik odaklı ve maliyet-etkin çalışma prensiplerine uygun olarak geliştirilmesini sağlayacaktır.