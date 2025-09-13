# Google Docs-like Editor for Diocese Project

A comprehensive rich text editor built with Tiptap that replicates Google Docs functionality for creating Bishop's Charges and other diocesan documents.

## Features

### Core Text Formatting
- **Bold, Italic, Underline, Strikethrough**: Standard text formatting options
- **Font Family Selection**: Choose from popular fonts including Arial, Georgia, Times New Roman, etc.
- **Font Size Control**: Precise font sizing from 8px to 96px
- **Text Colors**: Full color picker for text and highlight colors
- **Subscript & Superscript**: Mathematical and scientific notation support

### Document Structure
- **Headings**: H1-H6 with automatic styling
- **Text Alignment**: Left, center, right, and justify alignment
- **Lists**: Bullet lists, numbered lists, and task lists with checkboxes
- **Block Quotes**: Styled quotation blocks
- **Horizontal Rules**: Document section dividers

### Advanced Features
- **Tables**: Create and edit tables with header rows
- **Images**: Insert images via URL with automatic resizing
- **Links**: Add and edit hyperlinks
- **Auto-save**: Automatic document saving with visual feedback
- **Character/Word Count**: Real-time document statistics
- **Undo/Redo**: Full history management

### Google Docs-like Interface
- **Toolbar**: Comprehensive formatting toolbar with all major controls
- **Menu Bar**: File, Edit, Format, and Insert menus
- **Document Layout**: Letter-size page with proper margins
- **Status Bar**: Document statistics and save status
- **Keyboard Shortcuts**: Standard shortcuts (Ctrl+B, Ctrl+I, etc.)

## Usage

### Basic Implementation

```tsx
import { GoogleDocsEditor } from '@/components/editor';

function MyComponent() {
  const handleSave = async (content: string) => {
    // Save content to your backend
    await saveDocument(content);
  };

  const handleContentChange = (content: string) => {
    // Handle real-time content changes
    console.log('Content updated:', content);
  };

  return (
    <GoogleDocsEditor
      initialContent="<p>Start writing...</p>"
      onSave={handleSave}
      onContentChange={handleContentChange}
      placeholder="Begin your document..."
      autoSave={true}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content for the editor |
| `onSave` | `(content: string) => void` | `undefined` | Callback when document is saved |
| `onContentChange` | `(content: string) => void` | `undefined` | Callback on content changes |
| `placeholder` | `string` | `'Start writing...'` | Placeholder text when editor is empty |
| `autoSave` | `boolean` | `true` | Enable automatic saving |
| `readOnly` | `boolean` | `false` | Make editor read-only |
| `className` | `string` | `''` | Additional CSS classes |

## Components

### GoogleDocsEditor
Main editor component that orchestrates all functionality.

### EditorToolbar
Comprehensive toolbar with formatting controls:
- Text formatting (bold, italic, underline, etc.)
- Font controls (family, size, color)
- Alignment and list controls
- Insert tools (links, images, tables)

### MenuBar
Google Docs-style menu bar with:
- File operations (save, export)
- Edit operations (undo, redo, select all)
- Format operations (headings, text styles)
- Insert operations (tables, horizontal rules)

### DocumentStats
Status bar showing:
- Word and character count
- Save status and last saved time
- Auto-save indicators

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+S` | Save document |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+A` | Select all |

## Styling

The editor includes comprehensive CSS that replicates Google Docs appearance:
- Letter-size document layout (8.5" × 11")
- Proper margins and padding
- Google Docs-like fonts and spacing
- Print-ready styles
- Responsive design for mobile devices

## Export Options

- **HTML**: Export as HTML file
- **Plain Text**: Export as .txt file
- **Print**: Print-ready formatting

## Auto-save

The editor includes intelligent auto-save functionality:
- Saves changes after 2 seconds of inactivity
- Visual indicators for save status
- Prevents unnecessary saves when content hasn't changed
- Error handling for failed saves

## Integration with Bishop's Charge

This editor is specifically integrated with the Diocese project for creating Bishop's Charges:

1. Navigate to `/admin/bishops-charge`
2. Click "New Charge" to open the editor
3. Enter a title and create rich content
4. Auto-save keeps your work safe
5. Publish when ready

## Technical Details

### Dependencies
- `@tiptap/react` - Core editor framework
- `@tiptap/starter-kit` - Basic extensions
- Various Tiptap extensions for advanced features
- Lucide React icons
- Tailwind CSS for styling

### Browser Support
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Optimized for large documents
- Debounced auto-save prevents excessive API calls
- Efficient re-rendering with React optimization

## Customization

The editor is highly customizable:
- Add custom Tiptap extensions
- Modify toolbar layout
- Customize styling and themes
- Add new export formats
- Integrate with different backends

## Future Enhancements

Potential improvements:
- Real-time collaboration
- Comments and suggestions
- Version history
- Document templates
- Advanced table features
- Drawing tools
- Voice typing integration
