import { GeminiResponse, ApiError } from '@/types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateSummaryAndNotes(
  text: string, 
  apiKey: string
): Promise<GeminiResponse> {
  if (!apiKey) {
    throw new Error('Gemini API anahtarı gerekli. Lütfen Ayarlar sayfasından API anahtarınızı girin.');
  }

  if (!text.trim()) {
    throw new Error('Özetlenecek metin boş olamaz.');
  }

  const prompt = `
Aşağıdaki metni analiz et ve şu görevleri yerine getir:

1. Metnin ana fikirlerini koruyarak özlü ve anlaşılır bir özet oluştur (maksimum 3-4 paragraf)
2. Metinden en önemli 5-8 anahtar noktayı madde halinde çıkar

Metin:
${text}

Lütfen yanıtını şu JSON formatında ver:
{
  "summary": "Metnin özeti buraya...",
  "notes": ["Not 1", "Not 2", "Not 3", ...]
}
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error('Geçersiz API anahtarı. Lütfen Ayarlar sayfasından doğru API anahtarınızı girin.');
      } else if (response.status === 403) {
        throw new Error('API anahtarınızın Gemini API\'ye erişim izni yok.');
      } else if (response.status === 429) {
        throw new Error('API kullanım limitiniz aşıldı. Lütfen daha sonra tekrar deneyin.');
      } else {
        throw new Error(`API hatası: ${errorData.error?.message || 'Bilinmeyen hata'}`);
      }
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('API\'den geçersiz yanıt alındı.');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    
    // JSON yanıtını parse et
    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('API yanıtında JSON formatı bulunamadı.');
      }
      
      const parsedResponse = JSON.parse(jsonMatch[0]);
      
      if (!parsedResponse.summary || !Array.isArray(parsedResponse.notes)) {
        throw new Error('API yanıtı beklenen formatda değil.');
      }
      
      return {
        summary: parsedResponse.summary,
        notes: parsedResponse.notes
      };
    } catch (parseError) {
      console.error('JSON parse hatası:', parseError);
      throw new Error('API yanıtı işlenirken hata oluştu.');
    }
    
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Ağ hatası: İnternet bağlantınızı kontrol edin.');
  }
}