'use client';

import { useState, useEffect } from 'react';
import { Settings } from '@/types';
import { settingsStorage } from '@/lib/storage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    geminiApiKey: '',
    summaryLength: 'medium',
    language: 'tr',
    autoSave: true,
    theme: 'system',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSettings = await settingsStorage.get();
      setSettings(loadedSettings);
    } catch (err) {
      setError('Ayarlar yüklenirken hata oluştu');
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      setError(null);
      const updatedSettings = { ...settings, ...newSettings };
      
      const success = await settingsStorage.save(updatedSettings);
      if (success) {
        setSettings(updatedSettings);
        return true;
      } else {
        throw new Error('Ayarlar kaydedilemedi');
      }
    } catch (err) {
      setError('Ayarlar kaydedilirken hata oluştu');
      console.error('Error updating settings:', err);
      return false;
    }
  };

  const resetSettings = async () => {
    try {
      setError(null);
      const success = await settingsStorage.reset();
      if (success) {
        await loadSettings(); // Reload default settings
        return true;
      } else {
        throw new Error('Ayarlar sıfırlanamadı');
      }
    } catch (err) {
      setError('Ayarlar sıfırlanırken hata oluştu');
      console.error('Error resetting settings:', err);
      return false;
    }
  };

  const validateApiKey = (apiKey: string): boolean => {
    return apiKey.length > 0 && apiKey.startsWith('AIza');
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetSettings,
    validateApiKey,
    reload: loadSettings,
  };
}