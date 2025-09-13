"use client";

import React, { useState, useCallback, useEffect } from 'react';
import './editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import CharacterCount from '@tiptap/extension-character-count';
import Focus from '@tiptap/extension-focus';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Dropcursor from '@tiptap/extension-dropcursor';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';

import { EditorToolbar } from './components/EditorToolbar';
import { MenuBar } from './components/MenuBar';
import { DocumentStats } from './components/DocumentStats';
import { useAutoSave } from './hooks/useAutoSave';
import { FontSize } from './extensions/FontSize';

interface GoogleDocsEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  autoSave?: boolean;
  readOnly?: boolean;
  className?: string;
}

export const GoogleDocsEditor: React.FC<GoogleDocsEditorProps> = ({
  initialContent = '',
  onSave,
  onContentChange,
  placeholder = 'Start writing...',
  autoSave = true,
  readOnly = false,
  className = '',
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      FontSize,
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Gapcursor,
      HardBreak,
      HorizontalRule,
      Dropcursor,
      Placeholder.configure({
        placeholder,
      }),
      Typography,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: initialContent,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      onContentChange?.(content);
    },
  });

  // Auto-save functionality
  useAutoSave({
    editor,
    onSave: async (content: string) => {
      if (!onSave) return;
      
      setIsSaving(true);
      try {
        await onSave(content);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Auto-save failed:', error);
      } finally {
        setIsSaving(false);
      }
    },
    enabled: autoSave,
    delay: 2000,
  });

  const handleSave = useCallback(async () => {
    if (!editor || !onSave) return;
    
    const content = editor.getHTML();
    setIsSaving(true);
    
    try {
      await onSave(content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  }, [editor, onSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

  // Add client-side check to prevent SSR issues
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !editor) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`google-docs-editor bg-white ${className}`}>
      {/* Menu Bar */}
      <MenuBar 
        editor={editor} 
        onSave={handleSave}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />
      
      {/* Toolbar */}
      <EditorToolbar editor={editor} />
      
      {/* Editor Content */}
      <div className="editor-container relative">
        <div className="editor-wrapper max-w-4xl mx-auto bg-white shadow-lg min-h-[800px] p-16 my-8">
          <EditorContent 
            editor={editor} 
            className="prose prose-lg max-w-none focus:outline-none"
          />
        </div>
      </div>
      
      {/* Document Stats */}
      <DocumentStats 
        editor={editor}
        isSaving={isSaving}
        lastSaved={lastSaved}
      />
    </div>
  );
};

export default GoogleDocsEditor;
