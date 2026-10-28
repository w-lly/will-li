import { describe, expect, it } from "vitest";

import { selectProjects, projectsConfig, formatUpdated, type GitHubRepo } from "@/content/projects";

function repo(name: string, over: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    name,
    description: null,
    url: `https://github.com/w-lly/${name}`,
    homepage: null,
    language: "TypeScript",
    stars: 0,
    updatedAt: "2025-01-01T00:00:00Z",
    fork: false,
    archived: false,
    ...over,
  };
}

const sample = [
  repo("will-li", { homepage: "https://will-li.vercel.app" }),
  repo("w-lly"),
  repo("marital-status-prediction", { updatedAt: "2025-08-03T00:00:00Z", language: "Jupyter Notebook" }),
  repo("application-helper-ai", { updatedAt: "2025-08-17T00:00:00Z" }),
  repo("Agentic-AI-for-Insights", {
    updatedAt: "2025-12-08T00:00:00Z",
    stars: 1,
    homepage: "https://huggingface.co/spaces/w-lly/Agentic-AI-for-Insights-App",
  }),
  repo("sbu_hacks_2025", { updatedAt: "2025-12-09T00:00:00Z" }),
  repo("brand-new-repo", { updatedAt: "2026-01-05T00:00:00Z" }),
  repo("old-fork", { fork: true }),
  repo("retired-archived", { archived: true }),
];

const names = (repos: GitHubRepo[], config = projectsConfig) =>
  selectProjects(repos, config).map((c) => c.name);

describe("project curation", () => {
  it("shows exactly the repos listed in order, nothing else", () => {
    expect(names(sample)).toEqual([
      "Agentic-AI-for-Insights",
      "sbu_hacks_2025",
      "application-helper-ai",
      "marital-status-prediction",
    ]);
  });

  it("never shows a repo that is not in the list, however new it is", () => {
    const shown = names(sample);
    expect(shown).not.toContain("brand-new-repo");
    expect(shown).not.toContain("will-li");
    expect(shown).not.toContain("w-lly");
  });

  it("follows the order written in projects.ts, not GitHub's", () => {
    const reversed = { ...projectsConfig, order: [...projectsConfig.order].reverse() };
    const shown = names(sample, reversed);
    expect(shown[0]).toBe("marital-status-prediction");
    expect(shown.at(-1)).toBe("Agentic-AI-for-Insights");
  });

  it("drops a repo named in hidden", () => {
    const config = { ...projectsConfig, hidden: ["sbu_hacks_2025"] };
    const shown = names(sample, config);
    expect(shown).not.toContain("sbu_hacks_2025");
    expect(shown).toHaveLength(3);
  });

  it("uses the written blurb over GitHub's empty description", () => {
    const [first] = selectProjects(sample, projectsConfig);
    expect(first?.blurb).toBe(projectsConfig.blurbs["Agentic-AI-for-Insights"]);
    expect(first?.blurb).not.toBe("No description yet.");
  });

  it("falls back to GitHub's description when no blurb is written", () => {
    const config = { ...projectsConfig, blurbs: {} };
    const [card] = selectProjects([repo("sbu_hacks_2025", { description: "From GitHub." })], config);
    expect(card?.blurb).toBe("From GitHub.");
  });

  it("shows a written card title instead of the repo name", () => {
    const config = { ...projectsConfig, titles: { sbu_hacks_2025: "U-Mi" } };
    const [card] = selectProjects([repo("sbu_hacks_2025")], config);
    expect(card?.title).toBe("U-Mi");
    expect(card?.url).toBe("https://github.com/w-lly/sbu_hacks_2025");
  });

  it("keeps the repo name when no card title is written", () => {
    const [card] = selectProjects([repo("sbu_hacks_2025")], projectsConfig);
    expect(card?.title).toBe("sbu_hacks_2025");
  });

  it("carries the live-site link through to the card", () => {
    const [card] = selectProjects(
      [repo("sbu_hacks_2025", { homepage: "https://u-mi.vercel.app" })],
      projectsConfig,
    );
    expect(card?.demo).toBe("https://u-mi.vercel.app");
  });

  it("formats an update date as month and year", () => {
    expect(formatUpdated("2025-12-08T20:52:53Z")).toBe("Dec 2025");
  });
});
