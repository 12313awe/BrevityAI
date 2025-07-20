export interface Summary {
  id: string;
  title: string;
  originalText: string;
  summaryText: string;
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AppSettings {
  geminiApiKey: string;
  theme: 'light' | 'dark';
  autoSave: boolean;
}

export interface GeminiResponse {
  summary: string;
  notes: string[];
}

export interface ApiError {
  message: string;
  code?: string;
}