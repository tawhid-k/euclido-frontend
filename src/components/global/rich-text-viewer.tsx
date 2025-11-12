'use client'
import React, { useEffect, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import './rich-text-viewer.css'; // Add this import for styles

interface RichTextViewerProps {
  contentString: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ contentString }) => {
  const [editorState, setEditorState] = useState<string | null>(null);
  
  useEffect(() => {
    if (!contentString) {
      return;
    }
    
    try {
      // First, try to determine if contentString is already valid JSON
      let finalEditorState = contentString;
      
      try {
        // Try to parse it once to see if it's valid JSON
        const parsedContent = JSON.parse(contentString);
        
        // If we get here, it's valid JSON
        if (typeof parsedContent === 'string') {
          // It might be a JSON string inside a JSON string
          try {
            // Try to parse it again to see if it contains valid JSON
            JSON.parse(parsedContent);
            // If we get here, it's a JSON string containing valid JSON
            finalEditorState = parsedContent;
          } catch (e) {
            // It's a string but not JSON, use as is
            finalEditorState = contentString;
          }
        } else if (typeof parsedContent === 'object') {
          // If it's already an object, stringify it
          finalEditorState = contentString;
        }
      } catch (e) {
        // Not valid JSON, try to sanitize it
        console.warn('Content is not valid JSON, attempting to sanitize:', e);
        
        // Try to fix common JSON issues
        let sanitized = contentString
          .replace(/\\"/g, '"') // Replace escaped quotes
          .replace(/"\s+"/g, '","') // Fix missing commas
          .replace(/}\s+{/g, '},{') // Fix missing commas between objects
          .replace(/}\s+"/g, '},"') // Fix missing commas after objects
          .replace(/"\s+{/g, '",{'); // Fix missing commas before objects
          
        try {
          // See if our sanitized version works
          JSON.parse(sanitized);
          finalEditorState = sanitized;
        } catch (sanitizeError) {
          // If sanitizing didn't work, log and use null
          console.error('Failed to sanitize JSON:', sanitizeError);
          finalEditorState = contentString;
        }
      }
      
      setEditorState(finalEditorState);
    } catch (error) {
      console.error('Error processing content:', error);
      setEditorState(null);
    }
  }, [contentString]);

  if (!editorState) {
    return <div className="rich-text-error">Unable to display content due to formatting issues</div>;
  }

  const theme = {
    paragraph: 'editor-paragraph',
    text: {
      bold: 'editor-text-bold',
      italic: 'editor-text-italic',
      underline: 'editor-text-underline'
    },
    heading: {
      h1: 'editor-heading-h1',
      h2: 'editor-heading-h2',
      h3: 'editor-heading-h3'
    },
    list: {
      ul: 'editor-list-ul',
      ol: 'editor-list-ol',
      listitem: 'editor-listitem',
      nested: {
        listitem: 'editor-nested-listitem'
      },
      checklist: 'editor-checklist'
    },
    quote: 'editor-quote',
    table: 'editor-table',
    tableCell: 'editor-tableCell',
    tableRow: 'editor-tableRow',
    tableCellHeader: 'editor-tableCellHeader'
  };

  const initialConfig = {
    namespace: 'RichTextViewer',
    theme,
    onError: (error: Error) => console.error(error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      TableCellNode,
      TableNode,
      TableRowNode,
      CodeHighlightNode,
      CodeNode,
      AutoLinkNode,
      LinkNode
    ],
    editorState,
    editable: false
  };

  return (
    <div className="rich-text-viewer">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin />
          <CheckListPlugin />
        </div>
      </LexicalComposer>
    </div>
  );
};

export default RichTextViewer;