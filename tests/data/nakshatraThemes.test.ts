import { describe, expect, it } from "vitest";
import { NAKSHATRAS } from "@/data/nakshatras";
import { nakshatraThemes } from "@/data/interpretations/nakshatraThemes";

describe("nakshatraThemes", () => {
  it("has an entry for all 27 nakshatras, matching data/nakshatras.ts exactly", () => {
    expect(Object.keys(nakshatraThemes)).toHaveLength(27);
    for (const n of NAKSHATRAS) {
      expect(nakshatraThemes[n.name]).toBeDefined();
    }
  });

  it("every entry has a non-empty keyword and theme", () => {
    for (const [name, entry] of Object.entries(nakshatraThemes)) {
      expect(entry.keyword.length, `${name} keyword`).toBeGreaterThan(0);
      expect(entry.theme.length, `${name} theme`).toBeGreaterThan(0);
    }
  });
});
