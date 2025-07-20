import { GeminiResponse, ProcessingOptions } from '@/types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiRequestBody {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private createPrompt(text: string, options: ProcessingOptions): string {
    const { summaryLength, language, extractKeyPoints, generateTitle } = options;
    
    const lengthInstructions = {
      short: language === 'tr' ? '2-3 cümle' : '2-3 sentences',
      medium: language === 'tr' ? '1 paragraf (4-6 cümle)' : '1 paragraph (4-6 sentences)',
      long: language === 'tr' ? '2-3 paragraf' : '2-3 paragraphs'
    };

    const basePrompt = language === 'tr' 
      ? `Aşağıdaki metni analiz et ve şu görevleri yerine getir:`
      : `Analyze the following text and perform these tasks:`;

    const tasks = [];
    
    if (generateTitle) {
      tasks.push(
        language === 'tr' 
          ? `1. Başlık: Metni özetleyen kısa ve açıklayıcı bir başlık oluştur`
          : `1. Title: Create a short and descriptive title that summarizes the text`
      );
    }

    tasks.push(
      language === 'tr'
        ? `${generateTitle ? '2' : '1'}. Özet: ${lengthInstructions[summaryLength]} uzunluğunda bir özet yaz`
        : `${generateTitle ? '2' : '1'}. Summary: Write a summary of ${lengthInstructions[summaryLength]} length`
    );

    if (extractKeyPoints) {
      tasks.push(
        language === 'tr'
          ? `${generateTitle ? '3' : '2'}. Ana Noktalar: En önemli 3-5 ana noktayı madde halinde listele`
          : `${generateTitle ? '3' : '2'}. Key Points: List the 3-5 most important key points as bullet points`
      );
    }

    const formatInstructions = language === 'tr'
      ? `\n\nCevabını şu JSON formatında ver:`
      : `\n\nProvide your response in the following JSON format:`;

    const jsonFormat = `
{
  ${generateTitle ? '"title": "Başlık buraya",' : ''}
  "summary": "Özet buraya",
  ${extractKeyPoints ? '"keyPoints": ["Nokta 1", "Nokta 2", "Nokta 3"]' : '"keyPoints": []'}
}`;

    const finalInstructions = language === 'tr'
      ? `\n\nSadece JSON formatında cevap ver, başka açıklama ekleme.`
      : `\n\nRespond only in JSON format, do not add any other explanations.`;

    return `${basePrompt}\n\n${tasks.join('\n')}\n${formatInstructions}\n${jsonFormat}\n${finalInstructions}\n\nMetin:\n${text}`;
  }

  async processText(text: string, options: ProcessingOptions): Promise<GeminiResponse> {
    if (!this.apiKey) {
      throw new Error('Gemini API anahtarı bulunamadı');
    }

    if (!text.trim()) {
      throw new Error('Metin boş olamaz');
    }

    const prompt = this.createPrompt(text, options);

    const requestBody: GeminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error('Geçersiz API anahtarı');
        } else if (response.status === 403) {
          throw new Error('API anahtarı erişim izni yok');
        } else if (response.status === 429) {
          throw new Error('API kullanım limiti aşıldı');
        } else {
          throw new Error(`API hatası: ${response.status} - ${errorData.error?.message || 'Bilinmeyen hata'}`);
        }
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Geçersiz API yanıtı');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      
      try {
        // JSON yanıtını parse et
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('JSON formatı bulunamadı');
        }

        const parsedResponse = JSON.parse(jsonMatch[0]);
        
        return {
          title: parsedResponse.title || 'Başlıksız',
          summary: parsedResponse.summary || '',
          keyPoints: parsedResponse.keyPoints || []
        };
      } catch (parseError) {
        console.error('JSON parse hatası:', parseError);
        
        // Fallback: Eğer JSON parse edilemezse, ham metni kullan
        return {
          title: 'Otomatik Özet',
          summary: generatedText,
          keyPoints: []
        };
      }
    } catch (error) {
      console.error('Gemini API hatası:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Bilinmeyen bir hata oluştu');
      }
    }
  }

  static validateApiKey(apiKey: string): boolean {
    return apiKey.length > 0 && apiKey.startsWith('AIza');
  }
}