import { fromMarkdown } from "mdast-util-from-markdown"

//override lib type
type Root<T> = T;

/**
 * mdast from markdown 
 * 
 * @param content String containing Markdown content
 * @returns The mdast representation of the Markdown string
 */
export function mdastFromMarkdown(content: string): Root<any> {
    const mdast: Root<any> = fromMarkdown(content);

    return mdast;
}