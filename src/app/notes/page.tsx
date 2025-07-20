'use client';

import React, { useState } from 'react';
import SummaryList from '@/components/organisms/SummaryList';
import { useSummaries } from '@/hooks/useSummaries';
import { Summary } from '@/types';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';

export default function NotesPage() {
  const { summaries, loading, updateSummary, deleteSummary, clearAllSummaries } = useSummaries();
  const [editingSummary, setEditingSummary] = useState<Summary | null>(null);
  const [editForm, setEditForm] = useState({ title: '', summaryText: '', notes: [] as string[] });

  const handleEdit = (summary: Summary) => {
    setEditingSummary(summary);
    setEditForm({
      title: summary.title,
      summaryText: summary.summaryText,
      notes: [...summary.notes]
    });
  };

  const handleSaveEdit = async () => {
    if (!editingSummary) return;

    try {
      const updatedSummary: Summary = {
        ...editingSummary,
        title: editForm.title,
        summaryText: editForm.summaryText,
        notes: editForm.notes,
        updatedAt: new Date()
      };

      await updateSummary(updatedSummary);
      setEditingSummary(null);
      setEditForm({ title: '', summaryText: '', notes: [] });
    } catch (error) {
      console.error('Özet güncellenirken hata:', error);
      alert('Özet güncellenirken hata oluştu.');
    }
  };

  const handleCancelEdit = () => {
    setEditingSummary(null);
    setEditForm({ title: '', summaryText: '', notes: [] });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu özeti silmek istediğinizden emin misiniz?')) {
      try {
        await deleteSummary(id);
      } catch (error) {
        console.error('Özet silinirken hata:', error);
        alert('Özet silinirken hata oluştu.');
      }
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Tüm özetleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      try {
        await clearAllSummaries();
      } catch (error) {
        console.error('Özetler silinirken hata:', error);
        alert('Özetler silinirken hata oluştu.');
      }
    }
  };

  const handleNoteChange = (index: number, value: string) => {
    const newNotes = [...editForm.notes];
    newNotes[index] = value;
    setEditForm({ ...editForm, notes: newNotes });
  };

  const addNote = () => {
    setEditForm({ ...editForm, notes: [...editForm.notes, ''] });
  };

  const removeNote = (index: number) => {
    const newNotes = editForm.notes.filter((_, i) => i !== index);
    setEditForm({ ...editForm, notes: newNotes });
  };

  if (editingSummary) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <h1 className="text-2xl font-bold text-neutral-900 mb-6">Özet Düzenle</h1>
          
          <div className="space-y-6">
            <Input
              label="Başlık"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
            />

            <Textarea
              label="Özet"
              value={editForm.summaryText}
              onChange={(e) => setEditForm({ ...editForm, summaryText: e.target.value })}
              rows={6}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-neutral-700">
                  Notlar
                </label>
                <Button size="sm" onClick={addNote}>
                  Not Ekle
                </Button>
              </div>
              
              <div className="space-y-3">
                {editForm.notes.map((note, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      placeholder={`Not ${index + 1}`}
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeNote(index)}
                    >
                      Sil
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleSaveEdit}>
                Kaydet
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                İptal
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SummaryList
      summaries={summaries}
      loading={loading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onClearAll={handleClearAll}
    />
  );
}