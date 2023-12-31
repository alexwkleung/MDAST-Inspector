import { EditorState } from '@codemirror/state'
import { keymap, rectangularSelection, drawSelection, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, standardKeymap, indentWithTab } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { closeBrackets } from '@codemirror/autocomplete'
import { basicLight } from './theme/basic-light'

export class CMEditorState {
    /**
     * Editor state reference variable
     * 
     * @static
     */
    public static editorState: EditorState;

    public static createCMEditorState(): EditorState {
        CMEditorState.editorState = EditorState.create({
            extensions: [
                markdown({
                    base: markdownLanguage,
                    codeLanguages: languages
                }),
                rectangularSelection(),
                drawSelection(),
                history(),
                keymap.of([
                    ...defaultKeymap,
                    ...standardKeymap,
                    ...historyKeymap,
                    indentWithTab
                ]),
                closeBrackets(),
                lineNumbers(),
                highlightActiveLine(),
                basicLight
            ]
        })

        return CMEditorState.editorState;
    }
}