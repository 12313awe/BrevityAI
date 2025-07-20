'use client';

import React, { useState } from 'react';
import { Summary } from '@/types';
import { formatDate, truncateText, getWordCount } from '@/lib/utils';
import { Button } from '@/components/atoms/Button';
import { 
  Calendar, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Clock,
  Hash
} from 'lucide-react';

interface SummaryCardProps {
  summary: Summary;
  onEdit?: (summary: Summary) => void;
  onDelete?: (id: string) => void;
  onView?: (summary: Summary) => void;
}

export function SummaryCard({ 
  summary, 
  onEdit, 
  onDelete, 
  onView 
}: SummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Bu özeti silmek istediğinizden emin misiniz?')) {
      onDelete?.(summary.id);
    }
  };

  const wordCount = getWordCount(summary.originalText);
  const summaryWordCount = getWordCount(summary.summary);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            {summary.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-secondary-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(summary.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>{wordCount} kelime</span>
            </div>
            <div className="flex items-center space-x-1">
              <Hash className="h-4 w-4" />
              <span>{summaryWordCount} kelime özet</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
            title={showOriginal ? 'Özeti göster' : 'Orijinal metni göster'}
          >
            {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(summary)}
              title="Düzenle"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              title="Sil"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {showOriginal ? (
          <div>
            <h4 className="text-sm font-medium text-secondary-700 mb-2">
              Orijinal Metin:
            </h4>
            <p className="text-secondary-600 text-sm leading-relaxed">
              {isExpanded 
                ? summary.originalText 
                : truncateText(summary.originalText, 300)
              }
            </p>
          </div>
        ) : (
          <div>
            <h4 className="text-sm font-medium text-secondary-700 mb-2">
              Özet:
            </h4>
            <p className="text-secondary-600 text-sm leading-relaxed">
              {isExpanded 
                ? summary.summary 
                : truncateText(summary.summary, 200)
              }
            </p>
          </div>
        )}

        {/* Key Points */}
        {summary.keyPoints && summary.keyPoints.length > 0 && !showOriginal && (
          <div>
            <h4 className="text-sm font-medium text-secondary-700 mb-2">
              Ana Noktalar:
            </h4>
            <ul className="space-y-1">
              {summary.keyPoints.slice(0, isExpanded ? undefined : 3).map((point, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-secondary-600">
                  <span className="text-primary-500 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {!isExpanded && summary.keyPoints.length > 3 && (
              <p className="text-xs text-secondary-500 mt-2">
                +{summary.keyPoints.length - 3} daha fazla nokta
              </p>
            )}
          </div>
        )}

        {/* Tags */}
        {summary.tags && summary.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {summary.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Expand/Collapse */}
        <div className="flex justify-between items-center pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700"
          >
            {isExpanded ? 'Daha az göster' : 'Daha fazla göster'}
          </Button>
          
          {onView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(summary)}
            >
              Detayları Görüntüle
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}