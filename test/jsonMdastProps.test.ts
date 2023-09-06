import { describe, it, expect } from 'vitest'
import { mdastFromMarkdown } from '../src/utils/parser'

const markdownContent: string = `# foo bar`;

const markdownContentMdastNoPrettyPrint: string = `[{"type":"heading","depth":1,"children":[{"type":"text","value":"foo bar","position":{"start":{"line":1,"column":3,"offset":2},"end":{"line":1,"column":10,"offset":9}}}],"position":{"start":{"line":1,"column":1,"offset":0},"end":{"line":1,"column":10,"offset":9}}}]`;

describe('property value of children in mdast returned from mdastFromMarkdown', () => {
    it('should return the children property values of the mdast', () => {
        expect(JSON.stringify(JSON.parse(JSON.stringify(mdastFromMarkdown(markdownContent), null, 0)).children)).toStrictEqual(markdownContentMdastNoPrettyPrint);
    })
})

const documentLinePositionNoPrettyPrint: string = `{"start":{"line":1,"column":1,"offset":0},"end":{"line":1,"column":10,"offset":9}}`;

describe('property value of the document line position in mdast returned from mdastFromMarkdown', () => {
    it('should return the document line position property value of the mdast', () => {
        expect(JSON.stringify(JSON.parse(JSON.stringify(mdastFromMarkdown(markdownContent), null, 0)).position)).toStrictEqual(documentLinePositionNoPrettyPrint);
    })  
})