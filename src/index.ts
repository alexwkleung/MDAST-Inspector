import { createInitDOM, createTreePreview } from './dom/dom'
import { CMEditorView } from './codemirror/cm-view'
import { editorListener } from './utils/event'

import './styles/style.css'

function main(): void {
    //create init dom
    createInitDOM();    

    //create cm editor view
    CMEditorView.createCMEditorView();

    //create tree preview
    createTreePreview();

    //editor listener
    editorListener();
}
main();
