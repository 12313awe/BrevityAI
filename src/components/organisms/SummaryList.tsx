import React, { useState } from 'react';
import { Search, FileText, Trash2 } from 'lucide-react';
import { Summary } from '@/types';
import SummaryCard from '@/components/molecules/SummaryCard';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

interface SummaryListProps {
  summaries: Summary[];
  loading: boolean;
  onEdit: (summary: Summary) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export default function SummaryList({ 
  summaries, 
  loading, 
  onEdit, 
  onDelete, 
  onClearAll 
}: SummaryListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSummaries = summaries.filter(summary =>
    summary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary.summaryText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    summary.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve Arama */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-primary-600" />
          <h1 className="text-2xl font-bold text-neutral-900">
            Kaydedilen Özetler ({summaries.length})
          </h1>
        </div>
        
        {summaries.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={onClearAll}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Tümünü Sil
          </Button>
        )}
      </div>

      {/* Arama Çubuğu */}
      {summaries.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input
            placeholder="Özetlerde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Özet Listesi */}
      {summaries.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            Henüz kaydedilmiş özet yok
          </h3>
          <p className="text-neutral-600 mb-6">
            Ana sayfadan metin özetleyerek ilk notunuzu oluşturun.
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Özet Oluştur
          </Button>
        </div>
      ) : filteredSummaries.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            Arama sonucu bulunamadı
          </h3>
          <p className="text-neutral-600">
            "{searchTerm}" için herhangi bir özet bulunamadı.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSummaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              summary={summary}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}