import { createServerFn } from "@tanstack/react-start";

import type { GitHubRepo } from "@/content/projects";
import snapshot from "@/content/projects.snapshot.json";
import { projectsConfig, repositoryPath } from "@/content/projects";
import { settings } from "@/content/settings";
import { githubSocialPreview } from "@/lib/github-preview";
import { localProjectImage } from "@/lib/project-images";

/**
 * GitHub fetch with a short-lived cache and a bundled fallback.
 *
 * The request is made server-side so visitors never spend their own rate limit,
 * and so a token can be added later (a GITHUB_TOKEN secret) without touching the
 * UI. If GitHub is down or rate-limits us, the last good list is served from the
 * committed snapshot instead of an empty section.
 */

const GITHUB_API = "https://api.github.com";
const OWNER = "w-lly";
const TTL_MS = 10 * 60 * 1000;

let cache: { at: number; repos: GitHubRepo[] } | null = null;

function toRepos(payload: unknown): GitHubRepo[] {
  if (!Array.isArray(payload)) return [];
  return payload
    .filter((r): r is Record<string, unknown> => typeof r === "object" && r !== null)
    .map((r) => ({
      name: String(r["name"] ?? ""),
      description: typeof r["description"] === "string" ? r["description"] : null,
      url: String(r["html_url"] ?? ""),
      homepage: typeof r["homepage"] === "string" && r["homepage"] ? String(r["homepage"]) : null,
      language: typeof r["language"] === "string" ? String(r["language"]) : null,
      stars: Number(r["stargazers_count"] ?? 0),
      updatedAt: String(r["updated_at"] ?? ""),
      fork: Boolean(r["fork"]),
      archived: Boolean(r["archived"]),
      socialPreview:
        (snapshot as GitHubRepo[]).find(
          (saved) => saved.url.toLowerCase() === String(r["html_url"] ?? "").toLowerCase(),
        )?.socialPreview ?? null,
    }))
    .filter((r) => r.name && r.url);
}

export const getGitHubProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubRepo[]> => {
    const now = Date.now();
    if (cache && now - cache.at < TTL_MS) return cache.repos;

    const token = process.env["GITHUB_TOKEN"];
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "will-li-portfolio",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch(`${GITHUB_API}/users/${OWNER}/repos?per_page=100&sort=updated`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`GitHub request failed [${res.status}]: ${body.slice(0, 300)}`);
        throw new Error(`GitHub request failed with status ${res.status}`);
      }
      const repos = toRepos(await res.json());
      if (repos.length === 0) throw new Error("GitHub returned no repositories");
      const extras = await Promise.all(
        projectsConfig.order
          .filter((key) => projectsConfig.sources[key] && !projectsConfig.hidden.includes(key))
          .map(async (key) => {
            const path = repositoryPath(key);
            try {
              const response = await fetch(`${GITHUB_API}/repos/${path}`, {
                headers,
                signal: AbortSignal.timeout(5000),
              });
              if (!response.ok)
                throw new Error(
                  `GitHub repository request failed [${response.status}]: ${await response.text()}`,
                );
              return toRepos([await response.json()]);
            } catch (error) {
              console.error(error);
              return (snapshot as GitHubRepo[]).filter(
                (repo) => repo.url.toLowerCase() === `https://github.com/${path}`.toLowerCase(),
              );
            }
          }),
      );
      repos.push(...extras.flat());
      if (settings.projects.useSocialPreview) {
        await Promise.all(
          projectsConfig.order
            .filter(
              (key) =>
                !projectsConfig.hidden.includes(key) &&
                !localProjectImage(projectsConfig.images[key] ?? null),
            )
            .map(async (key) => {
              const url = `https://github.com/${repositoryPath(key)}`;
              const repo = repos.find((item) => item.url.toLowerCase() === url.toLowerCase());
              if (!repo) return;
              // Refresh stores previews in the snapshot; avoid re-querying HTML for saved ones.
              if (repo.socialPreview) return;
              try {
                const page = await fetch(url, { signal: AbortSignal.timeout(3000) });
                if (page.ok) repo.socialPreview = githubSocialPreview(await page.text());
              } catch {
                repo.socialPreview = null;
              }
            }),
        );
      }
      cache = { at: now, repos };
      return repos;
    } catch (error) {
      console.error("Falling back to the saved project list:", error);
      return cache?.repos ?? (snapshot as unknown as GitHubRepo[]);
    }
  },
);
