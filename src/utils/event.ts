import { debounce } from "./debounce"
import { createDefaultTreePreview } from "../dom/dom"
import { CMEditorView } from "../codemirror/cm-view"
import { mdastFromMarkdown } from "./parser"

export function editorListener(): void {    
    (document.getElementById('editor-container-left') as HTMLElement).addEventListener('keyup', debounce(() => {
        //console.log(CMEditorView.editorView.state.doc.toString());
        //console.log(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()));

        if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') === null)) {    
            //create tree preview if it doesn't exist
            createDefaultTreePreview();

            //console.log(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
        } else if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') !== null)) {
            //remove tree preview content if it exists
            (document.getElementById('tree-preview-content-container') as HTMLElement).removeChild((document.getElementById('tree-preview-content') as HTMLElement));

            //create default tree preview 
            createDefaultTreePreview();
        }

        //console.log(JSON.parse(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2)).children);
    }, 500));
}

export function treePreviewPropertyCheckboxListener(): void {
    //console.log(JSON.parse(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2)).children);

    document.querySelectorAll('input').forEach((el) => {
        el.addEventListener('click', () => {
            if(el.hasAttribute('not-checked')) {
                //set checked attribute
                el.setAttribute("checked", "");

                //remove not-checked attribute
                el.removeAttribute('not-checked');
            } else if(el.hasAttribute('checked')) {
                el.setAttribute("not-checked", "");

                el.removeAttribute("checked");
            }
        })
    });
}