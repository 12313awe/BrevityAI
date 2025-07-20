# AI Destekli Özetleyici ve Not Çıkarıcı Platform — Proje Açıklaması

**Proje Amacı:**
Bu proje, kullanıcıların PDF, web makaleleri veya uzun metinleri kolayca özetleyebileceği ve metinlerden önemli notlar çıkarabileceği tamamen web tabanlı, AI destekli bir uygulama geliştirmeyi hedefler. Proje, kullanıcı dostu, hızlı ve güvenilir bir deneyim sunarak özellikle öğrenciler, araştırmacılar ve içerik üreticilerinin işlerini kolaylaştıracaktır.

---

## Temel Özellikler

* **Tamamen Client-Side Çalışma:**
  Proje sunucu tarafı bileşenleri olmadan, kullanıcı cihazında çalışır. Veriler `localStorage` veya `IndexedDB` gibi tarayıcı tabanlı depolama yöntemlerinde saklanır. Böylece gizlilik en üst düzeydedir ve herhangi bir sunucu maliyeti oluşmaz.

* **Mobil Uyumluluk (Responsive Tasarım):**
  Uygulama masaüstü ve mobil cihazlarda sorunsuz ve akıcı çalışacak şekilde tasarlanmıştır.

* **AI Destekli Özetleme ve Not Çıkarma:**
  Gemini gibi modern yapay zekâ API’leri kullanılarak, kullanıcıların yüklediği veya yapıştırdığı uzun metinlerin otomatik özeti oluşturulur. Ayrıca önemli noktalar, anahtar cümleler ve notlar çıkarılır.

* **Kullanıcı Arayüzü:**
  Kolay kullanılabilir, modern ve erişilebilir UI bileşenleriyle zenginleştirilmiştir. Özetleme sonuçları ve notlar dinamik olarak listelenir ve kullanıcı bunları düzenleyebilir, kaydedebilir.

* **Local Veri Yönetimi:**
  Tüm kullanıcı verileri (özetler, notlar, ayarlar) doğrudan kullanıcının cihazında depolanır. Bu, veri güvenliği ve offline kullanım imkanı sağlar.

---

## Teknoloji Yığını

* **Frontend:** Next.js (React tabanlı), TypeScript ile yazılmıştır.
* **Stil:** Tailwind CSS kullanılarak hızlı ve esnek responsive tasarım yapılmıştır.
* **Yapay Zekâ Entegrasyonu:** Gemini üzerinden metin işleme sağlanır.
* **Veri Depolama:** Tarayıcı yerel depolama mekanizmaları (`IndexedDB` tercihen) kullanılır.
* **Hosting:** Proje statik olarak Vercel, Netlify gibi serverless platformlarda barındırılır.

---

## Mimari ve Çalışma Prensibi

1. Kullanıcı metin yükler veya yapıştırır.
2. İstemci tarafında metin, Gemini'ye özetleme ve not çıkarma için gönderilir.
3. AI’dan dönen özet ve notlar kullanıcı arayüzünde gösterilir.
4. Kullanıcı, özetleri ve notları düzenleyebilir, cihazında saklayabilir.
5. Uygulama tamamen client-side olduğu için veri dışarıya gönderilmez veya sunucuya kaydedilmez (API isteği sadece metin işleme için).

---

## Proje Gereksinimleri ve Hedefler

* **Performans:** Özetleme işlemi hızlı ve stabil olmalı.
* **Gizlilik:** Kullanıcı verileri kesinlikle dışarıya aktarılmaz ve local olarak saklanır.
* **Kullanılabilirlik:** Basit, anlaşılır ve erişilebilir bir UI tasarlanmalı.
* **Genişletilebilirlik:** Gelecekte farklı diller ve dosya formatları desteklenebilmeli.
* **Maliyet:** Başlangıç ve sürdürme maliyeti sıfıra yakın, sunucusuz bir yapı tercih edilmeli.

---

## Özet

Bu proje, yapay zekanın metin anlama ve özetleme yeteneklerini modern web teknolojileriyle birleştirerek, kullanıcıların uzun metinlerden hızlıca anlamlı özetler ve notlar çıkarmasını sağlayan, maliyeti çok düşük, gizlilik odaklı, tamamen client-side çalışan bir web uygulamasıdır.
