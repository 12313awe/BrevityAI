import React, { useState } from 'react';
import { FileText, Sparkles, Save } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Textarea from '@/components/atoms/Textarea';
import Input from '@/components/atoms/Input';
import { generateSummaryAndNotes } from '@/lib/gemini';
import { useSettings } from '@/hooks/useSettings';
import { Summary } from '@/types';

interface TextProcessorProps {
  onSummaryGenerated: (summary: Summary) => void;
}

export default function TextProcessor({ onSummaryGenerated }: TextProcessorProps) {
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { settings } = useSettings();

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError('Lütfen özetlenecek metni girin.');
      return;
    }

    if (!settings.geminiApiKey) {
      setError('Lütfen önce Ayarlar sayfasından Gemini API anahtarınızı girin.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await generateSummaryAndNotes(inputText, settings.geminiApiKey);
      setSummaryText(result.summary);
      setNotes(result.notes);
      
      // Başlık otomatik oluştur
      if (!title.trim()) {
        const autoTitle = inputText.substring(0, 50).trim() + (inputText.length > 50 ? '...' : '');
        setTitle(autoTitle);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (!summaryText || !title.trim()) {
      setError('Başlık ve özet gerekli.');
      return;
    }

    const summary: Summary = {
      id: Date.now().toString(),
      title: title.trim(),
      originalText: inputText,
      summaryText,
      notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onSummaryGenerated(summary);
    
    // Formu temizle
    setInputText('');
    setTitle('');
    setSummaryText('');
    setNotes([]);
    setError('');
  };

  const handleClear = () => {
    setInputText('');
    setTitle('');
    setSummaryText('');
    setNotes([]);
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Metin Girişi */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-neutral-900">Metin Girişi</h2>
        </div>
        
        <div className="space-y-4">
          <Textarea
            label="Özetlenecek Metin"
            placeholder="Özetlemek istediğiniz metni buraya yapıştırın..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
            helperText={`${inputText.length} karakter`}
          />
          
          <div className="flex space-x-3">
            <Button
              onClick={handleProcess}
              loading={loading}
              disabled={!inputText.trim() || !settings.geminiApiKey}
              className="flex-1 sm:flex-none"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Özetle ve Not Çıkar
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Temizle
            </Button>
          </div>
        </div>
      </div>

      {/* Hata Mesajı */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Sonuçlar */}
      {(summaryText || notes.length > 0) && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Sonuçlar</h2>
            <Button
              onClick={handleSave}
              disabled={!summaryText || !title.trim()}
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              label="Başlık"
              placeholder="Bu özet için bir başlık girin..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {summaryText && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Özet
                </label>
                <div className="bg-neutral-50 rounded-lg p-4 border">
                  <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {summaryText}
                  </p>
                </div>
              </div>
            )}

            {notes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Önemli Notlar ({notes.length})
                </label>
                <div className="bg-neutral-50 rounded-lg p-4 border">
                  <ul className="space-y-2">
                    {notes.map((note, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-600 font-medium mt-1">•</span>
                        <span className="text-neutral-800">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}