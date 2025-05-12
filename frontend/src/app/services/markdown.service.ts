import { Injectable } from '@angular/core';
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code: any, lang: any, info: any) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext"
        return hljs.highlight(code, { language }).value
      },
    })
  )

  constructor() { }

  render(md?: string | null) {
    if (!md) {
      return "";
    }
    return (this.marked.parse(md) as string)
      .replace(/<a /g, '<a target="_blank" ');
  }
}
