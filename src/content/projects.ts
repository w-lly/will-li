/**
 * PROJECT CURATION — edit this, not the GitHub data.
 *
 * `order` is the complete list of what appears, and the exact order it appears
 * in. A repository that is not listed here is never shown on the page, no matter
 * what exists on GitHub.
 *
 * `hidden` is only a convenience: a quick way to drop a repo from the middle of
 * a long list without deleting its line. Removing a name from `order` has the
 * same effect.
 *
 * `blurbs` is the one-line description under each card. GitHub holds no
 * description for most of your repos, so this is where the wording comes from.
 *
 * `titles` renames a card. GitHub's repository name is what shows by default;
 * put a name here to display something nicer instead (the link still goes to
 * the real repo). Leave a repo out of `titles` to keep its GitHub name.
 */

export const projectsConfig = {
  number: "03",
  heading: "My Work",
  order: [
    "Agentic-AI-for-Insights",
    "sbu_hacks_2025",
    "application-helper-ai",
    "marital-status-prediction",
  ],
  hidden: [] as string[],
  /** Optional full repository URLs, keyed by the entry in order. */
  sources: {} as Record<string, string>,
  /** Optional filenames relative to src/assets/images (e.g. projects/u-mi.png). */
  images: {} as Record<string, string>,
  /** Card headings. Missing entry = the repo's own GitHub name. */
  titles: {} as Record<string, string>,
  blurbs: {
    "Agentic-AI-for-Insights":
      "Agentic AI that turns raw data into plain-language insights, shipped as a live demo app.",
    sbu_hacks_2025: "Hackathon build: a web app put together over a weekend, with a deployed demo.",
    "application-helper-ai":
      "AI assistant that helps applicants draft and review application materials.",
    "marital-status-prediction":
      "Notebook exploring classification models to predict marital status from survey features.",
  } as Record<string, string>,
};

export type GitHubRepo = {
  socialPreview?: string | null;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
  fork: boolean;
  archived: boolean;
};

export type ProjectCard = {
  image: string | null;
  socialPreview: string | null;
  name: string;
  title: string;
  blurb: string;
  url: string;
  demo: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
};

/**
 * Turns raw GitHub repos into the cards the page shows.
 * Only repos named in `order` survive, in that order.
 * Pure function — no fetching, no browser APIs — so it can be tested directly.
 */
export function selectProjects(repos: GitHubRepo[], config: typeof projectsConfig): ProjectCard[] {
  const hidden = new Set(config.hidden);
  const byUrl = new Map(
    repos.filter((r) => !r.fork && !r.archived).map((r) => [r.url.toLowerCase(), r]),
  );

  const picked: { key: string; repo: GitHubRepo }[] = [];
  for (const name of config.order) {
    if (hidden.has(name)) continue;
    const source = repositoryPath(name, config);
    const found = byUrl.get(`https://github.com/${source}`.toLowerCase());
    if (found) picked.push({ key: name, repo: found });
  }

  return picked.map(({ key, repo: r }) => ({
    name: key,
    image: config.images[key] || null,
    socialPreview: r.socialPreview ?? null,
    title: config.titles[key] || r.name,
    blurb: config.blurbs[key] || r.description || "No description yet.",
    url: r.url,
    demo: r.homepage,
    language: r.language,
    stars: r.stars,
    updatedAt: r.updatedAt,
  }));
}

/** Restrict overrides to public GitHub repository URLs, never arbitrary fetch targets. */
export function repositoryPath(key: string, config = projectsConfig): string {
  const override = config.sources[key];
  if (!override) return `w-lly/${key}`;
  const match = /^https:\/\/github\.com\/([\w-]+)\/([\w.-]+)\/?$/.exec(override);
  if (!match || match[2] === "." || match[2] === "..") {
    throw new Error(`Invalid GitHub repository URL for ${key}`);
  }
  return `${match[1]}/${match[2]}`;
}

/** "2025-12-08T20:52:53Z" -> "Dec 2025" */
export function formatUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
