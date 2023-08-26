import { mdastFromMarkdown } from "../utils/parser"
import { CMEditorView } from "../codemirror/cm-view"

export function createInitDOM(): void {
    //main container
    const mainContainer: HTMLDivElement = document.createElement('div');
    mainContainer.setAttribute("id", "main-container");
    document.body.insertBefore(mainContainer, document.body.firstChild);

    const mainTop: HTMLDivElement = document.createElement('div');
    mainTop.setAttribute("id", "main-top");
    mainContainer.appendChild(mainTop);

    //main title
    const mainTitle: HTMLHeadElement = document.createElement('h1');
    mainTitle.setAttribute("class", "main-heading");
    const mainTitleTextNode: Text = document.createTextNode("Markdown MDAST Inspector");
    mainTitle.appendChild(mainTitleTextNode);
    mainTop.appendChild(mainTitle);

    //github link container
    const githubLinkContainer: HTMLDivElement = document.createElement('div');
    githubLinkContainer.setAttribute("id", "github-link-container");
    mainTop.appendChild(githubLinkContainer);

    //github link anchor
    const githubLinkAnchor: HTMLAnchorElement = document.createElement('a');
    githubLinkAnchor.setAttribute("id", "github-link");
    githubLinkAnchor.setAttribute("href", "https://github.com/alexwkleung/Markdown-MDAST-Inspector");
    
    //github link text node
    const githubLinkTextNode: Text = document.createTextNode("GitHub Repo");
    githubLinkAnchor.appendChild(githubLinkTextNode);

    githubLinkContainer.appendChild(githubLinkAnchor);

    //editor container
    const editorContainer: HTMLDivElement = document.createElement('div');
    editorContainer.setAttribute("id", "editor-container-left");
    mainContainer.appendChild(editorContainer);

    //tree preview container
    const treePreviewContainer: HTMLDivElement = document.createElement('div');
    treePreviewContainer.setAttribute("id", "tree-preview-container-right");
    mainContainer.appendChild(treePreviewContainer);

    //tree property container
    const treePropertyContainer: HTMLDivElement = document.createElement('div');
    treePropertyContainer.setAttribute("id", "tree-property-container");
    mainContainer.insertBefore(treePropertyContainer, treePreviewContainer);

    //tree preview content container
    const treePreviewContentContainer: HTMLDivElement = document.createElement('div');
    treePreviewContentContainer.setAttribute("id", "tree-preview-content-container");
    treePreviewContainer.appendChild(treePreviewContentContainer);
}

/**
 * Create default tree preview 
 * 
 * @param showDefaultTree Option to show default tree only
 * @param showChildren Option to show children nodes only
 * @param showPosition Option to show position of children nodes only
 */
export function createDefaultTreePreview(showDefaultTree: boolean, showChildren: boolean, showPosition: boolean): void {
    //check if tree preview node exists
    if((document.getElementById('tree-preview-content') as HTMLElement) !== null) {
        //remove node
        (document.getElementById('tree-preview-content') as HTMLElement).remove();
    }

    //tree preview content
    const treePreviewContent: HTMLDivElement = document.createElement('div');
    treePreviewContent.setAttribute("id", "tree-preview-content");
    (document.getElementById('tree-preview-content-container') as HTMLElement).appendChild(treePreviewContent);

    //tree pre 
    const treePre: HTMLPreElement = document.createElement('pre');
    treePre.setAttribute("id", "tree-pre");
    treePreviewContent.appendChild(treePre);

    //tree code 
    const treeCode: HTMLElement = document.createElement('code');
    treeCode.setAttribute("id", "tree-code");
    treePre.appendChild(treeCode);
    
    //tree text node
    let treeTextNode: Text;

    //when showDefault is true only
    if(showDefaultTree && !showChildren && !showPosition) {
        treeTextNode = document.createTextNode(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
        treeCode.appendChild(treeTextNode);
    //when showChildren is true only
    } else if(!showDefaultTree && showChildren && !showPosition) {
        treeTextNode = document.createTextNode(JSON.stringify((JSON.parse(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2)).children), null, 2));
        treeCode.appendChild(treeTextNode);
    //when showPosition is true only
    } else if(!showDefaultTree && !showChildren && showPosition) {
        treeTextNode = document.createTextNode(JSON.stringify((JSON.parse(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2)).position), null, 2));
        treeCode.appendChild(treeTextNode);
    //when showDefaultTree, showChildren, and showPosition is true
    } else if(showDefaultTree && showChildren && showPosition) {
        //assign default parsed mdast string 
        treeTextNode = document.createTextNode(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
        treeCode.appendChild(treeTextNode);
    //when showDefaultTree, showChildren, and showPosition are false
    } else if(!showDefaultTree && !showChildren && !showPosition) {
        //assign empty string
        treeTextNode = document.createTextNode("");
        treeCode.appendChild(treeTextNode);
    //if no argument combination matches the above
    } else {
        //assign default parsed mdast string
        treeTextNode = document.createTextNode(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
        treeCode.appendChild(treeTextNode);
    }
}

export function createTreePreviewPropertyCheckboxes(): void {
    //children label
    const childrenLabel: HTMLLabelElement = document.createElement('label');
    childrenLabel.setAttribute("for", "children-input");
    childrenLabel.setAttribute("id", "children-label");
    childrenLabel.textContent = "Show children nodes";
    (document.getElementById('tree-property-container') as HTMLElement).appendChild(childrenLabel);

    //children input 
    const childrenInput: HTMLInputElement = document.createElement('input');
    childrenInput.setAttribute("type", "checkbox");
    childrenInput.setAttribute("id", "children-input");
    childrenInput.setAttribute("class", "children-input-target");
    childrenInput.setAttribute("name", "children-checkbox");
    childrenInput.setAttribute("not-checked", "");
    childrenInput.checked = false;
    (document.getElementById('tree-property-container') as HTMLElement).insertBefore(childrenInput, (document.getElementById('tree-property-container') as HTMLElement).firstChild);

    //position label
    const positionLabel: HTMLLabelElement = document.createElement('label');
    positionLabel.setAttribute("for", "position-input");
    positionLabel.setAttribute("id", "position-label");
    positionLabel.textContent = "Show position of children nodes";
    (document.getElementById('tree-property-container') as HTMLElement).appendChild(positionLabel);
    //(document.getElementById('tree-preview-container-right') as HTMLElement).insertBefore(positionLabel, (document.getElementById('tree-preview-content-container') as HTMLElement));

    //position input
    const positionInput: HTMLInputElement = document.createElement('input');
    positionInput.setAttribute("type", "checkbox");
    positionInput.setAttribute("id", "position-input");
    positionInput.setAttribute("class", "position-input-target");
    positionInput.setAttribute("name", "position-checkbox");
    positionInput.setAttribute("not-checked", "");
    positionInput.checked = false;
    (document.getElementById('tree-property-container') as HTMLElement).insertBefore(positionInput, positionLabel);
}

export function createTreePreviewPropertyButtons(): void {
    //reset preview tree button
    const resetPreviewTree: HTMLButtonElement = document.createElement('button');
    resetPreviewTree.setAttribute("id", "reset-preview-tree");
    resetPreviewTree.textContent = "Reset tree";
    (document.getElementById('tree-property-container') as HTMLElement).insertBefore(resetPreviewTree, ((document.getElementById('children-input') as HTMLElement)));
}