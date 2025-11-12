import React, { useEffect, useState, useCallback } from 'react'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HeadingNode, QuoteNode, HeadingTagType } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { TablePlugin } from '@lexical/react/LexicalTablePlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
import {
    $getSelection,
    $isRangeSelection,
    $createParagraphNode,
    LexicalEditor as LexicalEditorType,
    EditorState,
    LexicalNode,
    $createTextNode,
    $isElementNode,
    ElementNode,
    PASTE_COMMAND,
    COMMAND_PRIORITY_LOW
} from 'lexical'
import { $setBlocksType } from '@lexical/selection'
import { $createHeadingNode } from '@lexical/rich-text'
import { $createQuoteNode } from '@lexical/rich-text'
import {
    $isListNode,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_CHECK_LIST_COMMAND
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import { createPortal } from 'react-dom'
import { $isLinkNode, LinkNode as LinkNodeType } from '@lexical/link'
import { $createLinkNode } from '@lexical/link'
import {
    $createTableNode,
    $createTableRowNode,
    $createTableCellNode
} from '@lexical/table'
import './styles.css'
import {
    AlignCenter,
    AlignJustify,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Link,
    List,
    ListChecks,
    ListOrdered,
    MessageSquareQuote,
    Table,
    Text,
    Underline
} from 'lucide-react'

// Theme definition
interface EditorTheme {
    paragraph: string
    text: {
        bold: string
        italic: string
        underline: string
    }
    heading: {
        h1: string
        h2: string
        h3: string
    }
    list: {
        ul: string
        ol: string
        listitem: string
        nested: {
            listitem: string
        }
        checklist: string
    }
    quote: string
    table: string
    tableCell: string
    tableRow: string
    tableCellHeader: string
}

// Define editor config type
interface EditorConfig {
    namespace: string
    theme: EditorTheme
    onError: (error: Error) => void
    nodes: any[]
    editorState?: string | null // Add this line
}

// Explicitly declare JSX namespace
declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any
    }
}

// Floating Link Editor
function FloatingLinkEditor({ editor }: { editor: LexicalEditorType }) {
    const [linkUrl, setLinkUrl] = useState('')
    const [isEditMode, setIsEditMode] = useState(false)
    const [lastSelection, setLastSelection] = useState<any>(null)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const updateLinkEditor = useCallback(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
            const node = selection.getNodes()[0]
            const parent = node.getParent()
            if (parent && $isLinkNode(parent)) {
                setLinkUrl((parent as LinkNodeType).getURL())
                setIsEditMode(true)
                const domElement = editor.getElementByKey(parent.getKey())
                if (domElement) {
                    setAnchorEl(domElement)
                }
            } else {
                setIsEditMode(false)
                setAnchorEl(null)
            }
        }
        return true
    }, [editor])

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    updateLinkEditor()
                })
            })
        )
    }, [editor, updateLinkEditor])

    if (!anchorEl || !isEditMode) {
        return null
    }

    return createPortal(
        <div className="link-editor">
            <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="link-input"
            />
            <div>
                <button
                    onClick={() => {
                        editor.update(() => {
                            const selection = $getSelection()
                            if ($isRangeSelection(selection)) {
                                const node = selection.getNodes()[0]
                                const parent = node.getParent()
                                if (parent && $isLinkNode(parent)) {
                                    ;(parent as LinkNodeType).setURL(linkUrl)
                                }
                            }
                        })
                    }}
                >
                    Save
                </button>
                <button
                    onClick={() => {
                        editor.update(() => {
                            const selection = $getSelection()
                            if ($isRangeSelection(selection)) {
                                const node = selection.getNodes()[0]
                                const parent = node.getParent()
                                if (parent && $isLinkNode(parent)) {
                                    selection.insertText(
                                        parent.getTextContent()
                                    )
                                    parent.remove()
                                }
                            }
                        })
                        setIsEditMode(false)
                    }}
                >
                    Remove
                </button>
            </div>
        </div>,
        document.body
    )
}

// Define the main editor component
interface RichTextEditorProps {
    onChange?: (content: string) => void;
    value?: string;
}

// Add this custom plugin to handle link clicks
function LinkClickPlugin() {
    const [editor] = useLexicalComposerContext();
    
    useEffect(() => {
        // Add a click event listener to the editor
        const removeListener = editor.registerRootListener((rootElement, prevRootElement) => {
            if (rootElement !== null) {
                rootElement.addEventListener('click', (event) => {
                    const target = event.target as HTMLElement;
                    // Check if the clicked element is a link
                    if (target.tagName.toLowerCase() === 'a') {
                        event.preventDefault();
                        const href = target.getAttribute('href');
                        if (href) {
                            // Open the link in a new tab
                            window.open(href, '_blank', 'noopener,noreferrer');
                        }
                    }
                });
            }
        });
        
        return removeListener;
    }, [editor]);
    
    return null;
}

// Editor Content Component
const EditorContent: React.FC<RichTextEditorProps> = ({ onChange, value }) => {
    const [editor] = useLexicalComposerContext();
    const [isFirstRender, setIsFirstRender] = useState(true);
    
    // Only set the editor state from the value prop on first render
    // or when value changes from an external source
    useEffect(() => {
        if (value && editor && isFirstRender) {
            try {
                editor.update(() => {
                    const editorState = editor.parseEditorState(
                        typeof value === 'string' ? value : JSON.stringify(value)
                    );
                    editor.setEditorState(editorState);
                });
            } catch (error) {
                console.error('Error setting editor state:', error);
            }
            setIsFirstRender(false);
        }
    }, [value, editor, isFirstRender]);

    useEffect(() => {
        if (onChange) {
            return editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const content = JSON.stringify(editorState.toJSON());
                    onChange(content);
                });
            });
        }
    }, [onChange, editor]);

    return (
        <div className="editor-inner">
            <ToolbarPlugin />
            <div className="editor-content">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin />
                <LinkPlugin />
                <TablePlugin />
                <CheckListPlugin />
                <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
                <FloatingLinkEditorPlugin />
                <LinkClickPlugin />
                <CopyPastePlugin />
            </div>
        </div>
    );
};

// Add this function to validate URLs
function validateUrl(url: string): boolean {
    // Simple URL validation
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

// Main RichTextEditor component
const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
    const theme: EditorTheme = {
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
    }

    const editorConfig: EditorConfig = {
        namespace: 'MyLexicalEditor',
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
        ]
    };

    // Only parse and set initial state if value exists
    if (props.value) {
        try {
            // Handle different types of input values
            if (typeof props.value === 'string') {
                try {
                    // First try parsing it as a JSON string
                    const parsedValue = JSON.parse(props.value);
                    // Check if it's a valid editor state
                    if (parsedValue && typeof parsedValue === 'object') {
                        editorConfig.editorState = props.value;
                    }
                } catch (e) {
                    // If direct parsing fails, it might be a double-encoded JSON string
                    try {
                        const doubleDecoded = JSON.parse(JSON.parse(props.value));
                        if (doubleDecoded && typeof doubleDecoded === 'object') {
                            editorConfig.editorState = JSON.parse(props.value);
                        }
                    } catch (innerError) {
                        console.error('Failed to parse editor state:', innerError);
                    }
                }
            } else if (typeof props.value === 'object') {
                // If it's already an object, stringify it
                editorConfig.editorState = JSON.stringify(props.value);
            }
        } catch (error) {
            console.error('Failed to parse editor state:', error);
        }
    }

    return (
        <div>
            <LexicalComposer initialConfig={editorConfig}>
                <EditorContent {...props} />
            </LexicalComposer>
        </div>
    )
}

// Floating Link Editor Plugin
function FloatingLinkEditorPlugin() {
    const [editor] = useLexicalComposerContext()
    return <FloatingLinkEditor editor={editor} />
}

// Toolbar Component
const ToolbarPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [isBold, setIsBold] = useState<boolean>(false)
    const [isItalic, setIsItalic] = useState<boolean>(false)
    const [isUnderline, setIsUnderline] = useState<boolean>(false)
    const [activeHeading, setActiveHeading] = useState<string>('')
    const [isLink, setIsLink] = useState<boolean>(false)
    const [textAlignment, setTextAlignment] = useState<string>('left')

    useEffect(() => {
        return editor.registerUpdateListener(
            ({ editorState }: { editorState: EditorState }) => {
                editorState.read(() => {
                    // Update toolbar state based on current selection
                    const selection = $getSelection()
                    if ($isRangeSelection(selection)) {
                        // Format states
                        setIsBold(selection.hasFormat('bold'))
                        setIsItalic(selection.hasFormat('italic'))
                        setIsUnderline(selection.hasFormat('underline'))

                        // Check for heading
                        const anchorNode = selection.anchor.getNode()
                        const element =
                            anchorNode.getKey() === 'root'
                                ? anchorNode
                                : anchorNode.getTopLevelElementOrThrow()

                        const elementKey = element.getKey()
                        const elementDOM = editor.getElementByKey(elementKey)

                        if (elementDOM) {
                            if (elementDOM.tagName === 'H1') {
                                setActiveHeading('h1')
                            } else if (elementDOM.tagName === 'H2') {
                                setActiveHeading('h2')
                            } else if (elementDOM.tagName === 'H3') {
                                setActiveHeading('h3')
                            } else {
                                setActiveHeading('')
                            }

                            // Check for alignment
                            if (elementDOM.style) {
                                if (elementDOM.style.textAlign === 'center') {
                                    setTextAlignment('center')
                                } else if (
                                    elementDOM.style.textAlign === 'right'
                                ) {
                                    setTextAlignment('right')
                                } else if (
                                    elementDOM.style.textAlign === 'justify'
                                ) {
                                    setTextAlignment('justify')
                                } else {
                                    setTextAlignment('left')
                                }
                            }
                        }

                        // Check for link
                        const node = getSelectedNode(selection)
                        const parent = node.getParent()
                        if (parent && $isLinkNode(parent)) {
                            setIsLink(true)
                        } else {
                            setIsLink(false)
                        }
                    }
                })
            }
        )
    }, [editor])

    const getSelectedNode = (selection: any) => {
        const anchor = selection.anchor
        const focus = selection.focus
        const anchorNode = selection.anchor.getNode()
        const focusNode = selection.focus.getNode()
        if (anchorNode === focusNode) {
            return anchorNode
        }
        const isBackward = selection.isBackward()
        if (isBackward) {
            return focusNode
        } else {
            return anchorNode
        }
    }

    const formatBold = (): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                selection.formatText('bold')
            }
        })
    }

    const formatItalic = (): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                selection.formatText('italic')
            }
        })
    }

    const formatUnderline = (): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                selection.formatText('underline')
            }
        })
    }

    const formatHeading = (headingLevel: HeadingTagType): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                // Get the selected nodes
                const nodes = selection.getNodes();
                
                // If selection is within a single node
                if (nodes.length === 1) {
                    const node = nodes[0];
                    const parent = node.getParent();
                    
                    // If we're already in a heading of the same type, convert back to paragraph
                    if (activeHeading === headingLevel) {
                        $setBlocksType(selection, () => $createParagraphNode())
                    } else {
                        // Otherwise, convert to the requested heading type
                        $setBlocksType(selection, () => $createHeadingNode(headingLevel))
                    }
                } else {
                    // For multi-node selections, we need to handle each node separately
                    // This is a simplified approach - for complex selections you might need more logic
                    const anchorNode = selection.anchor.getNode();
                    const focusNode = selection.focus.getNode();
                    
                    // Get the common ancestor element
                    const anchorElement = anchorNode.getTopLevelElementOrThrow();
                    const focusElement = focusNode.getTopLevelElementOrThrow();
                    
                    // If both nodes are in the same block element
                    if (anchorElement === focusElement) {
                        if (activeHeading === headingLevel) {
                            $setBlocksType(selection, () => $createParagraphNode())
                        } else {
                            $setBlocksType(selection, () => $createHeadingNode(headingLevel))
                        }
                    } else {
                        // For selections spanning multiple blocks, apply heading to each block
                        // This is the default behavior of $setBlocksType
                        if (activeHeading === headingLevel) {
                            $setBlocksType(selection, () => $createParagraphNode())
                        } else {
                            $setBlocksType(selection, () => $createHeadingNode(headingLevel))
                        }
                    }
                }
            }
        })
    }

    const formatQuote = (): void => {
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createQuoteNode())
            }
        })
    }

    const formatBulletList = (): void => {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    }

    const formatNumberedList = (): void => {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    }

    const formatCheckList = (): void => {
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    }

    const formatLink = (): void => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const selectedText = selection.getTextContent();
                
                // Create a modal/popup for link input instead of using prompt
                const url = prompt('Enter URL:', 'https://');
                
                if (url && validateUrl(url)) {
                    if (isLink) {
                        // Remove existing link
                        const node = getSelectedNode(selection);
                        const parent = node.getParent();
                        if (parent && $isLinkNode(parent)) {
                            const textContent = parent.getTextContent();
                            parent.replace($createTextNode(textContent));
                        }
                    } else {
                        // Create new link
                        const linkNode = $createLinkNode(url, {
                            target: '_blank',
                            rel: 'noopener noreferrer'
                        });

                        if (selectedText) {
                            // Use selected text as link text
                            linkNode.append($createTextNode(selectedText));
                        } else {
                            // Use URL as link text if no selection
                            const displayText = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
                            linkNode.append($createTextNode(displayText));
                        }
                        selection.insertNodes([linkNode]);
                    }
                } else if (url) {
                    alert('Please enter a valid URL starting with http:// or https://');
                }
            }
        });
    };

    const formatAlignment = (alignment: string): void => {
        // Use a command approach for setting alignment
        editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                const nodes = selection.getNodes()
                nodes.forEach((node) => {
                    const element =
                        node.getKey() === 'root'
                            ? node
                            : node.getTopLevelElementOrThrow()

                    // Use Element API for setting alignment
                    if ($isElementNode(element)) {
                        // In Lexical, we should use appropriate methods like:
                        ;(element as ElementNode).setFormat(alignment as any)

                        // If setFormat doesn't work, you might need to use a custom command
                        // that deals with different types of alignments
                    }
                })
            }
        })
    }

    const insertTable = (): void => {
        // Prompt user for rows and columns
        const rowsInput = prompt('Enter number of rows:', '3')
        const columnsInput = prompt('Enter number of columns:', '3')

        const rows = rowsInput ? parseInt(rowsInput, 10) : 3
        const columns = columnsInput ? parseInt(columnsInput, 10) : 3

        // Validate input
        if (isNaN(rows) || isNaN(columns) || rows <= 0 || columns <= 0) {
            alert('Please enter valid number of rows and columns')
            return
        }

        editor.update(() => {
            const tableNode = $createTableNode()

            for (let i = 0; i < rows; i++) {
                const tableRow = $createTableRowNode()

                for (let j = 0; j < columns; j++) {
                    const tableCell = $createTableCellNode(i === 0 ? 1 : 0)
                    const paragraph = $createParagraphNode()

                    // Add placeholder text if needed
                    if (i === 0 && j === 0) {
                        paragraph.append($createTextNode('Header'))
                    }

                    tableCell.append(paragraph)
                    tableRow.append(tableCell)
                }

                tableNode.append(tableRow)
            }

            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
                const anchor = selection.anchor
                const topLevelNode = anchor
                    .getNode()
                    .getTopLevelElementOrThrow()
                topLevelNode.insertAfter(tableNode)
            }
        })
    }

    return (
        <div className="toolbar">
            <button
                type="button"
                onClick={() => formatHeading('h1')}
                className={
                    activeHeading === 'h1'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Heading 1"
            >
                <Heading1 className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={() => formatHeading('h2')}
                className={
                    activeHeading === 'h2'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Heading 2"
            >
                <Heading2 className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={() => formatHeading('h3')}
                className={
                    activeHeading === 'h3'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Heading 3"
            >
                <Heading3 className="text-text-format-icon" strokeWidth={1} />
            </button>
            <span className="toolbar-divider"></span>
            <button
                type="button"
                onClick={formatBold}
                className={isBold ? 'toolbar-button active' : 'toolbar-button'}
                aria-label="Bold"
            >
                <Bold className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={formatItalic}
                className={
                    isItalic ? 'toolbar-button active' : 'toolbar-button'
                }
                aria-label="Italic"
            >
                <Italic className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={formatUnderline}
                className={
                    isUnderline ? 'toolbar-button active' : 'toolbar-button'
                }
                aria-label="Underline"
            >
                <Underline className="text-text-format-icon" strokeWidth={1} />
            </button>
            <span className="toolbar-divider"></span>
            <button
                type="button"
                onClick={formatBulletList}
                className="toolbar-button"
                aria-label="Bullet List"
            >
                <List className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={formatNumberedList}
                className="toolbar-button"
                aria-label="Numbered List"
            >
                <ListOrdered
                    className="text-text-format-icon"
                    strokeWidth={1}
                />
            </button>
            <button
                type="button"
                onClick={formatCheckList}
                className="toolbar-button"
                aria-label="Check List"
            >
                <ListChecks className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={formatQuote}
                className="toolbar-button"
                aria-label="Quote"
            >
                <MessageSquareQuote
                    className="text-text-format-icon"
                    strokeWidth={1}
                />
            </button>
            <span className="toolbar-divider"></span>
            <button
                type="button"
                onClick={() => formatAlignment('left')}
                className={
                    textAlignment === 'left'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Align Left"
            >
                <Text className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={() => formatAlignment('center')}
                className={
                    textAlignment === 'center'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Align Center"
            >
                <AlignCenter
                    className="text-text-format-icon"
                    strokeWidth={1}
                />
            </button>
            <button
                type="button"
                onClick={() => formatAlignment('right')}
                className={
                    textAlignment === 'right'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Align Right"
            >
                <AlignRight className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={() => formatAlignment('justify')}
                className={
                    textAlignment === 'justify'
                        ? 'toolbar-button active'
                        : 'toolbar-button'
                }
                aria-label="Justify"
            >
                <AlignJustify
                    className="text-text-format-icon"
                    strokeWidth={1}
                />
            </button>
            <span className="toolbar-divider"></span>
            <button
                type="button"
                onClick={formatLink}
                className={isLink ? 'toolbar-button active' : 'toolbar-button'}
                aria-label="Link"
            >
                <Link className="text-text-format-icon" strokeWidth={1} />
            </button>
            <button
                type="button"
                onClick={insertTable}
                className="toolbar-button"
                aria-label="Table"
            >
                <Table className="text-text-format-icon" strokeWidth={1} />
            </button>
        </div>
    )
}

// New CopyPastePlugin component
function CopyPastePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            PASTE_COMMAND,
            (event: ClipboardEvent) => {
                if (!event.clipboardData) return false;

                // Handle HTML content
                const htmlContent = event.clipboardData.getData('text/html');
                if (htmlContent) {
                    // Don't prevent default - let Lexical handle HTML paste natively
                    // The built-in paste handler has better HTML conversion support
                    return false;
                }
                
                // Handle plain text if needed
                const textContent = event.clipboardData.getData('text/plain');
                if (textContent) {
                    // Let Lexical handle plain text paste
                    return false;
                }
                
                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    return null;
}

export default RichTextEditor
