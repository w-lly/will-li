// Snapshot previews are URLs on GitHub's image CDN, not GitHub API requests.
export async function saveSocialPreviews(repos, urls, parsePreview, previous, fetchPage = fetch) {
  const saved = new Map(
    previous.map((repo) => [repo.url.toLowerCase(), repo.socialPreview ?? null]),
  );
  for (const url of new Set(urls)) {
    const repo = repos.find((item) => item.url.toLowerCase() === url.toLowerCase());
    if (!repo) continue;
    repo.socialPreview = saved.get(url.toLowerCase()) ?? null;
    try {
      const response = await fetchPage(url, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error(`GitHub preview request failed [${response.status}]`);
      repo.socialPreview = parsePreview(await response.text());
    } catch (error) {
      console.warn(`Keeping saved preview for ${url}: ${error.message}`);
    }
  }
  return repos;
}
