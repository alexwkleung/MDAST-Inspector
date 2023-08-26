import { createInitDOM, createDefaultTreePreview, createTreePreviewPropertyCheckboxes, createTreePreviewPropertyButtons } from './dom/dom'
import { CMEditorView } from './codemirror/cm-view'
import { editorListener, treePreviewPropertyCheckboxListener, treePreviewPropertyButtonListener } from './utils/event'

import './styles/style.css'

function main(): void {
    //create init dom
    createInitDOM();    

    //create cm editor view
    CMEditorView.createCMEditorView();

    //create tree preview property checkboxes
    createTreePreviewPropertyCheckboxes();

    //create tree preview property buttons
    createTreePreviewPropertyButtons();
    
    //create default tree preview
    createDefaultTreePreview(true, false, false);

    //editor listener
    editorListener();
    
    //tree preview property checkbox listener
    treePreviewPropertyCheckboxListener();

    //tree preview property button listener
    treePreviewPropertyButtonListener();
}
main();
