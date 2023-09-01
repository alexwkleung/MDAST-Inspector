import { debounce } from "./debounce"
import { createDefaultTreePreview } from "../dom/dom"

interface IEvent<T extends HTMLElement, Z extends string, K, X extends boolean | undefined, Y extends string | undefined> {
    dispose(el: T, type: Z, fn: () => K, capture?: X, log?: Y): void;
}

class Event implements IEvent<HTMLElement, string, any, boolean | undefined, string | undefined> {
    /**
     * Dispose event listener 
     * 
     * @param el Element to remove event listener from
     * @param type Event type 
     * @param fn Reference function corresponding to event listener
     * @param capture Optional - Default value is `false`. If `true`, it specifies that the event listener being removed is a capturing listener
     * @param log Optional - Print a message to console
     */
    public dispose(el: HTMLElement, type: string, fn: () => any, capture?: boolean | undefined, log?: string | undefined): void {
        el.removeEventListener(type, fn, capture);

        if(log) {
            console.log(log);
        } else {
            return;
        }
    }
}

//create new event object
const evt = new Event();

//editor debounce function
const editorDebounce = debounce(() => {
    //console.log(CMEditorView.editorView.state.doc.toString());
    //console.log(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()));

    if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') === null)) {   
        //if children input is checked
        if((document.querySelector('.children-input-target') as HTMLElement).hasAttribute("checked")) {
            //create children tree
            createDefaultTreePreview(false, true, false, false);
        //if position input is checked
        } else if((document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("checked")) {
            //create position tree
            createDefaultTreePreview(false, false, true, false);
        //else just create default tree
        } else {
            createDefaultTreePreview(true, false, false, false);
        }

        //console.log(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
    } else if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && (document.getElementById('tree-preview-content') !== null)) {
        //remove tree preview content if it exists
        (document.getElementById('tree-preview-content-container') as HTMLElement).removeChild((document.getElementById('tree-preview-content') as HTMLElement));

        if((document.querySelector('.children-input-target') as HTMLElement).hasAttribute("checked")) {
            createDefaultTreePreview(false, true, false, false);
        } else if((document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("checked")) {
            createDefaultTreePreview(false, false, true, false);
        } else {
            createDefaultTreePreview(true, false, false, false);
        }
    }
}, 500);

//editor listener
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

                //set checked state
                el.checked = true;

                //show default tree preview 
                if((document.getElementById('tree-preview-content-container') as HTMLElement) !== null && ((document.getElementById('tree-preview-content') as HTMLElement) === null)) {
                    createDefaultTreePreview(true, false, false, false);
                }
            } else if(el.hasAttribute('checked')) {
                el.setAttribute("not-checked", "");

                el.removeAttribute("checked");

                el.checked = false;

                //create default tree preview 
                createDefaultTreePreview(true, false, false, false);
            }
            
            //children input
            if(el.classList.contains('children-input-target') && (document.querySelector('.children-input-target') as HTMLElement).hasAttribute("checked")) {
                console.log("children");

                if((document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.children-position-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.children-position-input-target') as HTMLElement).removeAttribute('checked');

                    (document.querySelector('.children-position-input-target') as HTMLInputElement).checked = false;
                } else if((document.querySelector('.document-line-position-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.document-line-position-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.document-line-position-input-target') as HTMLElement).removeAttribute("checked");

                    (document.querySelector('.document-line-position-input-target') as HTMLInputElement).checked = false;
                }

                //create children tree
                createDefaultTreePreview(false, true, false, false);
            //children position input
            } else if(el.classList.contains('children-position-input-target') && (document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("checked")) {
                console.log("children position");

                if((document.querySelector('.children-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.children-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.children-input-target') as HTMLElement).removeAttribute('checked');

                    (document.querySelector('.children-input-target') as HTMLInputElement).checked = false;
                } else if((document.querySelector('.document-line-position-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.document-line-position-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.document-line-position-input-target') as HTMLElement).removeAttribute("checked");
                    
                    (document.querySelector('.document-line-position-input-target') as HTMLInputElement).checked = false;
                }

                //create children position tree
                createDefaultTreePreview(false, false, true, false);
            //document line position input
            } else if(el.classList.contains('document-line-position-input-target') && (document.querySelector('.document-line-position-input-target') as HTMLElement).hasAttribute("checked")) {
                console.log("document line position");

                if((document.querySelector('.children-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.children-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.children-input-target') as HTMLElement).removeAttribute("checked");

                    (document.querySelector('.children-input-target') as HTMLInputElement).checked = false;
                } else if((document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("checked")) {
                    (document.querySelector('.children-position-input-target') as HTMLElement).setAttribute("not-checked", "");
                    (document.querySelector('.children-position-input-target') as HTMLElement).removeAttribute('checked');

                    (document.querySelector('.children-position-input-target') as HTMLInputElement).checked = false;
                }

                createDefaultTreePreview(false, false, false, true);
            }

            //dispose editor listener
            evt.dispose(
                (document.getElementById('editor-container-left') as HTMLElement), 
                "keyup", 
                editorDebounce, 
                undefined, 
                "disposed editor listener"
            );  

            //invoke editor listener
            editorListener();

            //if all checkboxes aren't checked
            if((document.querySelector('.children-input-target') as HTMLElement).hasAttribute("not-checked") && (document.querySelector('.children-position-input-target') as HTMLElement).hasAttribute("not-checked") && (document.querySelector('.document-line-position-input-target') as HTMLElement)) {
                editorListener();
            }
        })
    });
}

export function treePreviewPropertyButtonListener(): void {
    ((document.getElementById('reset-preview-tree') as HTMLElement)).addEventListener('click', () => {
        console.log("reset preview tree");

        //logic to reset tree to default:
        //create default tree preview
        //dispose editor event
        //invoke editor listener 
        //uncheck all input elements if they were checked

        createDefaultTreePreview(true, false, false, false);
        
        evt.dispose(
            (document.getElementById('editor-container-left') as HTMLElement), 
            "keyup", 
            editorDebounce, 
            undefined, 
            "disposed editor listener"
        );

        editorListener();

        //if children input has checked attribute
        if((document.getElementById('children-input') as HTMLElement).hasAttribute("checked")) {
            //remove checked attribute
            (document.querySelector('.children-input-target') as HTMLElement).removeAttribute("checked");

            //set not-checked attribute
            (document.querySelector('.children-input-target') as HTMLElement).setAttribute("not-checked", "");

            //set check state to false 
            (document.getElementById('children-input') as HTMLInputElement).checked = false;
        //if children position input has checked attribute
        } else if((document.getElementById('children-position-input') as HTMLElement).hasAttribute("checked")) {
            (document.querySelector('.children-position-input-target') as HTMLElement).removeAttribute("checked");
            (document.querySelector('.children-position-input-target') as HTMLElement).setAttribute("not-checked", "");

            ((document.getElementById('children-position-input') as HTMLInputElement)).checked = false;
        } else if((document.getElementById('document-line-position-input') as HTMLElement).hasAttribute("checked")) {
            (document.querySelector('.document-line-position-input-target') as HTMLElement).removeAttribute("checked");
            (document.querySelector('.document-line-position-input-target') as HTMLElement).setAttribute("not-checked", "");

            (document.getElementById('document-line-position-input') as HTMLInputElement).checked = false;
        } else {
            return;
        }
    })
}