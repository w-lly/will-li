import { describe, expect, it } from "vitest";

import { activeSection } from "@/lib/active-section";

describe("Active portfolio section", () => {
  it("keeps Home active before About reaches the sticky header", () => {
    expect(
      activeSection(
        [
          { id: "home", top: -100 },
          { id: "about", top: 200 },
        ],
        80,
        false,
      ),
    ).toBe("home");
  });

  it("moves both navigation indicators when About reaches the header", () => {
    expect(
      activeSection(
        [
          { id: "home", top: -700 },
          { id: "about", top: 80 },
        ],
        80,
        false,
      ),
    ).toBe("about");
  });

  it("keeps Experience active throughout its long content", () => {
    expect(
      activeSection(
        [
          { id: "projects", top: -2000 },
          { id: "experience", top: -900 },
          { id: "contact", top: 1000 },
        ],
        80,
        false,
      ),
    ).toBe("experience");
  });

  it("activates the short Contact section at the document bottom", () => {
    expect(
      activeSection(
        [
          { id: "experience", top: -1700 },
          { id: "contact", top: 500 },
        ],
        80,
        true,
      ),
    ).toBe("contact");
  });

  it("returns to Projects when scrolling upward", () => {
    expect(
      activeSection(
        [
          { id: "projects", top: -100 },
          { id: "experience", top: 100 },
        ],
        80,
        false,
      ),
    ).toBe("projects");
  });
});
