// Eager URLs let Vite include locally maintained screenshots in portable deployments.
const files = import.meta.glob<string>("/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  query: "?url",
  import: "default",
});

export function localProjectImage(filename: string | null): string | null {
  return filename ? (files[`/src/assets/images/${filename}`] ?? null) : null;
}

export function projectImageCandidates(
  local: string | null,
  social: string | null,
  fallback: string | null,
): string[] {
  return [...new Set([local, social, fallback].filter((url): url is string => Boolean(url)))];
}
