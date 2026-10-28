// Saves a fresh copy of the GitHub repo list used as the offline fallback.
// Usage: npm run refresh-projects
import { writeFileSync } from "node:fs";

const USER = "w-lly";
const OUT = new URL("../src/content/projects.snapshot.json", import.meta.url);

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, {
  headers,
});
if (!res.ok) {
  console.error(`GitHub request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const repos = (await res.json())
  .filter((r) => r?.name && r?.html_url)
  .map((r) => ({
    name: String(r.name),
    description: typeof r.description === "string" ? r.description : null,
    url: String(r.html_url),
    homepage: typeof r.homepage === "string" && r.homepage ? r.homepage : null,
    language: typeof r.language === "string" ? r.language : null,
    stars: Number(r.stargazers_count ?? 0),
    updatedAt: String(r.updated_at ?? ""),
    fork: Boolean(r.fork),
    archived: Boolean(r.archived),
  }));

writeFileSync(OUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`Saved ${repos.length} repos to src/content/projects.snapshot.json`);
