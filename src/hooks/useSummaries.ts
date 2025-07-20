import { useState, useEffect } from 'react';
import { Summary } from '@/types';
import { summaryStorage } from '@/lib/storage';

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummaries();
  }, []);

  const loadSummaries = async () => {
    try {
      const savedSummaries = await summaryStorage.getAll();
      setSummaries(savedSummaries);
    } catch (error) {
      console.error('Özetler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSummary = async (summary: Summary) => {
    try {
      await summaryStorage.save(summary);
      setSummaries(prev => [summary, ...prev]);
    } catch (error) {
      console.error('Özet eklenirken hata:', error);
      throw error;
    }
  };

  const updateSummary = async (updatedSummary: Summary) => {
    try {
      await summaryStorage.save(updatedSummary);
      setSummaries(prev => 
        prev.map(summary => 
          summary.id === updatedSummary.id ? updatedSummary : summary
        )
      );
    } catch (error) {
      console.error('Özet güncellenirken hata:', error);
      throw error;
    }
  };

  const deleteSummary = async (id: string) => {
    try {
      await summaryStorage.delete(id);
      setSummaries(prev => prev.filter(summary => summary.id !== id));
    } catch (error) {
      console.error('Özet silinirken hata:', error);
      throw error;
    }
  };

  const clearAllSummaries = async () => {
    try {
      await summaryStorage.clear();
      setSummaries([]);
    } catch (error) {
      console.error('Tüm özetler silinirken hata:', error);
      throw error;
    }
  };

  return {
    summaries,
    loading,
    addSummary,
    updateSummary,
    deleteSummary,
    clearAllSummaries,
    refreshSummaries: loadSummaries
  };
}