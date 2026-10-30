/** Only custom uploaded repository previews count, not GitHub's generic cards. */
export function githubSocialPreview(html: string): string | null {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = Object.fromEntries(
      [...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map((match) => [
        match[1]?.toLowerCase(),
        match[2],
      ]),
    );
    if (attributes["property"] !== "og:image") continue;
    const value = attributes["content"]?.replace(/&amp;/g, "&");
    if (!value) continue;
    try {
      const url = new URL(value);
      if (url.protocol === "https:" && url.hostname === "repository-images.githubusercontent.com")
        return url.href;
    } catch {
      // Unavailable metadata falls through to the local default.
    }
  }
  return null;
}
