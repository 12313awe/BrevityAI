'use client';

import React from 'react';
import SettingsForm from '@/components/organisms/SettingsForm';
import { useSettings } from '@/hooks/useSettings';
import { useSummaries } from '@/hooks/useSummaries';
import { AppSettings } from '@/types';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { clearAllSummaries } = useSummaries();

  const handleSave = async (newSettings: AppSettings) => {
    await updateSettings(newSettings);
  };

  const handleClearData = async () => {
    try {
      await clearAllSummaries();
    } catch (error) {
      console.error('Veriler temizlenirken hata:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <SettingsForm
        settings={settings}
        onSave={handleSave}
        onClearData={handleClearData}
      />
    </div>
  );
}