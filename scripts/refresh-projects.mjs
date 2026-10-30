// Saves a fresh copy of the GitHub repo list used as the offline fallback.
// Usage: npm run refresh-projects
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";
import { saveSocialPreviews } from "./project-previews.mjs";

// Read the same curation as the site without requiring a Node TypeScript loader.
const configSource = readFileSync(new URL("../src/content/projects.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(configSource, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { projectsConfig, repositoryPath } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

const USER = "w-lly";
const OUT = new URL("../src/content/projects.snapshot.json", import.meta.url);
const previewSource = readFileSync(
  new URL("../src/lib/github-preview.ts", import.meta.url),
  "utf8",
);
const { githubSocialPreview } = await import(
  `data:text/javascript;base64,${Buffer.from(
    ts.transpileModule(previewSource, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText,
  ).toString("base64")}`
);
let previous = [];
try {
  previous = JSON.parse(readFileSync(OUT, "utf8"));
} catch {
  // A first refresh can create the snapshot from scratch.
}

const headers = { Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, {
  headers,
});
if (!res.ok) {
  console.error(`GitHub request failed: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const payload = await res.json();
for (const key of projectsConfig.order) {
  if (!projectsConfig.sources[key] || projectsConfig.hidden.includes(key)) continue;
  const response = await fetch(`https://api.github.com/repos/${repositoryPath(key)}`, { headers });
  if (!response.ok)
    throw new Error(`GitHub request failed [${response.status}]: ${await response.text()}`);
  payload.push(await response.json());
}

const repos = payload
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

await saveSocialPreviews(
  repos,
  projectsConfig.order
    .filter((key) => !projectsConfig.hidden.includes(key))
    .map((key) => `https://github.com/${repositoryPath(key)}`),
  githubSocialPreview,
  previous,
);
writeFileSync(OUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`Saved ${repos.length} repos to src/content/projects.snapshot.json`);
console.log(
  `Saved ${repos.filter((repo) => repo.socialPreview).length} custom social-preview URLs`,
);
