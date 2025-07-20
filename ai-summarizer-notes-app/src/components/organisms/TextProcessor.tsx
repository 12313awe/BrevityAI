'use client';

import React, { useState } from 'react';
import { Summary, ProcessingOptions } from '@/types';
import { GeminiService } from '@/lib/gemini';
import { generateId } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { Textarea } from '@/components/atoms/Textarea';
import { Spinner } from '@/components/atoms/Spinner';
import { useSettings } from '@/hooks/useSettings';
import { useSummaries } from '@/hooks/useSummaries';
import { 
  Brain, 
  FileText, 
  Zap, 
  AlertCircle, 
  CheckCircle,
  Settings as SettingsIcon
} from 'lucide-react';

export function TextProcessor() {
  const [inputText, setInputText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingOptions, setProcessingOptions] = useState<ProcessingOptions>({
    summaryLength: 'medium',
    language: 'tr',
    extractKeyPoints: true,
    generateTitle: true,
  });

  const { settings } = useSettings();
  const { addSummary } = useSummaries();

  const handleProcess = async () => {
    if (!inputText.trim()) {
      setError('Lütfen özetlemek istediğiniz metni girin.');
      return;
    }

    if (!settings.geminiApiKey) {
      setError('Lütfen önce ayarlar sayfasından Gemini API anahtarınızı girin.');
      return;
    }

    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const geminiService = new GeminiService(settings.geminiApiKey);
      const response = await geminiService.processText(inputText, processingOptions);

      const summary: Summary = {
        id: generateId(),
        title: response.title,
        originalText: inputText,
        summary: response.summary,
        keyPoints: response.keyPoints,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setResult(summary);

      // Auto-save if enabled
      if (settings.autoSave) {
        await addSummary(summary);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu');
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      const success = await addSummary(result);
      if (success) {
        setResult(null);
        setInputText('');
        // Show success message
      }
    } catch (err) {
      setError('Özet kaydedilirken hata oluştu');
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Brain className="h-8 w-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-secondary-900">
            AI Destekli Metin Özetleyici
          </h1>
        </div>
        <p className="text-secondary-600">
          Metinlerinizi hızlıca özetleyin ve önemli noktaları çıkarın
        </p>
      </div>

      {/* Processing Options */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <SettingsIcon className="h-5 w-5 text-secondary-600" />
          <h3 className="text-lg font-medium text-secondary-900">
            İşleme Seçenekleri
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Summary Length */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Özet Uzunluğu
            </label>
            <select
              value={processingOptions.summaryLength}
              onChange={(e) => setProcessingOptions(prev => ({
                ...prev,
                summaryLength: e.target.value as 'short' | 'medium' | 'long'
              }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="short">Kısa (2-3 cümle)</option>
              <option value="medium">Orta (1 paragraf)</option>
              <option value="long">Uzun (2-3 paragraf)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Dil
            </label>
            <select
              value={processingOptions.language}
              onChange={(e) => setProcessingOptions(prev => ({
                ...prev,
                language: e.target.value as 'tr' | 'en'
              }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Extract Key Points */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="extractKeyPoints"
              checked={processingOptions.extractKeyPoints}
              onChange={(e) => setProcessingOptions(prev => ({
                ...prev,
                extractKeyPoints: e.target.checked
              }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor="extractKeyPoints" className="text-sm font-medium text-secondary-700">
              Ana noktaları çıkar
            </label>
          </div>

          {/* Generate Title */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="generateTitle"
              checked={processingOptions.generateTitle}
              onChange={(e) => setProcessingOptions(prev => ({
                ...prev,
                generateTitle: e.target.checked
              }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor="generateTitle" className="text-sm font-medium text-secondary-700">
              Başlık oluştur
            </label>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <Textarea
          label="Özetlemek istediğiniz metni girin"
          placeholder="Buraya metninizi yapıştırın veya yazın..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={8}
          className="mb-4"
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-secondary-500">
            {inputText.length} karakter
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!inputText && !result}
            >
              Temizle
            </Button>
            <Button
              onClick={handleProcess}
              loading={processing}
              disabled={!inputText.trim() || processing}
            >
              <Zap className="h-4 w-4 mr-2" />
              Özetle
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Processing Indicator */}
      {processing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-3">
            <Spinner size="md" />
            <p className="text-blue-800">AI metninizi analiz ediyor...</p>
          </div>
        </div>
      )}

      {/* Result Section */}
      {result && (
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-medium text-secondary-900">
                Özet Hazır!
              </h3>
            </div>
            
            {!settings.autoSave && (
              <Button onClick={handleSave}>
                <FileText className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <h4 className="text-sm font-medium text-secondary-700 mb-2">
                Başlık:
              </h4>
              <h2 className="text-xl font-semibold text-secondary-900">
                {result.title}
              </h2>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-sm font-medium text-secondary-700 mb-2">
                Özet:
              </h4>
              <p className="text-secondary-600 leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Key Points */}
            {result.keyPoints && result.keyPoints.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-secondary-700 mb-2">
                  Ana Noktalar:
                </h4>
                <ul className="space-y-2">
                  {result.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span className="text-secondary-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {settings.autoSave && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✓ Özet otomatik olarak kaydedildi
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}