import localforage from 'localforage';
import { Summary, Settings } from '@/types';

// Configure localforage
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'BrevityAI',
  version: 1.0,
  storeName: 'brevityai_store',
  description: 'BrevityAI local storage for summaries and settings'
});

// Storage keys
const STORAGE_KEYS = {
  SUMMARIES: 'summaries',
  SETTINGS: 'settings',
} as const;

// Default settings
const DEFAULT_SETTINGS: Settings = {
  geminiApiKey: '',
  summaryLength: 'medium',
  language: 'tr',
  autoSave: true,
  theme: 'system',
};

// Summary operations
export const summaryStorage = {
  async getAll(): Promise<Summary[]> {
    try {
      const summaries = await localforage.getItem<Summary[]>(STORAGE_KEYS.SUMMARIES);
      return summaries || [];
    } catch (error) {
      console.error('Error getting summaries:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Summary | null> {
    try {
      const summaries = await this.getAll();
      return summaries.find(summary => summary.id === id) || null;
    } catch (error) {
      console.error('Error getting summary by id:', error);
      return null;
    }
  },

  async save(summary: Summary): Promise<boolean> {
    try {
      const summaries = await this.getAll();
      const existingIndex = summaries.findIndex(s => s.id === summary.id);
      
      if (existingIndex >= 0) {
        summaries[existingIndex] = { ...summary, updatedAt: new Date() };
      } else {
        summaries.push(summary);
      }
      
      await localforage.setItem(STORAGE_KEYS.SUMMARIES, summaries);
      return true;
    } catch (error) {
      console.error('Error saving summary:', error);
      return false;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const summaries = await this.getAll();
      const filteredSummaries = summaries.filter(summary => summary.id !== id);
      await localforage.setItem(STORAGE_KEYS.SUMMARIES, filteredSummaries);
      return true;
    } catch (error) {
      console.error('Error deleting summary:', error);
      return false;
    }
  },

  async clear(): Promise<boolean> {
    try {
      await localforage.setItem(STORAGE_KEYS.SUMMARIES, []);
      return true;
    } catch (error) {
      console.error('Error clearing summaries:', error);
      return false;
    }
  },

  async search(query: string): Promise<Summary[]> {
    try {
      const summaries = await this.getAll();
      const lowercaseQuery = query.toLowerCase();
      
      return summaries.filter(summary => 
        summary.title.toLowerCase().includes(lowercaseQuery) ||
        summary.summary.toLowerCase().includes(lowercaseQuery) ||
        summary.originalText.toLowerCase().includes(lowercaseQuery) ||
        summary.keyPoints.some(point => point.toLowerCase().includes(lowercaseQuery)) ||
        summary.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
    } catch (error) {
      console.error('Error searching summaries:', error);
      return [];
    }
  }
};

// Settings operations
export const settingsStorage = {
  async get(): Promise<Settings> {
    try {
      const settings = await localforage.getItem<Settings>(STORAGE_KEYS.SETTINGS);
      return { ...DEFAULT_SETTINGS, ...settings };
    } catch (error) {
      console.error('Error getting settings:', error);
      return DEFAULT_SETTINGS;
    }
  },

  async save(settings: Partial<Settings>): Promise<boolean> {
    try {
      const currentSettings = await this.get();
      const updatedSettings = { ...currentSettings, ...settings };
      await localforage.setItem(STORAGE_KEYS.SETTINGS, updatedSettings);
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  async reset(): Promise<boolean> {
    try {
      await localforage.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      return true;
    } catch (error) {
      console.error('Error resetting settings:', error);
      return false;
    }
  }
};

// General storage utilities
export const storage = {
  async clear(): Promise<boolean> {
    try {
      await localforage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing all storage:', error);
      return false;
    }
  },

  async getStorageInfo(): Promise<{ summariesCount: number; storageSize: number }> {
    try {
      const summaries = await summaryStorage.getAll();
      const settings = await settingsStorage.get();
      
      // Rough calculation of storage size
      const summariesSize = JSON.stringify(summaries).length;
      const settingsSize = JSON.stringify(settings).length;
      
      return {
        summariesCount: summaries.length,
        storageSize: summariesSize + settingsSize
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { summariesCount: 0, storageSize: 0 };
    }
  }
};