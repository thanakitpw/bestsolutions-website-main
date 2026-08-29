/**
 * Every article in `articles.body_md_th` opens with `# <title>`, which duplicates
 * the `<h1 class="post-title">` the page already renders — all 16 published posts
 * shipped with two H1s. Drop a leading H1 (and any stray H1 further down, demoted
 * to H2) so each post keeps exactly one.
 */
export function normalizeArticleHeadings(markdown: string): string {
  const lines = markdown.split("\n");
  const out: string[] = [];
  let inFence = false;
  let leadingH1Dropped = false;
  let seenContent = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      out.push(line);
      seenContent = true;
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    const isH1 = /^#\s+\S/.test(line);
    if (isH1) {
      if (!seenContent && !leadingH1Dropped) {
        leadingH1Dropped = true;
        continue;
      }
      out.push(line.replace(/^#\s+/, "## "));
      seenContent = true;
      continue;
    }

    if (line.trim() !== "") seenContent = true;
    out.push(line);
  }

  return out.join("\n").replace(/^\n+/, "");
}
