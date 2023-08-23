import { debounce } from "./debounce"
import { createDefaultTreePreview } from "../dom/dom"
import { CMEditorView } from "../codemirror/cm-view"
import { mdastFromMarkdown } from "./parser"

interface IEvent<T extends HTMLElement, Z extends string, K, X extends boolean> {
    dispose(el: T, type: Z, fn: () => K, capture?: X): void;
}

class Event implements IEvent<HTMLElement, string, any, boolean> {
    /**
     * Event dispose 
     * 
     * @param el Element to remove event listener from
     * @param type Event type 
     * @param fn Reference function corresponding to event listener
     * @param capture Optional - Default is `false`. If `true`, it specifies that the event listener being removed is a capturing listener
     */
    public dispose(el: HTMLElement, type: string, fn: () => any, capture?: boolean): void {
        el.removeEventListener(type, fn, capture);

        console.log("Removed event listener");
    }
}

//create new event object
const evt = new Event();

//editor debounce function
const editorDebounce = debounce(() => {
    //console.log(CMEditorView.editorView.state.doc.toString());
    //console.log(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()));

    if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') === null)) {    
        //create tree preview if it doesn't exist
        createDefaultTreePreview(true, false, false);

        //console.log(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
    } else if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') !== null)) {
        //remove tree preview content if it exists
        (document.getElementById('tree-preview-content-container') as HTMLElement).removeChild((document.getElementById('tree-preview-content') as HTMLElement));

        //create default tree preview 
        createDefaultTreePreview(true, false, false);
    }
}, 500);

export function editorListener(): void {    
    (document.getElementById('editor-container-left') as HTMLElement).addEventListener('keyup', editorDebounce);
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

                //show default tree preview 
                if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && ((document.getElementById('tree-preview-content') as HTMLElement) === null)) {
                    createDefaultTreePreview(true, false, false);
                }
            } else if(el.hasAttribute('checked')) {
                el.setAttribute("not-checked", "");

                el.removeAttribute("checked");
            }

            //temp (remove later)
            evt.dispose((document.getElementById('editor-container-left') as HTMLElement), "keyup", editorDebounce);
        })
    });
}