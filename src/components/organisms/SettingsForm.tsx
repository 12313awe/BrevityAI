import React, { useState } from 'react';
import { Settings, Key, Palette, Database, Save, Eye, EyeOff } from 'lucide-react';
import { AppSettings } from '@/types';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

interface SettingsFormProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onClearData: () => void;
}

export default function SettingsForm({ settings, onSave, onClearData }: SettingsFormProps) {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      await onSave(formData);
      setMessage('Ayarlar başarıyla kaydedildi!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Ayarlar kaydedilirken hata oluştu.');
    } finally {
      setSaving(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Tüm kaydedilmiş özetler ve notlar silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?')) {
      onClearData();
      setMessage('Tüm veriler temizlendi.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-neutral-900">Ayarlar</h1>
      </div>

      {/* API Ayarları */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Key className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-neutral-900">API Ayarları</h2>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Gemini API Anahtarı"
              type={showApiKey ? 'text' : 'password'}
              placeholder="API anahtarınızı girin..."
              value={formData.geminiApiKey}
              onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
              helperText="API anahtarınız yalnızca cihazınızda saklanır ve hiçbir sunucuya gönderilmez."
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-8 text-neutral-400 hover:text-neutral-600"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Gemini API Anahtarı Nasıl Alınır?</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li><a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>'ya gidin</li>
              <li>"Create API Key" butonuna tıklayın</li>
              <li>Oluşturulan API anahtarını kopyalayın</li>
              <li>Yukarıdaki alana yapıştırın</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tema Ayarları */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Palette className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-neutral-900">Görünüm</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Tema
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={formData.theme === 'light'}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'light' | 'dark' })}
                  className="mr-2"
                />
                Açık Tema
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={formData.theme === 'dark'}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value as 'light' | 'dark' })}
                  className="mr-2"
                />
                Koyu Tema (Yakında)
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.autoSave}
                onChange={(e) => setFormData({ ...formData, autoSave: e.target.checked })}
                className="mr-2"
              />
              Otomatik kaydetme
            </label>
            <p className="text-sm text-neutral-500 mt-1">
              Özetler oluşturulduktan sonra otomatik olarak kaydedilir.
            </p>
          </div>
        </div>
      </div>

      {/* Veri Yönetimi */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-neutral-900">Veri Yönetimi</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Tüm verileriniz cihazınızda güvenle saklanır. İsterseniz tüm verileri temizleyebilirsiniz.
          </p>
          
          <Button
            variant="danger"
            onClick={handleClearData}
          >
            <Database className="w-4 h-4 mr-2" />
            Tüm Verileri Temizle
          </Button>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleSave}
          loading={saving}
          disabled={!formData.geminiApiKey.trim()}
        >
          <Save className="w-4 h-4 mr-2" />
          Ayarları Kaydet
        </Button>
        
        {message && (
          <p className={`text-sm ${message.includes('hata') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}