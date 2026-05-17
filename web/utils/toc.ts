import GithubSlugger from "github-slugger";

export type TocHeading = { id: string; text: string; depth: 2 | 3 };

const HEADING_RE = /^(#{2,3})\s+(.+?)\s*#*\s*$/;

// Mirrors rehype-slug: one GithubSlugger instance, document order, same dedup.
export function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const raw of markdown.split("\n")) {
    const line = raw.trimEnd();
    if (/^(```|~~~)/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = HEADING_RE.exec(line);
    if (!m || !m[1] || !m[2]) continue;

    const depth = m[1].length as 2 | 3;
    const text = m[2]
      .replace(/\*\*|__|\*|_|`/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .trim();
    if (!text) continue;

    headings.push({ id: slugger.slug(text), text, depth });
  }

  return headings;
}
