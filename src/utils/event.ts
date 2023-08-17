import { debounce } from "./debounce"
import { createTreePreview } from "../dom/dom"

export function editorListener(): void {    
    (document.getElementById('editor-container-left') as HTMLElement).addEventListener('keyup', debounce(() => {
        //console.log(CMEditorView.editorView.state.doc.toString());
        //console.log(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()));

        if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') === null)) {    
            //create tree preview if it doesn't exist
            createTreePreview();

            //console.log(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
        } else if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') !== null)) {
            //remove tree preview content if it exists
            (document.getElementById('tree-preview-content-container') as HTMLElement).removeChild((document.getElementById('tree-preview-content') as HTMLElement));

            //create tree preview 
            createTreePreview();
        }
    }, 500));
}