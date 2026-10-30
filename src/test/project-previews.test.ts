import { describe, expect, it, vi } from "vitest";
// @ts-expect-error The refresh helper is a standalone Node JavaScript module.
import { saveSocialPreviews } from "../../scripts/project-previews.mjs";
import { githubSocialPreview } from "@/lib/github-preview";

const url = "https://github.com/w-lly/example";
const preview = "https://repository-images.githubusercontent.com/123/preview.png";

describe("saved social previews", () => {
  it("stores the custom social preview in the fallback snapshot record", async () => {
    const repos = [{ url }];
    const fetchPage = vi
      .fn()
      .mockResolvedValue(new Response(`<meta property="og:image" content="${preview}">`));
    await saveSocialPreviews(repos, [url, url], githubSocialPreview, [], fetchPage);
    expect(repos).toEqual([{ url, socialPreview: preview }]);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });
  it("retains the previous preview when GitHub refuses the page request", async () => {
    const repos = [{ url }];
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      await saveSocialPreviews(
        repos,
        [url],
        githubSocialPreview,
        [{ url, socialPreview: preview }],
        vi.fn().mockResolvedValue(new Response("Too many requests", { status: 429 })),
      );
      expect(repos).toEqual([{ url, socialPreview: preview }]);
    } finally {
      warning.mockRestore();
    }
  });
  it("does not substitute generic GitHub cards for a missing custom preview", async () => {
    const repos = [{ url }];
    await saveSocialPreviews(
      repos,
      [url],
      githubSocialPreview,
      [],
      vi
        .fn()
        .mockResolvedValue(
          new Response(
            '<meta property="og:image" content="https://opengraph.githubassets.com/hash/repo">',
          ),
        ),
    );
    expect(repos).toEqual([{ url, socialPreview: null }]);
  });
});
