import { describe, expect, it } from "vitest";
import { experience } from "@/content/site";

describe("SRC internship terms", () => {
  it("keeps the spring and fall software internships as separate dated entries", () => {
    const terms = experience.entries.filter(
      (entry) => entry.company === "SRC Inc." && entry.role === "Software Engineer Intern",
    );
    expect(terms.map((entry) => entry.period)).toEqual([
      "August 2026 — Present",
      "February 2026 — May 2026",
    ]);
  });
});