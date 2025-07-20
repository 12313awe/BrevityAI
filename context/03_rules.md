Bu dosya, yapay zekanın uyması gereken genel kuralları ve kısıtlamaları içerir.

# Yapay Zeka Kuralları ve Kısıtlamaları

## Genel Kurallar:

*   **Türkçe Yanıtlama:** Her zaman Türkçe yanıt verin [[memory:USER_DEFINED_RULE_ALWAYS_RESPOND_IN_TURKISH]].
*   **Doğal Konuşma Akışı:** Teknik iyileştirmeler uygularken bile doğal bir konuşma akışını sürdürün [[memory:2711558]].
*   **Orta Uzunlukta Yanıtlar:** Açıkça kısa veya uzun yanıtlar istenmedikçe, yanıtlar orta uzunlukta ve uygun markdown biçimlendirmesiyle olmalıdır [[memory:2711555]].
*   **Güvenilirlik:** SkalGPT AI asistanı, görüntü ve görsel tanıma dışındaki tüm görevleri yerine getirebilmelidir [[memory:2741462]].
*   **Açıklık ve Şeffaflık:** Yaptığınız her adımı açıklayın ve nedenini belirtin.
*   **Kullanıcı Onayı:** Önemli değişiklikler veya potansiyel risk taşıyan işlemler öncesinde kullanıcıdan onay alın.
*   **Etik İlkeler:** Veri gizliliği ve güvenliği başta olmak üzere etik ilkelere her zaman bağlı kalın.

## Projeye Özel Kısıtlamalar:

*   **Sunucusuz ve Ücretsiz Hosting:** Proje için hosting hizmetleri tamamen ücretsiz olmalı veya ücretsiz bir plana sahip olmalıdır [[memory:2764547]]. Bu nedenle Vercel veya Netlify gibi statik site barındırma çözümleri tercih edilmelidir.
*   **Client-Side Çalışma:** Uygulama tamamen client-side çalışacak, sunucu tarafı bileşenleri olmayacaktır.
*   **Veri Depolama:** Tüm kullanıcı verileri `localStorage` veya `IndexedDB` gibi tarayıcı tabanlı depolama yöntemlerinde saklanacaktır. Sunucuda veri depolama yapılmayacaktır.
*   **API Kullanımı:** Sadece metin işleme için Gemini gibi yapay zeka API'ları kullanılacaktır. Bu API istekleri doğrudan client'tan yapılacaktır.
*   **Maliyet Odaklı:** Başlangıç ve sürdürme maliyeti sıfıra yakın olmalı.
*   **Görsel İşlem Yok:** SkalGPT AI asistanı, görüntü ve görsel tanıma görevlerini gerçekleştiremez. Bu nedenle, projede bu tür özellikler talep edilmemelidir.

## Kodlama Kuralları:

*   **Teknoloji Yığınına Bağlılık:** Next.js (React tabanlı), TypeScript, Tailwind CSS, Gemini API ve tarayıcı yerel depolama mekanizmaları (`IndexedDB` tercihen) kullanılacaktır.
*   **Responsive Tasarım:** Uygulama masaüstü ve mobil cihazlarda sorunsuz çalışacak şekilde responsive tasarıma sahip olmalıdır.
*   **Temiz Kod:** Okunabilir, sürdürülebilir ve iyi belgelenmiş kod yazılmalıdır.
*   **Performans Optimizasyonu:** Uygulamanın hızlı ve stabil çalışması için performans optimizasyonlarına dikkat edilmelidir.
*   **Erişilebilirlik:** Uygulama erişilebilirlik standartlarına uygun olmalıdır.