import { mdastFromMarkdown } from "../utils/parser"
import { CMEditorView } from "../codemirror/cm-view"

export function createInitDOM(): void {
    //main container
    const mainContainer: HTMLDivElement = document.createElement('div');
    mainContainer.setAttribute("id", "main-container");
    document.body.insertBefore(mainContainer, document.body.firstChild);

    //main title
    const mainTitle: HTMLHeadElement = document.createElement('h1');
    mainTitle.setAttribute("class", "main-heading");
    const mainTitleTextNode: Text = document.createTextNode("Markdown MDAST Inspector");
    mainTitle.appendChild(mainTitleTextNode);
    mainContainer.appendChild(mainTitle);

    //github link container
    const githubLinkContainer: HTMLDivElement = document.createElement('div');
    githubLinkContainer.setAttribute("id", "github-link-container");
    mainContainer.appendChild(githubLinkContainer);

    //github link anchor
    const githubLinkAnchor: HTMLAnchorElement = document.createElement('a');
    githubLinkAnchor.setAttribute("id", "github-link");
    githubLinkAnchor.setAttribute("href", "https://github.com/alexwkleung/Markdown-MDAST-Inspector");
    
    //github link text node
    const githubLinkTextNode: Text = document.createTextNode("GitHub");
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

    //tree preview content container
    const treePreviewContentContainer: HTMLDivElement = document.createElement('div');
    treePreviewContentContainer.setAttribute("id", "tree-preview-content-container");
    treePreviewContainer.appendChild(treePreviewContentContainer);
}

export function createTreePreview(): void {
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
    const treeTextNode: Text = document.createTextNode(JSON.stringify(mdastFromMarkdown(CMEditorView.editorView.state.doc.toString()), null, 2));
    treeCode.appendChild(treeTextNode);
}