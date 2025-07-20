import localforage from 'localforage';
import { Summary, AppSettings } from '@/types';

// IndexedDB yapılandırması
const summariesStore = localforage.createInstance({
  name: 'BrevityAI',
  storeName: 'summaries',
  description: 'Kullanıcı özetleri ve notları'
});

const settingsStore = localforage.createInstance({
  name: 'BrevityAI',
  storeName: 'settings',
  description: 'Uygulama ayarları'
});

// Özet işlemleri
export const summaryStorage = {
  async getAll(): Promise<Summary[]> {
    try {
      const keys = await summariesStore.keys();
      const summaries: Summary[] = [];
      
      for (const key of keys) {
        const summary = await summariesStore.getItem<Summary>(key);
        if (summary) {
          summaries.push(summary);
        }
      }
      
      return summaries.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Özetler alınırken hata:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Summary | null> {
    try {
      return await summariesStore.getItem<Summary>(id);
    } catch (error) {
      console.error('Özet alınırken hata:', error);
      return null;
    }
  },

  async save(summary: Summary): Promise<void> {
    try {
      await summariesStore.setItem(summary.id, summary);
    } catch (error) {
      console.error('Özet kaydedilirken hata:', error);
      throw new Error('Özet kaydedilemedi');
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await summariesStore.removeItem(id);
    } catch (error) {
      console.error('Özet silinirken hata:', error);
      throw new Error('Özet silinemedi');
    }
  },

  async clear(): Promise<void> {
    try {
      await summariesStore.clear();
    } catch (error) {
      console.error('Tüm özetler silinirken hata:', error);
      throw new Error('Özetler temizlenemedi');
    }
  }
};

// Ayarlar işlemleri
export const settingsStorage = {
  async get(): Promise<AppSettings> {
    try {
      const settings = await settingsStore.getItem<AppSettings>('app-settings');
      return settings || {
        geminiApiKey: '',
        theme: 'light',
        autoSave: true
      };
    } catch (error) {
      console.error('Ayarlar alınırken hata:', error);
      return {
        geminiApiKey: '',
        theme: 'light',
        autoSave: true
      };
    }
  },

  async save(settings: AppSettings): Promise<void> {
    try {
      await settingsStore.setItem('app-settings', settings);
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      throw new Error('Ayarlar kaydedilemedi');
    }
  }
};