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
  const byName = new Map(
    repos.filter((r) => !r.fork && !r.archived && !hidden.has(r.name)).map((r) => [r.name, r]),
  );

  const picked: GitHubRepo[] = [];
  for (const name of config.order) {
    if (hidden.has(name)) continue;
    const found = byName.get(name);
    if (found) picked.push(found);
  }

  return picked.map((r) => ({
    name: r.name,
    title: config.titles[r.name] || r.name,
    blurb: config.blurbs[r.name] || r.description || "No description yet.",
    url: r.url,
    demo: r.homepage,
    language: r.language,
    stars: r.stars,
    updatedAt: r.updatedAt,
  }));
}

/** "2025-12-08T20:52:53Z" -> "Dec 2025" */
export function formatUpdated(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}
