import { describe, it, expect } from 'vitest'
import { mdastFromMarkdown } from '../src/utils/parser'

//markdown content
const markdownContent: string = `# hello world`;

//markdown content mdast 
const markdownContentMdastNoPrettyPrint: string = `{"type":"root","children":[{"type":"heading","depth":1,"children":[{"type":"text","value":"hello world","position":{"start":{"line":1,"column":3,"offset":2},"end":{"line":1,"column":14,"offset":13}}}],"position":{"start":{"line":1,"column":1,"offset":0},"end":{"line":1,"column":14,"offset":13}}}],"position":{"start":{"line":1,"column":1,"offset":0},"end":{"line":1,"column":14,"offset":13}}}`;

describe('mdast from markdown, converted to json string, no pretty print', () => {
    it('should return parsed markdown content into mdast object as json string', () => {
        expect(JSON.stringify(mdastFromMarkdown(markdownContent), null, 0)).toStrictEqual(markdownContentMdastNoPrettyPrint)
    })
})