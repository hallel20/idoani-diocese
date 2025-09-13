// Main editor component
export { GoogleDocsEditor } from './GoogleDocsEditor';

// Sub-components
export { EditorToolbar } from './components/EditorToolbar';
export { MenuBar } from './components/MenuBar';
export { DocumentStats } from './components/DocumentStats';

// Hooks
export { useAutoSave } from './hooks/useAutoSave';

// Extensions
export { FontSize } from './extensions/FontSize';

// Types
export interface EditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  onContentChange?: (content: string) => void;
  placeholder?: string;
  autoSave?: boolean;
  readOnly?: boolean;
  className?: string;
}
