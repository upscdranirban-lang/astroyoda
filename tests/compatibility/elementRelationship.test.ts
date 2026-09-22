import { describe, expect, it } from "vitest";
import { compareSignsByElement, getElement } from "@/lib/compatibility/elementRelationship";

describe("getElement", () => {
  it("classifies all 12 signs into the 4 classical elements correctly", () => {
    expect(getElement("Aries")).toBe("Fire");
    expect(getElement("Leo")).toBe("Fire");
    expect(getElement("Sagittarius")).toBe("Fire");
    expect(getElement("Taurus")).toBe("Earth");
    expect(getElement("Virgo")).toBe("Earth");
    expect(getElement("Capricorn")).toBe("Earth");
    expect(getElement("Gemini")).toBe("Air");
    expect(getElement("Libra")).toBe("Air");
    expect(getElement("Aquarius")).toBe("Air");
    expect(getElement("Cancer")).toBe("Water");
    expect(getElement("Scorpio")).toBe("Water");
    expect(getElement("Pisces")).toBe("Water");
  });
});

describe("compareSignsByElement", () => {
  it("returns tone 'same' for two signs sharing an element", () => {
    const result = compareSignsByElement("Aries", "Leo");
    expect(result.elementA).toBe("Fire");
    expect(result.elementB).toBe("Fire");
    expect(result.tone).toBe("same");
    expect(result.note.length).toBeGreaterThan(0);
  });

  it("is symmetric regardless of argument order", () => {
    const ab = compareSignsByElement("Aries", "Gemini");
    const ba = compareSignsByElement("Gemini", "Aries");
    expect(ab.tone).toBe(ba.tone);
  });

  it("classifies Fire+Air as harmonious", () => {
    expect(compareSignsByElement("Aries", "Gemini").tone).toBe("harmonious");
  });

  it("classifies Earth+Water as harmonious", () => {
    expect(compareSignsByElement("Taurus", "Cancer").tone).toBe("harmonious");
  });

  it("classifies Fire+Water as challenging", () => {
    expect(compareSignsByElement("Aries", "Cancer").tone).toBe("challenging");
  });

  it("classifies Fire+Earth as challenging", () => {
    expect(compareSignsByElement("Aries", "Taurus").tone).toBe("challenging");
  });

  it("classifies Air+Water as challenging", () => {
    expect(compareSignsByElement("Gemini", "Cancer").tone).toBe("challenging");
  });

  it("classifies Air+Earth as neutral", () => {
    expect(compareSignsByElement("Gemini", "Taurus").tone).toBe("neutral");
  });

  it("returns a non-empty note for every one of the 10 possible element combinations", () => {
    const elements = ["Aries", "Taurus", "Gemini", "Cancer"] as const; // one sign per element
    for (const a of elements) {
      for (const b of elements) {
        expect(compareSignsByElement(a, b).note.length).toBeGreaterThan(0);
      }
    }
  });
});
