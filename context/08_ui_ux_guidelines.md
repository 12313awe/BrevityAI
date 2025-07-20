Bu dosya, projenin kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) yönergelerini tanımlar.

# AI Destekli Özetleyici ve Not Çıkarıcı Platform — UI/UX Yönergeleri

Bu doküman, AI Destekli Özetleyici ve Not Çıkarıcı Platformu'nun kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) tasarım prensiplerini belirlemektedir. Amacımız, basit, modern, sezgisel, erişilebilir ve performanslı bir uygulama deneyimi sunmaktır.

---

## 1. Genel UI/UX Prensipleri:

*   **Basitlik ve Minimalizm:** Gereksiz görsel öğelerden ve karmaşık navigasyondan kaçınılmalıdır. Kullanıcının ana görevi olan özetleme ve not çıkarma işlemine odaklanmasını sağlayacak temiz bir tasarım hedeflenmelidir.
*   **Sezgisellik:** Kullanıcılar, herhangi bir eğitim almadan veya kılavuz okumadan uygulamanın nasıl kullanılacağını kolayca anlamalıdır.
*   **Tutarlılık:** Renkler, tipografi, boşluklar, bileşen stilleri ve etkileşimler tüm uygulamada tutarlı olmalıdır.
*   **Geri Bildirim:** Kullanıcı eylemlerine (butona tıklama, metin girme, API isteği gönderme) anında ve net görsel geri bildirimler (yükleme göstergeleri, başarı/hata mesajları) sağlanmalıdır.
*   **Erişilebilirlik (Accessibility - A11y):** Tüm kullanıcıların, engelli kullanıcılar da dahil olmak üzere uygulamayı kolayca kullanabilmesi için WCAG (Web İçeriği Erişilebilirlik Yönergeleri) standartlarına uyulmalıdır. Klavye navigasyonu, ekran okuyucu uyumluluğu ve yeterli renk kontrastı sağlanmalıdır.
*   **Performans:** UI, hızlı yüklenmeli ve akıcı çalışmalıdır. Animasyonlar ve geçişler optimize edilmeli, gereksiz yeniden render (re-render) işlemlerinden kaçınılmalıdır.

## 2. Tasarım Estetiği ve Stili:

*   **Modern ve Temiz:** Çağdaş bir görünüm ve his sunan düz, modern tasarım öğeleri kullanılmalıdır.
*   **Renk Paleti:** Sade ve işlevsel bir renk paleti seçilmelidir. Ana eylemleri ve önemli bilgileri vurgulamak için dikkat çekici ama göz yormayan vurgu renkleri kullanılabilir.
    *   **Önerilen Renkler:** Nötr gri tonları (arka plan, metin), yumuşak maviler veya yeşiller (vurgu, etkileşimli öğeler).
*   **Tipografi:** Okunabilirliği yüksek, modern sans-serif yazı tipleri tercih edilmelidir. Başlıklar ve metinler arasında net bir hiyerarşi oluşturulmalıdır.
*   **Boşluk (Whitespace):** Tasarımda yeterli boşluk kullanılarak öğeler arasında nefes alma alanı bırakılmalı ve görsel karmaşa önlenmelidir.
*   **Görsel Hiyerarşi:** Önemli bilgiler ve eylemler görsel olarak daha belirgin hale getirilmelidir.

## 3. Duyarlı Tasarım (Responsive Design):

*   **Mobil İlk Yaklaşım:** Tasarım, önce mobil cihazlar için optimize edilmeli, daha sonra tablet ve masaüstü boyutlarına genişletilmelidir. Tailwind CSS'in responsive utility sınıfları etkin bir şekilde kullanılmalıdır.
*   **Esnek Düzenler:** Tüm UI öğeleri, ekran boyutuna ve yönüne (portre/yatay) göre sorunsuz bir şekilde yeniden düzenlenmelidir.
*   **Dokunmatik Hedefler:** Butonlar ve etkileşimli öğeler, mobil cihazlarda kolayca dokunulabilir boyutta olmalıdır.

## 4. Kullanıcı Akışı ve Etkileşimler:

*   **Giriş Alanları:** Metin giriş alanları (textarea) büyük ve kullanıcı dostu olmalı, dosya yükleme için açıkça belirtilmiş bir alan bulunmalıdır.
*   **Buton Durumları:** Butonlar, normal, hover, focus, active ve disabled durumları için belirgin görsel geri bildirimlere sahip olmalıdır.
*   **Yükleme Durumları:** AI işlemleri sırasında (özetleme, not çıkarma) kullanıcıya işlemin devam ettiğini belirten yükleme göstergeleri (spinner, progress bar) sunulmalıdır.
*   **Kaydetme ve Yönetme:** Kaydedilen özetler ve notlar için net bir listeleme ve düzenleme/silme arayüzü sağlanmalıdır.
*   **Ayarlar:** API anahtarı girişi gibi hassas bilgiler için güvenli ve kullanıcı dostu giriş alanları sunulmalıdır.

---

Bu UI/UX yönergeleri, AI Destekli Özetleyici ve Not Çıkarıcı Platformu'nun kullanıcılar için çekici, işlevsel ve keyifli bir deneyim sunmasını sağlayacaktır.
