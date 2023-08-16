import { EditorView } from "@codemirror/view"
import { CMEditorState } from "./cm-state"

export class CMEditorView {
    /**
     * Editor view reference variable
     * 
     * @static
     */
    public static editorView: EditorView;

    public static createCMEditorView(): EditorView {
        CMEditorView.editorView = new EditorView({
            state: CMEditorState.createCMEditorState(),
            doc: '',
            parent: (document.getElementById('editor-container-left') as HTMLDivElement)
        })

        return CMEditorView.editorView;
    }
}