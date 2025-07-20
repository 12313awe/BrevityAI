'use client';

import React, { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { GeminiService } from '@/lib/gemini';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { 
  Key, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';

export function SettingsForm() {
  const { settings, loading, error, updateSettings, resetSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [testingApi, setTestingApi] = useState(false);
  const [apiTestResult, setApiTestResult] = useState<'success' | 'error' | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  React.useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(formData);
      setApiTestResult(null);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?')) {
      await resetSettings();
      setApiTestResult(null);
    }
  };

  const testApiKey = async () => {
    if (!formData.geminiApiKey) {
      setApiTestResult('error');
      return;
    }

    setTestingApi(true);
    setApiTestResult(null);

    try {
      const geminiService = new GeminiService(formData.geminiApiKey);
      await geminiService.processText('Test', {
        summaryLength: 'short',
        language: 'tr',
        extractKeyPoints: false,
        generateTitle: false,
      });
      setApiTestResult('success');
    } catch (error) {
      setApiTestResult('error');
    } finally {
      setTestingApi(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="text-secondary-600">Ayarlar yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Ayarlar</h1>
        <p className="text-secondary-600">
          Uygulama ayarlarınızı yapılandırın
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* API Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="h-5 w-5 text-secondary-600" />
          <h3 className="text-lg font-medium text-secondary-900">
            API Ayarları
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700">
                Gemini API Anahtarı
              </label>
              <a
                href="https://ai.google.dev/gemini-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1"
              >
                <span>API anahtarı al</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                placeholder="AIza..."
                value={formData.geminiApiKey}
                onChange={(e) => setFormData(prev => ({ ...prev, geminiApiKey: e.target.value }))}
                className="pr-20"
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={testApiKey}
                  loading={testingApi}
                  disabled={!formData.geminiApiKey || testingApi}
                  className="h-8 px-2"
                >
                  Test
                </Button>
              </div>
            </div>

            {apiTestResult === 'success' && (
              <div className="mt-2 flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">API anahtarı geçerli</span>
              </div>
            )}

            {apiTestResult === 'error' && (
              <div className="mt-2 flex items-center space-x-2 text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">API anahtarı geçersiz</span>
              </div>
            )}

            <p className="mt-2 text-xs text-secondary-500">
              API anahtarınız sadece cihazınızda saklanır ve hiçbir sunucuya gönderilmez.
            </p>
          </div>
        </div>
      </div>

      {/* Processing Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <h3 className="text-lg font-medium text-secondary-900 mb-4">
          İşleme Ayarları
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Varsayılan Özet Uzunluğu
            </label>
            <select
              value={formData.summaryLength}
              onChange={(e) => setFormData(prev => ({ 
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

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Varsayılan Dil
            </label>
            <select
              value={formData.language}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                language: e.target.value as 'tr' | 'en' 
              }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* App Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
        <h3 className="text-lg font-medium text-secondary-900 mb-4">
          Uygulama Ayarları
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-secondary-700">
                Otomatik Kaydetme
              </label>
              <p className="text-xs text-secondary-500">
                Özetler otomatik olarak kaydedilsin
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.autoSave}
              onChange={(e) => setFormData(prev => ({ ...prev, autoSave: e.target.checked }))}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Tema
            </label>
            <select
              value={formData.theme}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                theme: e.target.value as 'light' | 'dark' | 'system' 
              }))}
              className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="system">Sistem</option>
              <option value="light">Açık</option>
              <option value="dark">Koyu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Sıfırla
        </Button>

        <Button
          onClick={handleSave}
          loading={saving}
        >
          <Save className="h-4 w-4 mr-2" />
          Kaydet
        </Button>
      </div>
    </div>
  );
}