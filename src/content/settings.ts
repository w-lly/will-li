/** Presentation settings. Set photoFrame to false for a transparent PNG. */
export const settings = {
  hero: {
    photoFrame: true,
  },
  projects: {
    // Filename relative to src/assets/images; shared by cards without other images.
    defaultImage: "project-default.jpeg",
    // Default image opacity: 0 = invisible, 1 = fully visible. Other previews are unchanged.
    defaultImageOpacity: 0.55,
    useSocialPreview: true,
  },
} as const;
