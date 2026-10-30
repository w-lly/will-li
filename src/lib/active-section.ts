type SectionPosition = { id: string; top: number };

/** Use the sticky header's lower edge, not visibility ratios, for long sections. */
export function activeSection(
  sections: readonly SectionPosition[],
  headerHeight: number,
  atBottom: boolean,
): string {
  if (atBottom) return sections.at(-1)?.id ?? "home";

  let active = sections[0]?.id ?? "home";
  for (const section of sections) {
    if (section.top > headerHeight + 1) break;
    active = section.id;
  }
  return active;
}
