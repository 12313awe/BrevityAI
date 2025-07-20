export interface Summary {
  id: string;
  title: string;
  originalText: string;
  summary: string;
  keyPoints: string[];
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  category?: string;
}

export interface Settings {
  geminiApiKey: string;
  summaryLength: 'short' | 'medium' | 'long';
  language: 'tr' | 'en';
  autoSave: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface ProcessingOptions {
  summaryLength: 'short' | 'medium' | 'long';
  language: 'tr' | 'en';
  extractKeyPoints: boolean;
  generateTitle: boolean;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface GeminiResponse {
  summary: string;
  keyPoints: string[];
  title: string;
}