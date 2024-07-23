import React, {useEffect, useRef, useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {
    AccessibilityHelp,
    Autoformat,
    Autosave,
    Bold,
    ClassicEditor,
    Essentials,
    FindAndReplace,
    FullPage,
    GeneralHtmlSupport,
    Heading,
    HtmlComment,
    HtmlEmbed,
    Italic,
    Mention,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    Undo
} from 'ckeditor5';
import translations from 'ckeditor5/translations/vi.js';
import 'ckeditor5/ckeditor5.css';
import './styles.scss'

function CustomCKEditor({data = '', placeholder = '', handleChange}) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'sourceEditing',
                'showBlocks',
                'findAndReplace',
                'selectAll',
                'textPartLanguage',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                '|',
                'insertTable',
                'htmlEmbed',
                '|',
                'accessibilityHelp'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            Autosave,
            Bold,
            Essentials,
            FindAndReplace,
            FullPage,
            GeneralHtmlSupport,
            Heading,
            HtmlComment,
            HtmlEmbed,
            Italic,
            Mention,
            Paragraph,
            PasteFromOffice,
            SelectAll,
            ShowBlocks,
            SourceEditing,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextPartLanguage,
            TextTransformation,
            Undo
        ],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        // htmlSupport: {
        //     allow: [
        //         {
        //             name: /^.*$/,
        //             styles: true,
        //             attributes: true,
        //             classes: true
        //         }
        //     ]
        // },
        initialData: data,
        language: 'vi',
        placeholder: placeholder,
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations]
    };

    return (
        <div>
            <div className="main-container">
                <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                    <div className="editor-container__editor">
                        <div ref={editorRef}>
                            {
                                isLayoutReady ?
                                    <CKEditor editor={ClassicEditor}
                                              config={editorConfig}
                                              onChange={(_, editor) => handleChange(editor.getData())}
                                    /> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomCKEditor;
