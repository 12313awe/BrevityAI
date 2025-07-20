'use client';

import { useState, useEffect } from 'react';
import { Summary } from '@/types';
import { summaryStorage } from '@/lib/storage';

export function useSummaries() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load summaries on mount
  useEffect(() => {
    loadSummaries();
  }, []);

  const loadSummaries = async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedSummaries = await summaryStorage.getAll();
      // Sort by creation date (newest first)
      const sortedSummaries = loadedSummaries.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSummaries(sortedSummaries);
    } catch (err) {
      setError('Özetler yüklenirken hata oluştu');
      console.error('Error loading summaries:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSummary = async (summary: Summary) => {
    try {
      setError(null);
      const success = await summaryStorage.save(summary);
      if (success) {
        setSummaries(prev => [summary, ...prev]);
        return true;
      } else {
        throw new Error('Özet kaydedilemedi');
      }
    } catch (err) {
      setError('Özet kaydedilirken hata oluştu');
      console.error('Error adding summary:', err);
      return false;
    }
  };

  const updateSummary = async (id: string, updates: Partial<Summary>) => {
    try {
      setError(null);
      const existingSummary = summaries.find(s => s.id === id);
      if (!existingSummary) {
        throw new Error('Özet bulunamadı');
      }

      const updatedSummary = { 
        ...existingSummary, 
        ...updates, 
        updatedAt: new Date() 
      };
      
      const success = await summaryStorage.save(updatedSummary);
      if (success) {
        setSummaries(prev => 
          prev.map(summary => 
            summary.id === id ? updatedSummary : summary
          )
        );
        return true;
      } else {
        throw new Error('Özet güncellenemedi');
      }
    } catch (err) {
      setError('Özet güncellenirken hata oluştu');
      console.error('Error updating summary:', err);
      return false;
    }
  };

  const deleteSummary = async (id: string) => {
    try {
      setError(null);
      const success = await summaryStorage.delete(id);
      if (success) {
        setSummaries(prev => prev.filter(summary => summary.id !== id));
        return true;
      } else {
        throw new Error('Özet silinemedi');
      }
    } catch (err) {
      setError('Özet silinirken hata oluştu');
      console.error('Error deleting summary:', err);
      return false;
    }
  };

  const clearAllSummaries = async () => {
    try {
      setError(null);
      const success = await summaryStorage.clear();
      if (success) {
        setSummaries([]);
        return true;
      } else {
        throw new Error('Özetler temizlenemedi');
      }
    } catch (err) {
      setError('Özetler temizlenirken hata oluştu');
      console.error('Error clearing summaries:', err);
      return false;
    }
  };

  const searchSummaries = async (query: string) => {
    try {
      setError(null);
      if (!query.trim()) {
        await loadSummaries();
        return;
      }
      
      const results = await summaryStorage.search(query);
      const sortedResults = results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSummaries(sortedResults);
    } catch (err) {
      setError('Arama sırasında hata oluştu');
      console.error('Error searching summaries:', err);
    }
  };

  const getSummaryById = async (id: string): Promise<Summary | null> => {
    try {
      return await summaryStorage.getById(id);
    } catch (err) {
      console.error('Error getting summary by id:', err);
      return null;
    }
  };

  return {
    summaries,
    loading,
    error,
    addSummary,
    updateSummary,
    deleteSummary,
    clearAllSummaries,
    searchSummaries,
    getSummaryById,
    reload: loadSummaries,
  };
}