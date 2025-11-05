"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import './RichTextEditor.css';
import StarterKit from '@tiptap/starter-kit';
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Typography } from '@tiptap/extension-typography';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure, Tooltip } from '@heroui/react';
import {
    IconBold,
    IconItalic,
    IconUnderline,
    IconStrikethrough,
    IconH1,
    IconH2,
    IconH3,
    IconList,
    IconListNumbers,
    IconQuote,
    IconCode,
    IconLink,
    IconPhoto,
    IconTable,
    IconAlignLeft,
    IconAlignCenter,
    IconAlignRight,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconTrash,
} from '@tabler/icons-react';

interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    className?: string;
    editable?: boolean;
}

// Enhanced paste handling extension using Tiptap's official API
const SmartPaste = Extension.create({
    name: 'smartPaste',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('smartPaste'),
                props: {
                    // Transform HTML content when pasted
                    transformPastedHTML(html: string) {
                        // Extract text content to check for markdown patterns
                        const textContent = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
                        const hasMarkdownPatterns = /^#{1,3} |^\* |^- |^\d+\. |^> |\*\*.*?\*\*|`.*?`/m.test(textContent);

                        // If HTML looks basic and has markdown patterns, process as markdown
                        const isBasicHTML = !/(<strong>|<em>|<h[1-6]>|<ul>|<ol>|<blockquote>|<table>)/i.test(html);

                        if (isBasicHTML && hasMarkdownPatterns) {
                            console.log('Processing as markdown:', textContent.substring(0, 100));
                            const lines = textContent.split('\n');

                            const formattedLines = lines.map(line => {
                                const trimmedLine = line.trim();
                                if (!trimmedLine) return '';

                                // Headers
                                if (trimmedLine.match(/^### /)) {
                                    return `<h3>${trimmedLine.replace(/^### /, '')}</h3>`;
                                }
                                if (trimmedLine.match(/^## /)) {
                                    return `<h2>${trimmedLine.replace(/^## /, '')}</h2>`;
                                }
                                if (trimmedLine.match(/^# /)) {
                                    return `<h1>${trimmedLine.replace(/^# /, '')}</h1>`;
                                }

                                // Blockquotes
                                if (trimmedLine.match(/^> /)) {
                                    const content = trimmedLine.replace(/^> /, '');
                                    return `<blockquote><p>${content}</p></blockquote>`;
                                }

                                // Lists
                                if (trimmedLine.match(/^[-*+] /)) {
                                    const content = trimmedLine.replace(/^[-*+] /, '');
                                    return `<ul><li>${content}</li></ul>`;
                                }
                                if (trimmedLine.match(/^\d+\. /)) {
                                    const content = trimmedLine.replace(/^\d+\. /, '');
                                    return `<ol><li>${content}</li></ol>`;
                                }

                                // Apply inline formatting
                                const formattedContent = trimmedLine
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
                                    .replace(/`([^`]+?)`/g, '<code>$1</code>')
                                    .replace(/~~(.*?)~~/g, '<s>$1</s>')
                                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

                                return `<p>${formattedContent}</p>`;
                            });

                            let result = formattedLines.join('');
                            result = result.replace(/<\/ul><ul>/g, '').replace(/<\/ol><ol>/g, '');
                            console.log('Markdown result:', result.substring(0, 200));
                            return result;
                        }

                        // For rich HTML, clean up formatting
                        return html
                            .replace(/<span[^>]*font-weight:\s*(?:bold|700)[^>]*>(.*?)<\/span>/gi, '<strong>$1</strong>')
                            .replace(/<span[^>]*font-style:\s*italic[^>]*>(.*?)<\/span>/gi, '<em>$1</em>')
                            .replace(/<span[^>]*text-decoration:\s*underline[^>]*>(.*?)<\/span>/gi, '<u>$1</u>')
                            .replace(/<b\b[^>]*>(.*?)<\/b>/gi, '<strong>$1</strong>')
                            .replace(/<i\b[^>]*>(.*?)<\/i>/gi, '<em>$1</em>')
                            .replace(/<div[^>]*>/gi, '<p>')
                            .replace(/<\/div>/gi, '</p>')
                            .replace(/<p[^>]*><\/p>/gi, '')
                            .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
                            .replace(/(<br[^>]*>\s*){2,}/gi, '</p><p>');
                    },

                    // Transform plain text when pasted
                    transformPastedText(text: string) {
                        // Auto-detect and format markdown-like patterns
                        const lines = text.split('\n');
                        const formattedLines = lines.map(line => {
                            const trimmedLine = line.trim();

                            // Skip empty lines
                            if (!trimmedLine) return '';

                            // Headers
                            if (trimmedLine.match(/^### /)) {
                                return `<h3>${trimmedLine.replace(/^### /, '')}</h3>`;
                            }
                            if (trimmedLine.match(/^## /)) {
                                return `<h2>${trimmedLine.replace(/^## /, '')}</h2>`;
                            }
                            if (trimmedLine.match(/^# /)) {
                                return `<h1>${trimmedLine.replace(/^# /, '')}</h1>`;
                            }

                            // Blockquotes
                            if (trimmedLine.match(/^> /)) {
                                const content = trimmedLine.replace(/^> /, '');
                                return `<blockquote><p>${content}</p></blockquote>`;
                            }

                            // Unordered lists
                            if (trimmedLine.match(/^[-*+] /)) {
                                const content = trimmedLine.replace(/^[-*+] /, '');
                                return `<ul><li>${content}</li></ul>`;
                            }

                            // Ordered lists
                            if (trimmedLine.match(/^\d+\. /)) {
                                const content = trimmedLine.replace(/^\d+\. /, '');
                                return `<ol><li>${content}</li></ol>`;
                            }

                            // Apply inline formatting to regular paragraphs
                            const formattedContent = trimmedLine
                                // Bold **text**
                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                // Italic *text*
                                .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>')
                                // Code `text`
                                .replace(/`([^`]+?)`/g, '<code>$1</code>')
                                // Strikethrough ~~text~~
                                .replace(/~~(.*?)~~/g, '<s>$1</s>')
                                // Links [text](url)
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

                            return `<p>${formattedContent}</p>`;
                        });

                        // Merge consecutive list items
                        let result = formattedLines.join('');
                        result = result.replace(/<\/ul><ul>/g, '').replace(/<\/ol><ol>/g, '');

                        return result;
                    },

                    // Handle special paste cases
                    handlePaste(view, event, slice) {
                        const clipboardData = event.clipboardData;
                        if (!clipboardData) return false;

                        const text = clipboardData.getData('text/plain').trim();
                        const html = clipboardData.getData('text/html');

                        // Auto-link URLs
                        const urlPattern = /^https?:\/\/[^\s]+$/;
                        if (urlPattern.test(text)) {
                            event.preventDefault();
                            const { tr } = view.state;
                            const { from } = view.state.selection;

                            // Insert the URL as a link
                            const linkMark = view.state.schema.marks.link.create({ href: text });
                            const textNode = view.state.schema.text(text, [linkMark]);

                            view.dispatch(tr.insert(from, textNode));
                            return true;
                        }

                        return false; // Let other handlers process
                    },
                },
            }),
        ];
    },
});

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    content = '',
    onChange,
    placeholder = 'Start writing...',
    className = '',
    editable = true,
}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: true,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-abr-red underline cursor-pointer hover:text-abr-red/80 transition-colors',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg my-4',
                },
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Typography.configure({
                // Enable smart typography features
                emDash: '—',
                ellipsis: '…',
                openDoubleQuote: '"',
                closeDoubleQuote: '"',
                openSingleQuote: "'",
                closeSingleQuote: "'",
            }),
            SmartPaste,
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            if (onChange) {
                onChange(editor.getHTML());
            }
        },
        immediatelyRender: false
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const addImage = useCallback(() => {
        setImageUrl('');
        setImageFile(null);
        onOpen();
    }, [onOpen]);

    const handleImageUpload = useCallback((file: File) => {
        // Create a local URL for the uploaded file
        const url = URL.createObjectURL(file);
        if (editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const handleImageSubmit = useCallback(() => {
        if (imageFile) {
            handleImageUpload(imageFile);
        } else if (imageUrl && editor) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
        }
        onOpenChange();
    }, [imageFile, imageUrl, editor, handleImageUpload, onOpenChange]);

    const setLink = useCallback(() => {
        const previousUrl = editor?.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addTable = useCallback(() => {
        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }, [editor]);

    const deleteTable = useCallback(() => {
        editor?.chain().focus().deleteTable().run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children,
        title
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
        title: string;
    }) => (
        <Tooltip content={title} delay={500} closeDelay={0}>
            <Button
                size="sm"
                variant={isActive ? 'solid' : 'light'}
                color={isActive ? 'primary' : 'default'}
                onPress={onClick}
                disabled={disabled}
                isIconOnly
                className="min-w-unit-8 h-8"
            >
                {children}
            </Button>
        </Tooltip>
    );

    return (
        <div className={`${editable ? 'border border-gray-300 rounded-lg overflow-hidden' : ''} ${className}`}>
            {/* Toolbar - only show when editable */}
            {editable && (
                <div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
                    {/* Text Formatting */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            title="Bold"
                        >
                            <IconBold className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="Italic"
                        >
                            <IconItalic className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Strikethrough"
                        >
                            <IconStrikethrough className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            isActive={editor.isActive('code')}
                            title="Inline Code"
                        >
                            <IconCode className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Headings */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            isActive={editor.isActive('heading', { level: 1 })}
                            title="Heading 1"
                        >
                            <IconH1 className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            isActive={editor.isActive('heading', { level: 2 })}
                            title="Heading 2"
                        >
                            <IconH2 className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            isActive={editor.isActive('heading', { level: 3 })}
                            title="Heading 3"
                        >
                            <IconH3 className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Lists */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            title="Bullet List"
                        >
                            <IconList className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numbered List"
                        >
                            <IconListNumbers className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            title="Quote"
                        >
                            <IconQuote className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            isActive={editor.isActive({ textAlign: 'left' })}
                            title="Align Left"
                        >
                            <IconAlignLeft className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            isActive={editor.isActive({ textAlign: 'center' })}
                            title="Align Center"
                        >
                            <IconAlignCenter className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            isActive={editor.isActive({ textAlign: 'right' })}
                            title="Align Right"
                        >
                            <IconAlignRight className="w-4 h-4" />
                        </ToolbarButton>
                    </div>

                    {/* Media & Links */}
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <ToolbarButton
                            onClick={setLink}
                            isActive={editor.isActive('link')}
                            title="Add Link"
                        >
                            <IconLink className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addImage}
                            title="Add Image"
                        >
                            <IconPhoto className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addTable}
                            title="Add Table"
                        >
                            <IconTable className="w-4 h-4" />
                        </ToolbarButton>
                        {editor.isActive('table') && (
                            <ToolbarButton
                                onClick={deleteTable}
                                title="Delete Table"
                            >
                                <IconTrash className="w-4 h-4" />
                            </ToolbarButton>
                        )}
                    </div>



                    {/* Undo/Redo */}
                    <div className="flex gap-1">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().chain().focus().undo().run()}
                            title="Undo"
                        >
                            <IconArrowBackUp className="w-4 h-4" />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().chain().focus().redo().run()}
                            title="Redo"
                        >
                            <IconArrowForwardUp className="w-4 h-4" />
                        </ToolbarButton>
                    </div>
                </div>
            )}

            {/* Editor */}
            <div className={editable ? "bg-white" : ""}>
                <EditorContent
                    editor={editor}
                    className={
                        editable
                            ? "prose prose-lg max-w-none p-4 min-h-[300px] focus:outline-none prose-blockquote:border-abr-red prose-blockquote:text-abr-red prose-a:text-abr-red hover:prose-a:text-abr-red/80"
                            : "prose prose-lg max-w-none focus:outline-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-h2:scroll-mt-24 prose-h3:scroll-mt-24 prose-table:table-auto prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-td:border prose-td:border-gray-300 prose-td:p-2 prose-blockquote:border-abr-red prose-blockquote:text-abr-red prose-a:text-abr-red hover:prose-a:text-abr-red/80"
                    }
                    placeholder={editable ? placeholder : ""}
                />
            </div>

            {/* Image Upload Modal - only show when editable */}
            {editable && (
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add Image</ModalHeader>
                                <ModalBody>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Upload Image File
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setImageFile(file);
                                                        setImageUrl(''); // Clear URL when file is selected
                                                    }
                                                }}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                        </div>

                                        <div className="text-center text-gray-500">
                                            OR
                                        </div>

                                        <div>
                                            <Input
                                                label="Image URL"
                                                placeholder="https://example.com/image.jpg"
                                                value={imageUrl}
                                                onValueChange={(value) => {
                                                    setImageUrl(value);
                                                    if (value) setImageFile(null); // Clear file when URL is entered
                                                }}
                                            />
                                        </div>

                                        {imageFile && (
                                            <div className="text-sm text-gray-600">
                                                Selected file: {imageFile.name}
                                            </div>
                                        )}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        onPress={handleImageSubmit}
                                        isDisabled={!imageFile && !imageUrl}
                                    >
                                        Add Image
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            )}
        </div>
    );
};

export default RichTextEditor;