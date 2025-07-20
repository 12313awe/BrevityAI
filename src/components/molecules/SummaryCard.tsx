import React from 'react';
import { Summary } from '@/types';
import { Calendar, FileText, Trash2, Edit3 } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface SummaryCardProps {
  summary: Summary;
  onEdit: (summary: Summary) => void;
  onDelete: (id: string) => void;
}

export default function SummaryCard({ summary, onEdit, onDelete }: SummaryCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2">
          {summary.title}
        </h3>
        <div className="flex space-x-2 ml-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(summary)}
            className="p-2"
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(summary.id)}
            className="p-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-neutral-700 mb-1">Özet:</h4>
          <p className="text-sm text-neutral-600 line-clamp-3">
            {truncateText(summary.summaryText, 200)}
          </p>
        </div>

        {summary.notes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-neutral-700 mb-1">Notlar:</h4>
            <ul className="text-sm text-neutral-600 space-y-1">
              {summary.notes.slice(0, 3).map((note, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span className="line-clamp-1">{truncateText(note, 100)}</span>
                </li>
              ))}
              {summary.notes.length > 3 && (
                <li className="text-neutral-500 italic">
                  +{summary.notes.length - 3} not daha...
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
        <div className="flex items-center space-x-4 text-xs text-neutral-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(summary.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FileText className="w-3 h-3" />
            <span>{summary.originalText.length} karakter</span>
          </div>
        </div>
      </div>
    </div>
  );
}