import { describe, expect, it } from "vitest";
import { localProjectImage, projectImageCandidates } from "@/lib/project-images";
import { githubSocialPreview } from "@/lib/github-preview";
import { settings } from "@/content/settings";

describe("project images", () => {
  it("prioritizes the configured file, then social preview, then default", () => {
    expect(
      projectImageCandidates("local.png", "https://example.com/social.png", "default.jpeg"),
    ).toEqual(["local.png", "https://example.com/social.png", "default.jpeg"]);
  });
  it("uses the supplied banana as the configurable default", () => {
    expect(settings.projects.defaultImage).toBe("project-default.jpeg");
    expect(localProjectImage(settings.projects.defaultImage)).toBeTruthy();
  });
  it("keeps default image opacity adjustable within the visible range", () => {
    expect(settings.projects.defaultImageOpacity).toBeGreaterThanOrEqual(0);
    expect(settings.projects.defaultImageOpacity).toBeLessThanOrEqual(1);
  });
  it("skips missing files so social preview takes priority over the default", () => {
    expect(
      projectImageCandidates(localProjectImage("missing.png"), "social.png", "default.jpeg"),
    ).toEqual(["social.png", "default.jpeg"]);
  });
  it("accepts custom GitHub social previews", () => {
    expect(
      githubSocialPreview(
        '<meta content="https://repository-images.githubusercontent.com/123/preview.png" property="og:image">',
      ),
    ).toBe("https://repository-images.githubusercontent.com/123/preview.png");
  });
  it("ignores generic GitHub cards and missing previews", () => {
    expect(
      githubSocialPreview(
        '<meta property="og:image" content="https://opengraph.githubassets.com/hash/w-lly/repo">',
      ),
    ).toBeNull();
    expect(githubSocialPreview("<html></html>")).toBeNull();
  });
});
