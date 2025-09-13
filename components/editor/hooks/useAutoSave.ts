import { useEffect, useRef } from 'react';
import { Editor } from '@tiptap/react';

interface UseAutoSaveOptions {
  editor: Editor | null;
  onSave: (content: string) => Promise<void>;
  enabled?: boolean;
  delay?: number;
}

export const useAutoSave = ({ 
  editor, 
  onSave, 
  enabled = true, 
  delay = 2000 
}: UseAutoSaveOptions) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastContentRef = useRef<string>('');

  useEffect(() => {
    if (!editor || !enabled) return;

    const handleUpdate = () => {
      const currentContent = editor.getHTML();
      
      // Only save if content has actually changed
      if (currentContent === lastContentRef.current) return;
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(async () => {
        try {
          await onSave(currentContent);
          lastContentRef.current = currentContent;
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }, delay);
    };

    // Listen for editor updates
    editor.on('update', handleUpdate);

    // Cleanup
    return () => {
      editor.off('update', handleUpdate);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [editor, onSave, enabled, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
