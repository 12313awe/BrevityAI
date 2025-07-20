import { useState, useEffect } from 'react';
import { AppSettings } from '@/types';
import { settingsStorage } from '@/lib/storage';

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>({
    geminiApiKey: '',
    theme: 'light',
    autoSave: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await settingsStorage.get();
      setSettings(savedSettings);
    } catch (error) {
      console.error('Ayarlar yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await settingsStorage.save(updatedSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Ayarlar güncellenirken hata:', error);
      throw error;
    }
  };

  return {
    settings,
    loading,
    updateSettings
  };
}