"use client";

import React from 'react';
import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  Save, 
  Download, 
  Upload, 
  FileText, 
  Settings,
  ChevronDown,
  Clock
} from 'lucide-react';

interface MenuBarProps {
  editor: Editor;
  onSave?: () => void;
  isSaving?: boolean;
  lastSaved?: Date | null;
}

export const MenuBar: React.FC<MenuBarProps> = ({ 
  editor, 
  onSave, 
  isSaving = false, 
  lastSaved 
}) => {
  const exportAsHTML = () => {
    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    const content = editor.getText();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

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
    <div className="border-b bg-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* File Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              File
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={onSave} disabled={!onSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportAsHTML}>
              <Download className="h-4 w-4 mr-2" />
              Export as HTML
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportAsText}>
              <FileText className="h-4 w-4 mr-2" />
              Export as Text
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Edit Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Edit
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
            >
              Undo
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
            >
              Redo
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => editor.chain().focus().selectAll().run()}>
              Select All
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Format Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Format
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleUnderline().run()}>
              Underline
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
              Normal Text
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Insert Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              Insert
              <ChevronDown className="h-3 w-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
              Table
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              Horizontal Rule
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setHardBreak().run()}>
              Page Break
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Save Status */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {isSaving && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
            Saving...
          </div>
        )}
        {lastSaved && !isSaving && (
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Saved {formatLastSaved(lastSaved)}
          </div>
        )}
      </div>
    </div>
  );
};
