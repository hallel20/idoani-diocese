"use client";

import React from 'react';
import { Editor } from '@tiptap/react';
import { Clock, FileText, Users } from 'lucide-react';

interface DocumentStatsProps {
  editor: Editor;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

export const DocumentStats: React.FC<DocumentStatsProps> = ({ 
  editor, 
  isSaving = false, 
  lastSaved 
}) => {
  const characterCount = editor.storage.characterCount?.characters() || 0;
  const wordCount = editor.storage.characterCount?.words() || 0;

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t px-4 py-2 flex items-center justify-between text-sm text-gray-600">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          {wordCount} words, {characterCount} characters
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {isSaving && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
            Saving...
          </div>
        )}
        {lastSaved && !isSaving && (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last saved {formatLastSaved(lastSaved)}
          </div>
        )}
      </div>
    </div>
  );
};
