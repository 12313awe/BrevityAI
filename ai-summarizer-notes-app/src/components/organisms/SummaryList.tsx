'use client';

import React, { useState } from 'react';
import { Summary } from '@/types';
import { useSummaries } from '@/hooks/useSummaries';
import { SummaryCard } from '@/components/molecules/SummaryCard';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Spinner } from '@/components/atoms/Spinner';
import { 
  Search, 
  FileText, 
  Trash2, 
  Download,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';

type SortOption = 'newest' | 'oldest' | 'title' | 'length';

export function SummaryList() {
  const { 
    summaries, 
    loading, 
    error, 
    deleteSummary, 
    clearAllSummaries, 
    searchSummaries 
  } = useSummaries();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await searchSummaries(query);
  };

  const handleClearAll = async () => {
    if (window.confirm('Tüm özetleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      await clearAllSummaries();
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(summaries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `brevityai-summaries-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const sortedSummaries = React.useMemo(() => {
    const sorted = [...summaries];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'length':
        return sorted.sort((a, b) => b.originalText.length - a.originalText.length);
      default:
        return sorted;
    }
  }, [summaries, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="text-secondary-600">Özetler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Notlarım</h1>
          <p className="text-secondary-600">
            {summaries.length} özet kaydedildi
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
          
          {summaries.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
              >
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
              
              <Button
                variant="danger"
                size="sm"
                onClick={handleClearAll}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Tümünü Sil
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Özetlerde ara..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-secondary-700 whitespace-nowrap">
                Sırala:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="flex-1 px-3 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">En Yeni</option>
                <option value="oldest">En Eski</option>
                <option value="title">Başlık (A-Z)</option>
                <option value="length">Uzunluk</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <Search className="h-4 w-4 inline mr-2" />
            "{searchQuery}" için {sortedSummaries.length} sonuç bulundu
          </p>
        </div>
      )}

      {/* Summary List */}
      {sortedSummaries.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 mb-2">
            {searchQuery ? 'Sonuç bulunamadı' : 'Henüz özet yok'}
          </h3>
          <p className="text-secondary-600 mb-6">
            {searchQuery 
              ? 'Arama kriterlerinizi değiştirip tekrar deneyin.'
              : 'İlk özeti oluşturmak için ana sayfaya gidin.'
            }
          </p>
          {searchQuery && (
            <Button
              variant="outline"
              onClick={() => handleSearch('')}
            >
              Aramayı Temizle
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {sortedSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              summary={summary}
              onDelete={deleteSummary}
            />
          ))}
        </div>
      )}
    </div>
  );
}