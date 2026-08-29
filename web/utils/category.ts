/**
 * Article categories are stored as display strings ("Web Design", "AI").
 * These map them to/from URL segments for the /blog/category/* hubs without a
 * hardcoded list — a new category in the CMS gets a hub on the next revalidate.
 */
export function categorySlug(category: string): string {
  return category
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryFromSlug(
  slug: string,
  categories: string[],
): string | undefined {
  const decoded = decodeURIComponent(slug).toLowerCase();
  return categories.find((c) => categorySlug(c) === decoded);
}
