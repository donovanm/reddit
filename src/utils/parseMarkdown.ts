import { HtmlRenderer, Parser } from 'commonmark';

const reader = new Parser();
const writer = new HtmlRenderer();

export default function parseMarkdown(text: string) {
  const parsed = reader.parse(text);
  return writer.render(parsed);
}
