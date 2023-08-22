import { createInitDOM, createDefaultTreePreview, createTreePreviewPropertyCheckboxes } from './dom/dom'
import { CMEditorView } from './codemirror/cm-view'
import { editorListener, treePreviewPropertyCheckboxListener } from './utils/event'

import './styles/style.css'

function main(): void {
    //create init dom
    createInitDOM();    

    //create cm editor view
    CMEditorView.createCMEditorView();

    //create tree preview property checkboxes
    createTreePreviewPropertyCheckboxes();

    //create default tree preview
    createDefaultTreePreview(true, false, false);

    //editor listener
    editorListener();
    
    //tree preview property checkbox listener
    treePreviewPropertyCheckboxListener();
}
main();
